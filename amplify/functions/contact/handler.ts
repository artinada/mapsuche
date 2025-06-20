import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { env } from '$amplify/env/contact';
import type { Schema } from '../../data/resource';

const sesClient = new SESClient({ region: process.env.AWS_REGION });

type Handler = Schema['submitContact']['functionHandler'];

export const handler: Handler = async (event) => {
  const { firstName, lastName, email, phone, businessName, service, message } = event.arguments;

  try {
    // Send email notification via SES
    const emailContent = `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Business: ${businessName}
Service: ${service}
Message: ${message || 'No message provided'}

Submitted at: ${new Date().toLocaleString()}
    `;

    const emailCommand = new SendEmailCommand({
      Source: env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [env.SES_TO_EMAIL],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission from ${firstName} ${lastName}`,
        },
        Body: {
          Text: {
            Data: emailContent,
          },
        },
      },
    });

    await sesClient.send(emailCommand);

    return {
      success: true,
      message: 'Contact form submitted successfully',
      id: crypto.randomUUID(),
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    throw new Error('Failed to process contact form submission');
  }
}; 