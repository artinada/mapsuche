import { defineFunction, secret } from '@aws-amplify/backend';

export const contactFunction = defineFunction({
  name: 'contact',
  environment: {
    SES_FROM_EMAIL: secret('SES_FROM_EMAIL'),
    SES_TO_EMAIL: secret('SES_TO_EMAIL'),
  },
}); 