# Build Instructions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the extension:
```bash
npm run build
```

This will:
- Compile TypeScript files from `src/` to `dist/`
- Copy HTML, CSS, and image assets to `dist/`

## Development

For watch mode during development:
```bash
npm run watch
```

## Loading the Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `epoch_converter.chrome` directory (not the `dist` folder - Chrome will use the files as specified in `manifest.json`)

## Note on ES Modules

The TypeScript code compiles to ES2020 modules. Chrome extensions with Manifest V3 don't directly support ES modules in content scripts and service workers. 

If you encounter module loading issues, you may need to:
1. Use a bundler like `esbuild` or `rollup` to bundle the modules into a single file
2. Or adjust the build process to output a compatible format

For a simple bundler solution, you can add `esbuild`:
```bash
npm install --save-dev esbuild
```

Then update the build script in `package.json` to bundle the files.
