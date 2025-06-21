const { SESClient, SendRawEmailCommand } = require('@aws-sdk/client-ses');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const sesClient = new SESClient({ region: 'eu-central-1' });
const s3Client = new S3Client({ region: 'eu-central-1' });

exports.handler = async (event) => {
    console.log('Received SES event:', JSON.stringify(event, null, 2));
    
    try {
        // Extract email details from SES event
        const sesRecord = event.Records[0].ses;
        const messageId = sesRecord.mail.messageId;
        const source = sesRecord.mail.source;
        const destination = sesRecord.mail.destination[0];
        const subject = sesRecord.mail.commonHeaders.subject || 'No Subject';
        
        console.log(`Processing email from ${source} to ${destination} with subject: ${subject}`);
        
        // Check if email is stored in S3 (for complete forwarding)
        const bucketName = 'mapsuche-emails-1750500609';
        const objectKey = `emails/${messageId}`;
        
        let emailContent = null;
        try {
            const getObjectCommand = new GetObjectCommand({
                Bucket: bucketName,
                Key: objectKey
            });
            const s3Response = await s3Client.send(getObjectCommand);
            emailContent = await streamToString(s3Response.Body);
            console.log('Retrieved full email from S3');
        } catch (s3Error) {
            console.log('Email not found in S3, creating notification email:', s3Error.message);
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
                'To: artinada@gmail.com'
            );
            
            const sendRawEmailCommand = new SendRawEmailCommand({
                Source: 'artinada@gmail.com',
                Destinations: ['artinada@gmail.com'],
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
            const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
            
            const sendEmailCommand = new SendEmailCommand({
                Source: 'artinada@gmail.com',
                Destination: {
                    ToAddresses: ['artinada@gmail.com']
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
async function streamToString(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf-8');
} 