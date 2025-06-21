import { defineFunction } from '@aws-amplify/backend';

export const emailForwarderFunction = defineFunction({
  name: 'email-forwarder',
  environment: {
    BUCKET_NAME: 'mapsuche-emails',
    FORWARD_TO_EMAIL: 'artinada@gmail.com',
    REGION: 'eu-central-1'
  }
}); 