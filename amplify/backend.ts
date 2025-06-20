import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { data } from './data/resource';
import { contactFunction } from './functions/contact/resource';

export const backend = defineBackend({
  data,
  contactFunction,
});

// Add SES permissions to the contact function
backend.contactFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['ses:SendEmail', 'ses:SendRawEmail'],
    resources: ['*'],
  })
); 