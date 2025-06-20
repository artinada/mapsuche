# MapSuche - AWS Amplify Version

A modern contact form application built with React, TypeScript, and AWS Amplify Gen 2.

## Architecture

This application uses AWS Amplify Gen 2 to handle:
- **Frontend**: React with TypeScript, Tailwind CSS, and shadcn/ui components
- **Backend**: AWS Lambda functions with TypeScript
- **Database**: Amazon DynamoDB (auto-provisioned by Amplify)
- **Email**: Amazon SES for sending contact form notifications
- **API**: AWS AppSync GraphQL API with custom mutations

## Prerequisites

Before getting started, make sure you have:

1. **Node.js** (version 18 or higher)
2. **AWS Account** with appropriate permissions
3. **AWS CLI** configured with your credentials
4. **Amplify CLI** installed globally:
   ```bash
   npm install -g @aws-amplify/cli
   ```

## Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install Amplify backend dependencies
cd amplify
npm install
cd ..
```

### 2. Configure AWS SES

Before deploying, you need to set up Amazon SES:

1. Go to the AWS SES console
2. Verify your sending email address (the "from" email)
3. Verify your receiving email address (where you want to receive contact form submissions)
4. If in sandbox mode, both addresses must be verified

### 3. Set Up Amplify Secrets

Set up the required email configuration secrets:

```bash
# For development (sandbox)
npx ampx sandbox secret set SES_FROM_EMAIL
# Enter your verified SES "from" email when prompted

npx ampx sandbox secret set SES_TO_EMAIL
# Enter your email where you want to receive contact forms when prompted
```

For production deployment, you'll set these secrets in the Amplify console.

### 4. Deploy to Development (Sandbox)

Start the development environment:

```bash
# Start Amplify sandbox
npx ampx sandbox

# In another terminal, start the frontend
npm run dev
```

The sandbox will:
- Deploy your backend resources to AWS
- Generate the `amplify_outputs.json` file
- Enable hot-reloading for backend changes

### 5. Production Deployment

To deploy to production:

1. **Connect your repository** to Amplify:
   ```bash
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial commit"
   
   # Push to your Git provider (GitHub, GitLab, etc.)
   ```

2. **Deploy via Amplify Console**:
   - Go to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect your Git repository
   - Amplify will automatically detect the Gen 2 configuration
   - Set the environment secrets (SES_FROM_EMAIL, SES_TO_EMAIL) in the console
   - Deploy!

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── amplify/               # Amplify Gen 2 backend
│   ├── backend.ts         # Main backend configuration
│   ├── data/
│   │   └── resource.ts    # GraphQL schema and data model
│   └── functions/
│       └── contact/       # Contact form Lambda function
│           ├── resource.ts
│           └── handler.ts
└── amplify_outputs.json  # Generated Amplify configuration
```

## Features

- ✅ **Modern React Frontend** with TypeScript and Tailwind CSS
- ✅ **Serverless Backend** with AWS Lambda functions
- ✅ **Email Notifications** via Amazon SES
- ✅ **Data Storage** in DynamoDB
- ✅ **Type Safety** end-to-end with TypeScript
- ✅ **Real-time Development** with Amplify sandbox
- ✅ **Easy Deployment** with Amplify hosting

## Environment Variables / Secrets

The application uses the following secrets (configured via Amplify):

- `SES_FROM_EMAIL`: The verified email address to send from
- `SES_TO_EMAIL`: Your email address to receive contact form submissions

## Development

```bash
# Start the development server
npm run dev

# Start Amplify sandbox (in separate terminal)
npx ampx sandbox

# Build for production
npm run build
```

## Troubleshooting

### SES Issues
- Make sure both sender and receiver emails are verified in SES
- Check if you're in SES sandbox mode (production requires domain verification)
- Verify AWS credentials have SES permissions

### Amplify Issues
- Ensure AWS CLI is configured with appropriate permissions
- Check that you're in the correct AWS region
- Verify that your account has the necessary service quotas

### TypeScript Errors
- Run `npm install` in both root and `amplify/` directories
- The `amplify_outputs.json` file is generated after first deployment

## License

MIT License - see LICENSE file for details. 