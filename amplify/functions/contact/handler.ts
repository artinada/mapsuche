import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { randomUUID } from 'crypto';

const sesClient = new SESClient({ region: process.env.AWS_REGION });

export const handler = async (event: any) => {
  console.log('Contact form submission event:', JSON.stringify(event, null, 2));
  
  const { firstName, lastName, email, phone, businessName, service, message } = event.arguments;

  try {
    // Get environment variables
    const fromEmail = process.env.SES_FROM_EMAIL;
    const toEmail = process.env.SES_TO_EMAIL;

    if (!fromEmail || !toEmail) {
      throw new Error('SES email configuration missing');
    }

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
      Source: fromEmail,
      Destination: {
        ToAddresses: [toEmail],
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
      id: randomUUID(),
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      success: false,
      message: 'Failed to process contact form submission',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}; 