import { defineFunction } from '@aws-amplify/backend';

export const contactFunction = defineFunction({
  name: 'contact',
  environment: {
    SES_FROM_EMAIL: 'artinada@gmail.com', // Use your verified Gmail as sender
    SES_TO_EMAIL: 'artinada@gmail.com', // Your email for receiving contact forms
  },
}); 