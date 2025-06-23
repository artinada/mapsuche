import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { Duration } from 'aws-cdk-lib';
import * as ses from 'aws-cdk-lib/aws-ses';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sesActions from 'aws-cdk-lib/aws-ses-actions';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { data } from './data/resource';
import { contactFunction } from './functions/contact/resource';
import { emailForwarderFunction } from './functions/email-forwarder/resource';

export const backend = defineBackend({
  data,
  contactFunction,
  emailForwarderFunction,
});

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

// Add security headers for XSS protection
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
        "frame-ancestors 'none'",
        "upgrade-insecure-requests"
      ].join('; '),
      override: true,
    },
  },
  customHeadersBehavior: {
    customHeaders: [
      {
        header: 'X-XSS-Protection',
        value: '1; mode=block',
        override: true,
      },
      {
        header: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()',
        override: true,
      },
    ],
  },
}); 