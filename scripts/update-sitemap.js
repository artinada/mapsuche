#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import blog config (we'll need to transpile this)

// Read the current sitemap
const sitemapPath = path.join(__dirname, '../client/public/sitemap.xml');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// Extract blog posts from config
const blogConfigPath = path.join(__dirname, '../client/src/lib/blogConfig.ts');
const blogConfigContent = fs.readFileSync(blogConfigPath, 'utf8');

// Better regex to match individual blog posts - match complete post objects
const blogPostRegex = /{\s*id:\s*(\d+),\s*slug:\s*'([^']+)',[\s\S]*?date:\s*'([^']+)',[\s\S]*?published:\s*(true|false)[^}]*}/g;

const publishedPosts = [];
let match;
while ((match = blogPostRegex.exec(blogConfigContent)) !== null) {
  // Only include if published is true
  if (match[4] === 'true') {
    publishedPosts.push({
      id: match[1],
      slug: match[2],
      date: match[3]
    });
  }
}

// Generate blog entries
const blogEntries = publishedPosts.map(post => `
  <url>
    <loc>https://mapsuche.de/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

// Update sitemap - replace blog section
const blogSectionStart = '  <!-- Blog Articles -->';
const blogSectionEnd = '  <!-- Legal Pages -->';

const beforeBlogSection = sitemapContent.substring(0, sitemapContent.indexOf(blogSectionStart));
const afterBlogSection = sitemapContent.substring(sitemapContent.indexOf(blogSectionEnd));

const newSitemapContent = beforeBlogSection + blogSectionStart + blogEntries + '\n\n' + afterBlogSection;

// Write updated sitemap
fs.writeFileSync(sitemapPath, newSitemapContent);

console.log(`✅ Sitemap updated with ${publishedPosts.length} blog posts`);
console.log('📝 Published posts:');
publishedPosts.forEach(post => {
  console.log(`   - ${post.slug} (${post.date})`);
}); 