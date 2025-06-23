#!/usr/bin/env node

/**
 * Favicon Generator Script for MapSuche
 * 
 * This script generates PNG favicon files from the SVG source.
 * Run with: node scripts/generate-favicons.js
 * 
 * Requirements: Install sharp with `npm install sharp`
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if sharp is available
let sharp;
try {
  const sharpModule = await import('sharp');
  sharp = sharpModule.default;
} catch (error) {
  console.log('Sharp not available. Install with: npm install sharp');
  console.log('For now, we\'ll create placeholder files.');
}

const publicDir = path.join(__dirname, '../client/public');
const svgPath = path.join(publicDir, 'favicon.svg');

// Favicon sizes to generate
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' }
];

async function generateFavicons() {
  console.log('🎨 Generating MapSuche favicons...');
  
  if (!fs.existsSync(svgPath)) {
    console.error('❌ favicon.svg not found at:', svgPath);
    return;
  }

  if (!sharp) {
    console.log('📝 Creating placeholder files (install sharp for actual generation)');
    
    // Create placeholder files
    for (const { name } of sizes) {
      const placeholderPath = path.join(publicDir, name);
      fs.writeFileSync(placeholderPath, '# Placeholder PNG file - install sharp to generate actual favicons');
      console.log(`📄 Created placeholder: ${name}`);
    }
    
    // Create basic favicon.ico placeholder
    const icoPath = path.join(publicDir, 'favicon.ico');
    fs.writeFileSync(icoPath, '# Placeholder ICO file - install sharp to generate actual favicon');
    console.log('📄 Created placeholder: favicon.ico');
    
    return;
  }

  try {
    // Generate PNG files from SVG
    for (const { size, name } of sizes) {
      const outputPath = path.join(publicDir, name);
      
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated: ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (using 32x32 as base)
    const icoPath = path.join(publicDir, 'favicon.ico');
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(icoPath.replace('.ico', '.png'));
    
    // Rename to .ico (basic approach)
    fs.renameSync(icoPath.replace('.ico', '.png'), icoPath);
    console.log('✅ Generated: favicon.ico');

    console.log('🎉 All favicons generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
  }
}

// Add to package.json scripts info
console.log('💡 Add this to your package.json scripts:');
console.log('  "generate-favicons": "node scripts/generate-favicons.js"');
console.log('');

generateFavicons(); 