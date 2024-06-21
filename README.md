# Epoch Time Converter

## Overview

The **Epoch Time Converter** is a Chrome extension designed to simplify the conversion between epoch time and human-readable date formats. This tool is perfect for developers, data analysts, or anyone who frequently works with epoch timestamps.

![Extension Icon](images/icon128.png)

## Features

- **Convert Epoch to Date:** Select any epoch timestamp on a webpage, press `Ctrl + Shift + S` (or `Cmd + Shift + S` on Mac), and instantly see the human-readable date format.
- **Copy Current Epoch Time:** Press `Ctrl + Shift + O` (or `Cmd + Shift + O` on Mac) to copy the current epoch time to your clipboard.
- **Custom Date to Epoch:** Open a modal to input a custom date and time, select the desired GMT, and convert it to epoch time, which is automatically copied to your clipboard. This can be done through the context menu or by pressing `Ctrl + Shift + M` (or `Cmd + Shift + M` on Mac).
- **Configurable Shortcuts:** Customize the keyboard shortcuts for all actions via the extension's options page.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yarin-mag/epoch-time-converter.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" in the top right corner.

4. Click "Load unpacked" and select the directory where you cloned the repository.

## Usage

### Convert Epoch to Date

1. Select an epoch timestamp on any webpage.
2. Press `Ctrl + Shift + S` (or `Cmd + Shift + S` on Mac).
3. A popup will display the converted date and time in a human-readable format.

### Copy Current Epoch Time

1. Press `Ctrl + Shift + O` (or `Cmd + Shift + O` on Mac).
2. The current epoch time is copied to your clipboard, and a notification confirms the action.

### Custom Date to Epoch

1. Right-click on any webpage and select "Open Date to Epoch Converter" from the context menu or press `Ctrl + Shift + M` (or `Cmd + Shift + M` on Mac).
2. A modal will appear, allowing you to input a custom date and time, and select a GMT offset.
3. Click "Convert" to copy the corresponding epoch time to your clipboard.

### Configuring Shortcuts

1. Navigate to the extension's options page via `chrome://extensions/`.
2. Click on "Details" under the Epoch Time Converter extension.
3. Select "Extension options".
4. Update the shortcuts and save.

## Screenshots

### Convert Epoch to Date Popup

![Convert Epoch to Date Popup](https://i.imgur.com/uR8kOeB.png)

### Custom Date to Epoch Modal

![Custom Date to Epoch Modal](https://i.imgur.com/K8zehlf.png)

### Options Page

![Options Page](https://i.imgur.com/twfH9oJ.png)

## Contact

For questions or suggestions, feel free to contact [Yarin](mailto:yarinmagdaci@gmail.com).

---
