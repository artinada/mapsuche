import { defineFunction } from '@aws-amplify/backend';

export const contactFunction = defineFunction({
  name: 'contact',
  environment: {
    SES_FROM_EMAIL: 'noreply@mapsuche.de', // Verified SES sender email
    SES_TO_EMAIL: 'artinada@gmail.com', // Your email for receiving contact forms
  },
}); 