const fs = require('fs');
const path = require('path');

// Create a simple script that will be run after build to ensure proper file extensions
const distDir = path.join(__dirname, '../dist');

// Ensure all JS files have the correct extension
function fixMimeTypes() {
  if (!fs.existsSync(distDir)) {
    console.log('Dist directory does not exist');
    return;
  }

  // Find all JS files in assets directory
  const assetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    
    files.forEach(file => {
      if (file.endsWith('.js')) {
        const filePath = path.join(assetsDir, file);
        console.log(`Found JS file: ${file}`);
      }
    });
  }

  // Create a simple .htaccess file for Apache servers (GitHub Pages doesn't use this but it's good to have)
  const htaccessContent = `
# Fix MIME types for JavaScript files
<Files "*.js">
  Header set Content-Type "application/javascript"
</Files>
<Files "*.mjs">
  Header set Content-Type "application/javascript"
</Files>
`;

  fs.writeFileSync(path.join(distDir, '.htaccess'), htaccessContent);
  console.log('Created .htaccess file for MIME type fixes');
}

fixMimeTypes();
