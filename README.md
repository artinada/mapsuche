# MapSuche - Professional Business Directory Platform

A modern business directory and contact platform built with React, TypeScript, and AWS Amplify Gen 2. Fully deployed and operational at [mapsuche.de](https://mapsuche.de).

## 🚀 Project Overview

MapSuche is a complete business directory solution featuring:
- **Professional Website** with multi-language support (German/English)
- **Contact Form System** with automated email notifications
- **Universal Email Forwarding** for all `*@mapsuche.de` addresses
- **Modern UI/UX** built with React, TypeScript, and Tailwind CSS

## 🏗️ Architecture & Infrastructure

### **Frontend**
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components  
- **Deployment**: AWS Amplify with automatic GitHub deployments
- **Domain**: `mapsuche.de` (registered and managed via AWS Route 53)

### **Backend Services**
- **API**: AWS Lambda functions (TypeScript)
- **Database**: Amazon DynamoDB for contact form storage
- **Email System**: Amazon SES for notifications
- **File Storage**: Amazon S3 for email attachments backup

### **Email Infrastructure**
- **Contact Forms**: Automated forwarding to `artinada@gmail.com`
- **Domain Email**: Universal forwarding of `*@mapsuche.de` to owner
- **Features**: Full email body + attachments preservation
- **Services**: SES + Lambda + S3 integration (Infrastructure as Code)
- **Deployment**: Fully managed via Amplify Gen 2 + AWS CDK

## 🌍 Deployment Information

- **Region**: `eu-central-1` (Frankfurt) - strictly enforced
- **Domain**: Registered and managed via AWS Route 53
- **SSL/TLS**: Automatic HTTPS via AWS Certificate Manager
- **CI/CD**: Automatic deployment on GitHub push via Amplify
- **Configuration**: Infrastructure as Code via Amplify Gen 2 + AWS CDK

## 📁 Project Structure

```
MapSuche_v1.00/
├── client/                     # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components (Home, Contact, etc.)
│   │   ├── hooks/             # Custom React hooks
│   │   └── lib/               # Utilities and translations
├── amplify/                   # AWS Amplify Gen 2 backend
│   ├── backend.ts            # Main backend configuration
│   ├── data/resource.ts      # GraphQL schema and DynamoDB
│   └── functions/contact/    # Contact form Lambda function
├── lambda-function/          # Email forwarding Lambda
└── amplify_outputs.json     # Generated Amplify configuration
```

## ✨ Key Features

### **Website Features**
- 🌐 **Multi-language Support** (German/English)
- 📱 **Responsive Design** optimized for all devices
- 🎨 **Modern UI** with professional shadcn/ui components
- ⚡ **Fast Performance** with optimized React build

### **Business Features**
- 📞 **Contact Form** with instant email notifications
- 📧 **Professional Email** forwarding for all business addresses
- 🔒 **Data Security** with AWS enterprise-grade infrastructure
- 📊 **Form Analytics** via DynamoDB storage

### **Email Addresses**
All emails to these addresses forward to `artinada@gmail.com`:
- `contact@mapsuche.de`
- `info@mapsuche.de` 
- `support@mapsuche.de`
- `legal@mapsuche.de`
- `privacy@mapsuche.de`
- `hello@mapsuche.de`
- `*@mapsuche.de` (any address)

## 🛠️ Development

### **Local Development**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Amplify sandbox (deploys all infrastructure)
npx ampx sandbox
```

### **Infrastructure as Code**
The entire email forwarding system is now managed via code:
- **Lambda Functions**: Defined in `amplify/functions/`
- **SES Configuration**: Managed via AWS CDK in `amplify/backend.ts`
- **S3 Buckets**: Created and configured automatically
- **DNS & Domain**: Route 53 integration via CDK

### **Deployment**
Deployment is **fully automated**:
1. Push changes to GitHub repository
2. AWS Amplify automatically builds and deploys infrastructure + application
3. Changes are live at `mapsuche.de` within minutes

### **Manual Resource Cleanup**
If upgrading from manual setup, see `cleanup-manual-resources.md` for migration guide.

## 🔧 Technical Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS |
| **Backend** | AWS Lambda, Node.js, TypeScript |
| **Database** | Amazon DynamoDB |
| **Email** | Amazon SES + Lambda forwarding |
| **Storage** | Amazon S3 |
| **DNS** | AWS Route 53 |
| **SSL** | AWS Certificate Manager |
| **CI/CD** | AWS Amplify |
| **Monitoring** | AWS CloudWatch |

## 📊 Current Status

- ✅ **Website**: Live at [mapsuche.de](https://mapsuche.de)
- ✅ **Domain**: Registered and configured in AWS
- ✅ **Email System**: Fully operational
- ✅ **SSL Certificate**: Active and auto-renewing
- ✅ **CI/CD Pipeline**: Automated GitHub deployments
- ✅ **Monitoring**: CloudWatch logs and metrics enabled

## 🎯 Infrastructure Highlights

- **Zero Downtime**: Serverless architecture with auto-scaling
- **Cost Optimized**: Pay-per-use Lambda and DynamoDB pricing
- **Enterprise Security**: AWS IAM roles and policies
- **High Availability**: Multi-AZ deployment in Frankfurt region
- **Automated Backups**: S3 storage for email attachments

## 📞 Support

For technical support or questions:
- **Email**: Any address `@mapsuche.de` (forwards to owner)
- **Primary Contact**: `artinada@gmail.com`

---

**Note**: This infrastructure is fully managed as code via Amplify Gen 2 and AWS CDK, ensuring consistent, version-controlled, and reproducible deployments in the Frankfurt (`eu-central-1`) region. The migration from manual AWS CLI setup to Infrastructure as Code provides better maintainability and deployment reliability. 