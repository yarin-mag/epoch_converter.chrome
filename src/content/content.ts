import type { MessagePayload } from "../shared/types";
import { loadConfig } from "../shared/config";
import { setupKeyboardShortcuts } from "./keyboard";
import { showPopup, showNotification } from "./notifications";
import { showModal } from "./modal";
import { copyToClipboard } from "./utils";
import { injectStyles } from "./injectStyles";

function handleMessage(request: MessagePayload): void {
  if (request.date) {
    showPopup(request.date, "top-right");
  } else if (request.msg) {
    const nowEpochTime = Date.now();
    copyToClipboard(nowEpochTime.toString())
      .then(() => {
        showNotification("Date.now() was copied to the clipboard", "bottom-right");
      })
      .catch((err) => {
        console.error("Failed to copy Date.now()", err);
      });
  } else if (request.action === "openModal") {
    showModal();
  }
}

async function initialize(): Promise<void> {
  injectStyles();

  const config = await loadConfig();
  const cleanupKeyboard = setupKeyboardShortcuts(config);

  chrome.runtime.onMessage.addListener(
    (request: MessagePayload, _sender, _sendResponse) => {
      handleMessage(request);
    }
  );

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.config) {
      cleanupKeyboard();
      const newConfig = changes.config.newValue;
      if (newConfig) {
        setupKeyboardShortcuts(newConfig);
      }
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
