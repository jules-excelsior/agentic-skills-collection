#!/usr/bin/env node
/**
 * build-site.js
 * Copies skills_index.json into the public/ folder so the
 * browser UI can fetch it at runtime on Vercel.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../');
const src  = path.join(root, 'skills_index.json');
const dest = path.join(root, 'public', 'skills_index.json');

// Ensure public/ exists
if (!fs.existsSync(path.join(root, 'public'))) {
  fs.mkdirSync(path.join(root, 'public'), { recursive: true });
  console.log('📁 Created public/ directory');
}

// Copy skills_index.json
if (!fs.existsSync(src)) {
  console.error('❌ skills_index.json not found at:', src);
  process.exit(1);
}

fs.copyFileSync(src, dest);
const size = (fs.statSync(dest).size / 1024).toFixed(1);
console.log(`✅ Copied skills_index.json → public/skills_index.json (${size} KB)`);

// Also copy the catalog HTML if it exists
const catalogSrc = path.join(root, 'CATALOG.md');
if (fs.existsSync(catalogSrc)) {
  fs.copyFileSync(catalogSrc, path.join(root, 'public', 'CATALOG.md'));
  console.log('✅ Copied CATALOG.md → public/CATALOG.md');
}

console.log('🚀 Site assets ready in public/');
