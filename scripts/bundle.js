#!/usr/bin/env node

/**
 * Simple bundler for Chrome extension
 * Combines ES modules into a single file for content scripts and service workers
 */

const fs = require('fs');
const path = require('path');

function bundleFile(filePath, outputPath, processed = new Set()) {
  if (processed.has(filePath)) {
    return '';
  }
  processed.add(filePath);

  let content = fs.readFileSync(filePath, 'utf8');
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"];?/g;
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    const fullImportPath = path.resolve(path.dirname(filePath), importPath);
    const jsPath = fullImportPath.endsWith('.js') ? fullImportPath : fullImportPath + '.js';
    
    if (fs.existsSync(jsPath)) {
      const importedContent = bundleFile(jsPath, outputPath, processed);
      // Remove the import statement
      content = content.replace(match[0], `\n// Bundled: ${importPath}\n${importedContent}\n`);
    }
  }

  // Remove export statements (we're bundling everything)
  content = content.replace(/export\s+/g, '');
  
  return content;
}

// This is a simplified bundler - for production, consider using esbuild or rollup
console.log('Note: Simple bundler used. For production, consider using esbuild or rollup.');
