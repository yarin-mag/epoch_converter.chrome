#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');

function resolveModulePath(importPath, fromFile) {
  const fromDir = path.dirname(fromFile);
  
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    const resolved = path.resolve(fromDir, importPath);
    if (fs.existsSync(resolved + '.js')) {
      return resolved + '.js';
    }
    if (fs.existsSync(resolved)) {
      return resolved;
    }
  }
  
  return null;
}

function extractExports(content) {
  const exports = new Map();
  
  const exportRegex = /export\s+(?:default\s+)?(?:function\s+(\w+)|const\s+(\w+)|async\s+function\s+(\w+)|class\s+(\w+)|interface\s+(\w+)|type\s+(\w+)|(?:\{([^}]+)\}))/g;
  let match;
  
  while ((match = exportRegex.exec(content)) !== null) {
    const names = match[1] || match[2] || match[3] || match[4] || match[5] || match[6] || match[7];
    if (names) {
      names.split(',').forEach(name => {
        const trimmed = name.trim().split(' as ')[0].trim();
        if (trimmed) exports.set(trimmed, true);
      });
    }
  }
  
  return exports;
}

function bundleModule(filePath, visited = new Set(), moduleMap = new Map()) {
  if (visited.has(filePath) || !fs.existsSync(filePath)) {
    return '';
  }
  
  visited.add(filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const importRegex = /import\s+(?:(?:\{([^}]+)\}|\*\s+as\s+(\w+)|(\w+))(?:\s*,\s*(?:\{([^}]+)\}|\*\s+as\s+(\w+)|(\w+)))*\s+from\s+)?['"]([^'"]+)['"];?/g;
  
  const imports = [];
  let match;
  const newContent = [];
  let lastIndex = 0;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[7] || match[6];
    const fullPath = resolveModulePath(importPath, filePath);
    
    if (fullPath) {
      const bundled = bundleModule(fullPath, visited, moduleMap);
      if (bundled) {
        imports.push(bundled);
      }
    }
    
    newContent.push(content.substring(lastIndex, match.index));
    lastIndex = match.index + match[0].length;
  }
  
  newContent.push(content.substring(lastIndex));
  
  let result = imports.join('\n\n') + '\n\n' + newContent.join('');
  result = result.replace(/export\s+/g, '');
  
  return result;
}

function bundleFile(inputFile, outputFile) {
  if (!fs.existsSync(inputFile)) {
    console.error(`Input file not found: ${inputFile}`);
    return;
  }
  
  const visited = new Set();
  const bundled = bundleModule(inputFile, visited);
  
  fs.writeFileSync(outputFile, bundled, 'utf8');
  console.log(`Bundled: ${path.relative(distDir, outputFile)}`);
}

const contentFile = path.join(distDir, 'content', 'content.js');
const backgroundFile = path.join(distDir, 'background', 'background.js');
const optionsFile = path.join(distDir, 'options', 'options.js');

console.log('Bundling modules...');

if (fs.existsSync(contentFile)) {
  bundleFile(contentFile, contentFile);
}

if (fs.existsSync(backgroundFile)) {
  bundleFile(backgroundFile, backgroundFile);
}

if (fs.existsSync(optionsFile)) {
  bundleFile(optionsFile, optionsFile);
}

console.log('Bundling complete!');
