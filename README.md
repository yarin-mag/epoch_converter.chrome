# Epoch Time Converter

A Chrome extension for converting between epoch timestamps and human-readable dates. Built with TypeScript for type safety and maintainability.

![Extension Icon](images/icon128.png)

## Features

- **Convert Epoch to Date:** Select any epoch timestamp on a webpage and convert it to a human-readable date format
- **Copy Current Epoch Time:** Instantly copy the current epoch time (`Date.now()`) to your clipboard
- **Custom Date to Epoch:** Input a custom date and time with GMT offset to get the corresponding epoch timestamp
- **Configurable Shortcuts:** Customize keyboard shortcuts for all actions via the options page
- **Context Menu Integration:** Right-click context menu for quick access to all features

## Project Structure

```
epoch_converter.chrome/
├── src/
│   ├── content/          # Content script modules
│   │   ├── content.ts    # Main content script orchestrator
│   │   ├── keyboard.ts   # Keyboard shortcut handling
│   │   ├── modal.ts      # Modal creation and management
│   │   ├── notifications.ts  # Notification system
│   │   ├── utils.ts      # Utility functions
│   │   └── injectStyles.ts  # CSS injection
│   ├── background/       # Background service worker
│   │   └── background.ts
│   ├── options/          # Options page
│   │   ├── options.ts
│   │   └── options.html
│   ├── shared/           # Shared code
│   │   ├── types.ts      # TypeScript type definitions
│   │   ├── constants.ts  # Constants and configuration
│   │   └── config.ts     # Config management
│   └── styles/           # CSS files
│       ├── modal.css
│       ├── notifications.css
│       └── options.css
├── dist/                 # Compiled output (generated)
├── types/                # TypeScript type definitions
│   └── chrome.d.ts
├── images/               # Extension icons
├── manifest.json         # Chrome extension manifest
├── tsconfig.json         # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Chrome browser

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yarin-mag/epoch-time-converter.git
cd epoch-time-converter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Extension

```bash
npm run build
```

This will:
- Compile TypeScript files from `src/` to `dist/`
- Bundle all modules into single files (required for Chrome extensions)
- Copy HTML and CSS assets to `dist/`

### 4. Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the `epoch_converter.chrome` directory (the root directory containing `manifest.json`)

## Development

### Watch Mode

For development with automatic recompilation:

```bash
npm run watch
```

This will watch for file changes and automatically recompile TypeScript files.

### Available Scripts

- `npm run build` - Compile TypeScript and copy assets
- `npm run watch` - Watch mode for development
- `npm run clean` - Remove the `dist/` directory
- `npm run copy-assets` - Copy HTML and CSS files to dist

### Code Structure

The codebase follows these principles:

- **Function length limit:** All functions are kept under 50 lines (except edge cases)
- **Modular design:** Code is organized into logical modules
- **Type safety:** Full TypeScript coverage with strict mode
- **No inline styles:** All styles are in separate CSS files
- **Clean code:** Minimal comments, self-documenting code

## Usage

### Convert Epoch to Date

1. Select an epoch timestamp on any webpage
2. Press `Ctrl + Shift + S` (or `Cmd + Shift + S` on Mac)
3. A popup will display the converted date and time

**Alternative:** Right-click on selected text and choose "Convert from epoch"

### Copy Current Epoch Time

1. Press `Ctrl + Shift + O` (or `Cmd + Shift + O` on Mac)
2. The current epoch time is copied to your clipboard
3. A notification confirms the action

**Alternative:** Right-click anywhere and choose "Give me Date.now to clipboard"

### Custom Date to Epoch

1. Press `Ctrl + Shift + M` (or `Cmd + Shift + M` on Mac) or right-click and select "Open Date to Epoch Converter"
2. A modal will appear with date/time inputs
3. Enter the date, time, and GMT offset
4. Click "Convert" to copy the epoch time to your clipboard

### Configuring Shortcuts

1. Navigate to `chrome://extensions/`
2. Find "Epoch Time Converter" and click "Details"
3. Click "Extension options"
4. Customize the keyboard shortcuts:
   - Choose the key (single character)
   - Toggle Meta (Cmd/Ctrl) and Shift modifiers
5. Click "Save"

## Architecture

### Content Scripts

The content script (`src/content/content.ts`) orchestrates all page-level functionality:
- Keyboard shortcut handling
- Modal display
- Notifications
- Message handling from background script

### Background Service Worker

The background script (`src/background/background.ts`) handles:
- Context menu creation
- Message routing between context menu and content scripts

### Options Page

The options page (`src/options/`) provides:
- UI for configuring keyboard shortcuts
- Config persistence using Chrome storage API

### Shared Modules

- **types.ts:** TypeScript interfaces and types
- **constants.ts:** Magic numbers, CSS classes, default config
- **config.ts:** Configuration loading and saving utilities

## Building for Production

The build process automatically bundles all modules into single files. This is required because Chrome extensions with Manifest V3 don't support ES modules in content scripts.

The bundling process:
1. TypeScript compiles to ES2020 modules
2. A custom bundler (`scripts/bundle-content.js`) inlines all imports
3. All modules are combined into single files for content scripts, background, and options

The bundled files are:
- `dist/content/content.js` - All content script modules bundled
- `dist/background/background.js` - Background service worker bundled
- `dist/options/options.js` - Options page script bundled

## Troubleshooting

### TypeScript Errors

If you see `Cannot find name 'chrome'` errors:
1. Make sure you've run `npm install` to install `@types/chrome`
2. The local type definitions in `types/chrome.d.ts` should work as a fallback

### Module Import Errors

If you see `Cannot use import statement outside a module` errors:
1. Make sure you've run `npm run build` (not just `tsc`)
2. The build process includes a bundling step that removes ES module syntax
3. Check that `scripts/bundle-content.js` ran successfully

### Extension Not Loading

1. Make sure you've run `npm run build` to generate the `dist/` folder
2. Check the browser console for errors
3. Verify `manifest.json` paths point to `dist/` files
4. Make sure the bundling step completed successfully (check for "Bundling complete!" message)

### Shortcuts Not Working

1. Check if shortcuts conflict with other extensions
2. Verify the shortcuts are saved in the options page
3. Reload the extension after changing shortcuts

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Keep functions under 50 lines
2. Use TypeScript with strict mode
3. Extract styles to CSS files (no inline styles)
4. Add type definitions for new code
5. Test your changes before submitting

## License

This project is open source and available for use.

## Contact

For questions or suggestions, contact [Yarin](mailto:yarinmagdaci@gmail.com).

---

**Note:** This extension has been refactored from JavaScript to TypeScript with improved code organization, type safety, and maintainability.
