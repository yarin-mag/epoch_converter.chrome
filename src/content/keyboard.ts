import type { AppConfig } from "../shared/types";
import { TIMING } from "../shared/constants";
import { getSelectionText, parseEpochTime, epochToDateString, copyToClipboard } from "./utils";
import { showPopup, showNotification } from "./notifications";
import { showModal } from "./modal";

interface ShortcutActions {
  generateDateNow: () => void;
  convertEpoch: () => void;
  openModal: () => void;
}

function createShortcutActions(): ShortcutActions {
  return {
    generateDateNow: async () => {
      const nowEpochTime = Date.now();
      try {
        await copyToClipboard(nowEpochTime.toString());
        showNotification("Date.now() was copied to the clipboard", "bottom-right");
      } catch (err) {
        console.error("Failed to copy Date.now()", err);
      }
    },
    convertEpoch: () => {
      const selection = getSelectionText();
      const epochTime = parseEpochTime(selection);
      if (!isNaN(epochTime)) {
        const convertedDate = epochToDateString(epochTime);
        showPopup(`Converted Date: ${convertedDate}`, "top-right");
      }
    },
    openModal: () => showModal(),
  };
}

function matchesShortcut(
  event: KeyboardEvent,
  shortcut: { metaKey: boolean; shiftKey: boolean; key: string }
): boolean {
  const isCommandOrCtrl = event.metaKey || event.ctrlKey;
  const isShift = event.shiftKey;
  const keyAction = event.key.toUpperCase();

  return (
    isCommandOrCtrl === shortcut.metaKey &&
    isShift === shortcut.shiftKey &&
    keyAction === shortcut.key.toUpperCase()
  );
}

export function setupKeyboardShortcuts(config: AppConfig): () => void {
  let keydownTimeoutId: number | null = null;
  const actions = createShortcutActions();

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (keydownTimeoutId) {
      clearTimeout(keydownTimeoutId);
      keydownTimeoutId = null;
    }

    keydownTimeoutId = window.setTimeout(() => {
      for (const actionName in config.shortcuts) {
        const shortcut = config.shortcuts[actionName as keyof typeof config.shortcuts];
        if (matchesShortcut(event, shortcut)) {
          const action = actions[actionName as keyof ShortcutActions];
          if (action) {
            action();
          }
          break;
        }
      }
      keydownTimeoutId = null;
    }, TIMING.KEYBOARD_DEBOUNCE);
  };

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    if (keydownTimeoutId) {
      clearTimeout(keydownTimeoutId);
    }
    document.removeEventListener("keydown", handleKeyDown);
  };
}
