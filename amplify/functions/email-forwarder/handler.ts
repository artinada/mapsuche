import { SESClient, SendRawEmailCommand, SendEmailCommand } from '@aws-sdk/client-ses';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import type { SESEvent } from 'aws-lambda';

const sesClient = new SESClient({ region: process.env.REGION || 'eu-central-1' });
const s3Client = new S3Client({ region: process.env.REGION || 'eu-central-1' });

export const handler = async (event: SESEvent) => {
    console.log('Received SES event:', JSON.stringify(event, null, 2));
    
    try {
        // Extract email details from SES event
        const sesRecord = event.Records[0].ses;
        const messageId = sesRecord.mail.messageId;
        const source = sesRecord.mail.source;
        const destination = sesRecord.mail.destination[0];
        const subject = sesRecord.mail.commonHeaders.subject || 'No Subject';
        const forwardToEmail = process.env.FORWARD_TO_EMAIL || 'artinada@gmail.com';
        
        console.log(`Processing email from ${source} to ${destination} with subject: ${subject}`);
        
        // Check if email is stored in S3 (for complete forwarding)
        const bucketName = process.env.BUCKET_NAME;
        if (!bucketName) {
            throw new Error('BUCKET_NAME environment variable is required');
        }
        
        const objectKey = `emails/${messageId}`;
        
        let emailContent: string | null = null;
        try {
            const getObjectCommand = new GetObjectCommand({
                Bucket: bucketName,
                Key: objectKey
            });
            const s3Response = await s3Client.send(getObjectCommand);
            if (s3Response.Body) {
                emailContent = await streamToString(s3Response.Body);
                console.log('Retrieved full email from S3');
            }
        } catch (s3Error) {
            console.log('Email not found in S3, creating notification email:', (s3Error as Error).message);
        }
        
        if (emailContent) {
            // Forward the complete email with all content (images, attachments, etc.)
            const forwardedSubject = `[FORWARDED from ${destination}] ${subject}`;
            
            // Modify the email headers for forwarding
            const modifiedEmail = emailContent.replace(
                /^Subject: (.*)$/m,
                `Subject: ${forwardedSubject}`
            ).replace(
                /^To: (.*)$/m,
                `To: ${forwardToEmail}`
            );
            
            const sendRawEmailCommand = new SendRawEmailCommand({
                Source: forwardToEmail,
                Destinations: [forwardToEmail],
                RawMessage: {
                    Data: Buffer.from(modifiedEmail)
                }
            });
            
            const result = await sesClient.send(sendRawEmailCommand);
            console.log('Complete email forwarded successfully:', result.MessageId);
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Complete email forwarded successfully',
                    messageId: result.MessageId
                })
            };
        } else {
            // Fallback: Send notification email when full content is not available
            const sendEmailCommand = new SendEmailCommand({
                Source: forwardToEmail,
                Destination: {
                    ToAddresses: [forwardToEmail]
                },
                Message: {
                    Subject: {
                        Data: `[FORWARDED from ${destination}] ${subject}`,
                        Charset: 'UTF-8'
                    },
                    Body: {
                        Text: {
                            Data: `This email was forwarded from ${destination}\n\nOriginal sender: ${source}\nOriginal subject: ${subject}\nMessage ID: ${messageId}\n\n--- Note ---\nThis is a notification only. To receive complete emails with images and attachments, S3 storage integration is required.\n\nTo enable complete email forwarding:\n1. Configure SES to store emails in S3\n2. Update the receipt rule to include S3 action`,
                            Charset: 'UTF-8'
                        }
                    }
                }
            });
            
            const result = await sesClient.send(sendEmailCommand);
            console.log('Notification email sent successfully:', result.MessageId);
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Notification email sent (full content forwarding requires S3 setup)',
                    messageId: result.MessageId
                })
            };
        }
        
    } catch (error) {
        console.error('Error forwarding email:', error);
        throw error;
    }
};

// Helper function to convert stream to string
async function streamToString(stream: any): Promise<string> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf-8');
} 