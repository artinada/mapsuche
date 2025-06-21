import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import * as ses from 'aws-cdk-lib/aws-ses';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sesActions from 'aws-cdk-lib/aws-ses-actions';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { data } from './data/resource';
import { contactFunction } from './functions/contact/resource';
import { emailForwarderFunction } from './functions/email-forwarder/resource';

export const backend = defineBackend({
  data,
  contactFunction,
  emailForwarderFunction,
});

// Add SES permissions to the contact function
backend.contactFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['ses:SendEmail', 'ses:SendRawEmail'],
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