import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { Duration, Stack, RemovalPolicy } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ses from 'aws-cdk-lib/aws-ses';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sesActions from 'aws-cdk-lib/aws-ses-actions';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { data } from './data/resource';
import { contactFunction } from './functions/contact/resource';
import { emailForwarderFunction } from './functions/email-forwarder/resource';
import { geoApiFunction } from './functions/geo-api/resource';
import { geoWorkerFunction } from './functions/geo-worker/resource';

export const backend = defineBackend({
  data,
  contactFunction,
  emailForwarderFunction,
  geoApiFunction,
  geoWorkerFunction,
});

// The original public AppSync key expired and was removed by AppSync, leaving
// CloudFormation unable to update or roll it back. Replace that missing key;
// keep the data API and its contact table intact.
backend.data.resources.cfnResources.cfnApiKey?.overrideLogicalId('MapSuchePublicApiKeyV2');

const geoApiLambda = backend.geoApiFunction.resources.lambda;
const geoWorkerLambda = backend.geoWorkerFunction.resources.lambda;
const geoStack = Stack.of(geoApiLambda);
const reports = new dynamodb.Table(geoStack, 'GeoReports', {
  partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  encryption: dynamodb.TableEncryption.AWS_MANAGED,
  timeToLiveAttribute: 'expiresAt', removalPolicy: RemovalPolicy.RETAIN,
  pointInTimeRecovery: true,
});
reports.grantReadWriteData(geoApiLambda);
reports.grantReadWriteData(geoWorkerLambda);
geoWorkerLambda.grantInvoke(geoApiLambda);
geoWorkerLambda.configureAsyncInvoke({ retryAttempts: 0, maxEventAge: Duration.minutes(1) });
for (const fn of [backend.geoApiFunction, backend.geoWorkerFunction]) {
  fn.addEnvironment('GEO_TABLE_NAME', reports.tableName);
  fn.addEnvironment('GEO_MODEL', process.env.GEO_MODEL || 'gpt-5.6-terra');
}
backend.geoApiFunction.addEnvironment('GEO_WORKER_NAME', geoWorkerLambda.functionName);
backend.geoApiFunction.addEnvironment('GEO_ENABLED', process.env.GEO_ENABLED || 'true');
const geoApi = new apigateway.RestApi(geoStack, 'GeoRestApi', {
  restApiName: 'MapSuche GEO', endpointTypes: [apigateway.EndpointType.REGIONAL],
  defaultCorsPreflightOptions: {
    allowOrigins: ['https://mapsuche.de', 'https://www.mapsuche.de', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'], allowHeaders: ['Content-Type', 'X-Geo-Token'],
  },
  deployOptions: { throttlingRateLimit: 20, throttlingBurstLimit: 40 },
});
const checks = geoApi.root.addResource('geo').addResource('checks');
const geoIntegration = new apigateway.LambdaIntegration(geoApiLambda);
checks.addMethod('POST', geoIntegration);
const report = checks.addResource('{id}');
report.addMethod('GET', geoIntegration);
report.addMethod('DELETE', geoIntegration);
backend.addOutput({ custom: { geoApiUrl: `${geoApi.url}geo` } });

// Add comprehensive permissions to the contact function
backend.contactFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['ses:SendEmail', 'dynamodb:PutItem'],
    resources: ['*'],
  })
);

// Add comprehensive permissions to the email forwarder function
backend.emailForwarderFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: [
      'ses:SendEmail', 
      'ses:SendRawEmail',
      's3:GetObject',
      's3:PutObject'
    ],
    resources: ['*'],
  })
);

// Create a single stack for all email infrastructure
const emailStack = backend.createStack('EmailInfraStack');

// Create S3 bucket for email storage
const emailBucket = new s3.Bucket(emailStack, 'EmailBucket', {
  bucketName: 'mapsuche-emails',
  versioned: false,
  publicReadAccess: false,
});

// Create domain identity for mapsuche.de
const domain = 'mapsuche.de';
const emailIdentity = new ses.EmailIdentity(emailStack, 'EmailIdentity', {
  identity: ses.Identity.domain(domain),
  mailFromDomain: `mail.${domain}`,
});

// Create receipt rule set for email forwarding
const ruleSet = new ses.ReceiptRuleSet(emailStack, 'EmailRuleSet', {
  receiptRuleSetName: 'mapsuche-email-forwarding',
});

// Create receipt rule to forward all emails to Lambda
ruleSet.addRule('ForwardAllEmails', {
  recipients: [domain],
  actions: [
    new sesActions.S3({
      bucket: emailBucket,
      objectKeyPrefix: 'emails/',
    }),
    new sesActions.Lambda({
      function: backend.emailForwarderFunction.resources.lambda,
    }),
  ],
});

// Add comprehensive security headers for XSS, HSTS, and COOP protection
const securityStack = backend.createStack('SecurityStack');

// HSTS Deployment Strategy - Gradual Implementation
// Stage 1: Initial deployment (1 hour) - for testing and monitoring
// Stage 2: Short-term (1 day) - after successful Stage 1
// Stage 3: Medium-term (1 week) - after successful Stage 2  
// Stage 4: Long-term (1 month) - after successful Stage 3
// Stage 5: Production (1 year) - final production setting

const HSTS_STAGES = {
  STAGE_1_TESTING: Duration.seconds(3600),      // 1 hour - initial testing
  STAGE_2_SHORT: Duration.seconds(86400),       // 1 day - short-term validation
  STAGE_3_MEDIUM: Duration.seconds(604800),     // 1 week - medium-term validation
  STAGE_4_EXTENDED: Duration.seconds(2592000),  // 1 month - extended validation
  STAGE_5_PRODUCTION: Duration.seconds(31536000), // 1 year - production setting
};

// Current HSTS Stage - Change this to progress through deployment stages
const CURRENT_HSTS_STAGE = HSTS_STAGES.STAGE_1_TESTING; // Start with 1 hour for safety

// Create CloudFront response headers policy for security
const securityHeadersPolicy = new cloudfront.ResponseHeadersPolicy(securityStack, 'SecurityHeadersPolicy', {
  responseHeadersPolicyName: 'MapSucheSecurityHeaders',
  securityHeadersBehavior: {
    contentTypeOptions: { override: true },
    // Clickjacking Protection: X-Frame-Options DENY prevents any framing of the site
    // This blocks all attempts to embed the site in frames/iframes from any origin
    frameOptions: { frameOption: cloudfront.HeadersFrameOption.DENY, override: true },
    referrerPolicy: { 
      referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN, 
      override: true 
    },
    strictTransportSecurity: {
      accessControlMaxAge: CURRENT_HSTS_STAGE,
      includeSubdomains: false,  // Start without subdomains for safety
      preload: false,           // Start without preload for safety
      override: true,
    },
    // XSS Protection - moved from custom headers to security headers
    xssProtection: { 
      protection: true, 
      modeBlock: true, 
      override: true 
    },
    contentSecurityPolicy: {
      contentSecurityPolicy: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        "font-src 'self' https://fonts.gstatic.com data:",
        "connect-src 'self' https://*.amplifyapp.com https://*.execute-api.eu-central-1.amazonaws.com",
        "media-src 'self'",
        "object-src 'none'",
        "frame-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",  // Clickjacking Protection: Prevents framing from any origin
        "upgrade-insecure-requests"
      ].join('; '),
      override: true,
    },
  },
  customHeadersBehavior: {
    customHeaders: [
      {
        header: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()',
        override: true,
      },
      // COOP (Cross-Origin Opener Policy) and COEP (Cross-Origin Embedder Policy)
      // These headers provide source isolation by preventing cross-origin documents
      // from accessing the window object, protecting against attacks via popups
      {
        header: 'Cross-Origin-Opener-Policy',
        value: 'same-origin',
        override: true,
      },
      {
        header: 'Cross-Origin-Embedder-Policy',
        value: 'require-corp',
        override: true,
      },
    ],
  },
});
