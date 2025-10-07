#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const publicDir = path.join(__dirname, '../public');

// Files to copy from public to dist
const filesToCopy = [
  '.htaccess',
  '_headers', 
  '_redirects'
];

console.log('Running post-build script...');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist!');
  process.exit(1);
}

// Copy files from public to dist
filesToCopy.forEach(file => {
  const srcPath = path.join(publicDir, file);
  const destPath = path.join(distDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${file} to dist/`);
  } else {
    console.log(`⚠ File ${file} not found in public/`);
  }
});

// Copy 404.html and .nojekyll
const additionalFiles = ['404.html', '.nojekyll'];

additionalFiles.forEach(file => {
  const srcPath = path.join(__dirname, '..', file);
  const destPath = path.join(distDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${file} to dist/`);
  }
});

console.log('Post-build script completed successfully!');
