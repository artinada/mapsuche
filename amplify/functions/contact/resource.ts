import { defineFunction } from '@aws-amplify/backend';

export const contactFunction = defineFunction({
  name: 'contact',
  environment: {
    SES_FROM_EMAIL: 'your-verified-email@example.com', // Replace with your verified SES email
    SES_TO_EMAIL: 'artinada@gmail.com', // Your email for receiving contact forms
  },
}); 