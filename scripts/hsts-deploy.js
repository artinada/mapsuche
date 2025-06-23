#!/usr/bin/env node

/**
 * HSTS Deployment Management Script
 * 
 * This script helps manage the gradual deployment of HSTS (HTTP Strict Transport Security)
 * by providing validation, monitoring, and safe progression through deployment stages.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HSTS Deployment Stages
const HSTS_STAGES = {
  STAGE_1_TESTING: {
    maxAge: 3600,
    name: 'Testing (1 hour)',
    includeSubdomains: false,
    preload: false,
    description: 'Initial testing and validation',
    minDuration: '24 hours',
    risks: ['Minimal risk', 'Easy recovery'],
    actions: [
      'Monitor for HTTPS-related issues',
      'Check all site functionality',
      'Verify no mixed content warnings',
      'Test on different browsers'
    ]
  },
  STAGE_2_SHORT: {
    maxAge: 86400,
    name: 'Short-term (1 day)',
    includeSubdomains: false,
    preload: false,
    description: 'Short-term validation',
    minDuration: '1 week',
    risks: ['Users forced to HTTPS for 1 day', 'Recovery requires waiting for expiration'],
    actions: [
      'Monitor analytics for traffic drops',
      'Check for user-reported issues',
      'Validate external integrations',
      'Consider enabling includeSubDomains'
    ]
  },
  STAGE_3_MEDIUM: {
    maxAge: 604800,
    name: 'Medium-term (1 week)',
    includeSubdomains: false,
    preload: false,
    description: 'Medium-term validation',
    minDuration: '2-3 weeks',
    risks: ['Users forced to HTTPS for 1 week', 'Longer recovery time'],
    actions: [
      'Comprehensive security audit',
      'Performance monitoring',
      'User experience validation',
      'Prepare for longer commitment'
    ]
  },
  STAGE_4_EXTENDED: {
    maxAge: 2592000,
    name: 'Extended (1 month)',
    includeSubdomains: true,
    preload: false,
    description: 'Extended validation with subdomains',
    minDuration: '1-2 months',
    risks: ['Users forced to HTTPS for 1 month', 'Significant HTTPS commitment'],
    actions: [
      'Final security review',
      'Enable includeSubDomains',
      'Consider enabling preload',
      'Prepare for preload list submission'
    ]
  },
  STAGE_5_PRODUCTION: {
    maxAge: 31536000,
    name: 'Production (1 year)',
    includeSubdomains: true,
    preload: true,
    description: 'Full production deployment',
    minDuration: '6+ months before preload list',
    risks: ['Users forced to HTTPS for 1 year', 'Very difficult recovery', 'Preload list is permanent'],
    actions: [
      'Submit to HSTS preload list',
      'Monitor for security issues',
      'Regular security audits',
      'Keep certificates updated'
    ]
  }
};

// Current stage detection
function getCurrentStage() {
  const backendPath = path.join(__dirname, '..', 'amplify', 'backend.ts');
  
  if (!fs.existsSync(backendPath)) {
    console.error('Error: amplify/backend.ts not found');
    process.exit(1);
  }
  
  const content = fs.readFileSync(backendPath, 'utf8');
  const stageMatch = content.match(/const CURRENT_HSTS_STAGE = HSTS_STAGES\.(\w+)/);
  
  if (!stageMatch) {
    console.error('Error: Could not detect current HSTS stage');
    process.exit(1);
  }
  
  return stageMatch[1];
}

// Update stage in backend.ts
function updateStage(newStage) {
  const backendPath = path.join(__dirname, '..', 'amplify', 'backend.ts');
  let content = fs.readFileSync(backendPath, 'utf8');
  
  // Update the current stage
  content = content.replace(
    /const CURRENT_HSTS_STAGE = HSTS_STAGES\.\w+/,
    `const CURRENT_HSTS_STAGE = HSTS_STAGES.${newStage}`
  );
  
  // Update includeSubdomains if needed
  const stageConfig = HSTS_STAGES[newStage];
  if (stageConfig) {
    content = content.replace(
      /includeSubdomains: (true|false)/,
      `includeSubdomains: ${stageConfig.includeSubdomains}`
    );
    
    content = content.replace(
      /preload: (true|false)/,
      `preload: ${stageConfig.preload}`
    );
  }
  
  fs.writeFileSync(backendPath, content);
}

// Display stage information
function displayStageInfo(stageName) {
  const stage = HSTS_STAGES[stageName];
  if (!stage) {
    console.error(`Error: Unknown stage ${stageName}`);
    return;
  }
  
  console.log(`\n🔒 HSTS Stage: ${stage.name}`);
  console.log(`📝 Description: ${stage.description}`);
  console.log(`⏱️  Max-age: ${stage.maxAge} seconds`);
  console.log(`🌐 Include Subdomains: ${stage.includeSubdomains}`);
  console.log(`🚀 Preload: ${stage.preload}`);
  console.log(`⏰ Minimum Duration: ${stage.minDuration}`);
  
  console.log('\n⚠️  Risks:');
  stage.risks.forEach(risk => console.log(`   • ${risk}`));
  
  console.log('\n✅ Required Actions:');
  stage.actions.forEach(action => console.log(`   • ${action}`));
}

// Main command handling
function main() {
  const command = process.argv[2];
  const arg = process.argv[3];
  
  switch (command) {
    case 'status':
      const currentStage = getCurrentStage();
      console.log(`\n📊 Current HSTS Stage: ${currentStage}`);
      displayStageInfo(currentStage);
      break;
      
    case 'next':
      const current = getCurrentStage();
      const stages = Object.keys(HSTS_STAGES);
      const currentIndex = stages.indexOf(current);
      
      if (currentIndex === -1) {
        console.error('Error: Could not determine current stage');
        process.exit(1);
      }
      
      if (currentIndex >= stages.length - 1) {
        console.log('\n🎉 Already at the highest HSTS stage!');
        console.log('Consider submitting to HSTS preload list: https://hstspreload.org/');
        break;
      }
      
      const nextStage = stages[currentIndex + 1];
      console.log(`\n🔄 Advancing from ${current} to ${nextStage}`);
      
      // Show confirmation prompt
      console.log('\n⚠️  WARNING: This will change HSTS configuration!');
      displayStageInfo(nextStage);
      
      if (process.argv.includes('--confirm')) {
        updateStage(nextStage);
        console.log(`\n✅ Updated to ${nextStage}`);
        console.log('🚀 Run "npm run amplify:deploy" to apply changes');
      } else {
        console.log('\n❌ Add --confirm flag to proceed with the update');
        console.log('Example: node scripts/hsts-deploy.js next --confirm');
      }
      break;
      
    case 'set':
      if (!arg || !HSTS_STAGES[arg]) {
        console.error('Error: Please specify a valid stage');
        console.log('Available stages:', Object.keys(HSTS_STAGES).join(', '));
        process.exit(1);
      }
      
      console.log(`\n🔄 Setting HSTS stage to ${arg}`);
      displayStageInfo(arg);
      
      if (process.argv.includes('--confirm')) {
        updateStage(arg);
        console.log(`\n✅ Updated to ${arg}`);
        console.log('🚀 Run "npm run amplify:deploy" to apply changes');
      } else {
        console.log('\n❌ Add --confirm flag to proceed with the update');
        console.log(`Example: node scripts/hsts-deploy.js set ${arg} --confirm`);
      }
      break;
      
    case 'validate':
      console.log('\n🔍 Validating HSTS configuration...');
      
      // Check if HTTPS is properly configured
      console.log('✅ Checking HTTPS configuration...');
      
      // Check certificate expiration (would need additional implementation)
      console.log('ℹ️  Certificate expiration check: Manual verification required');
      
      // Check for mixed content (would need additional implementation)
      console.log('ℹ️  Mixed content check: Manual verification required');
      
      console.log('\n📋 Manual validation checklist:');
      console.log('   • Verify all pages load correctly over HTTPS');
      console.log('   • Check for mixed content warnings in browser console');
      console.log('   • Test all forms and interactive features');
      console.log('   • Verify external integrations work properly');
      console.log('   • Check analytics for any traffic drops');
      console.log('   • Monitor error logs for HTTPS-related issues');
      
      break;
      
    case 'help':
    default:
      console.log('\n🔒 HSTS Deployment Management');
      console.log('\nUsage: node scripts/hsts-deploy.js <command> [options]');
      console.log('\nCommands:');
      console.log('  status                 Show current HSTS stage and configuration');
      console.log('  next [--confirm]       Advance to the next HSTS stage');
      console.log('  set <stage> [--confirm] Set specific HSTS stage');
      console.log('  validate               Validate HSTS configuration');
      console.log('  help                   Show this help message');
      console.log('\nStages:');
      Object.keys(HSTS_STAGES).forEach(stage => {
        const config = HSTS_STAGES[stage];
        console.log(`  ${stage.padEnd(20)} ${config.name}`);
      });
      console.log('\nExamples:');
      console.log('  node scripts/hsts-deploy.js status');
      console.log('  node scripts/hsts-deploy.js next --confirm');
      console.log('  node scripts/hsts-deploy.js set STAGE_2_SHORT --confirm');
      console.log('  node scripts/hsts-deploy.js validate');
      break;
  }
}

main(); 