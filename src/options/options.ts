import type { AppConfig } from "../shared/types";
import { DEFAULT_CONFIG } from "../shared/constants";
import { saveConfig, getConfig } from "../shared/config";

interface OptionElements {
  generateDateNow: {
    input: HTMLInputElement;
    meta: HTMLInputElement;
    shift: HTMLInputElement;
  };
  convertEpoch: {
    input: HTMLInputElement;
    meta: HTMLInputElement;
    shift: HTMLInputElement;
  };
  openModal: {
    input: HTMLInputElement;
    meta: HTMLInputElement;
    shift: HTMLInputElement;
  };
  saveButton: HTMLButtonElement;
  saveStatus: HTMLDivElement;
}

function getOptionElements(): OptionElements {
  return {
    generateDateNow: {
      input: document.getElementById("generateDateNow") as HTMLInputElement,
      meta: document.getElementById("generateDateNowMeta") as HTMLInputElement,
      shift: document.getElementById("generateDateNowShift") as HTMLInputElement,
    },
    convertEpoch: {
      input: document.getElementById("convertEpoch") as HTMLInputElement,
      meta: document.getElementById("convertEpochMeta") as HTMLInputElement,
      shift: document.getElementById("convertEpochShift") as HTMLInputElement,
    },
    openModal: {
      input: document.getElementById("openModal") as HTMLInputElement,
      meta: document.getElementById("openModalMetaKey") as HTMLInputElement,
      shift: document.getElementById("openModalShift") as HTMLInputElement,
    },
    saveButton: document.getElementById("saveButton") as HTMLButtonElement,
    saveStatus: document.getElementById("saveStatus") as HTMLDivElement,
  };
}

function loadConfigIntoForm(
  config: AppConfig,
  elements: OptionElements
): void {
  elements.generateDateNow.input.value = config.shortcuts.generateDateNow.key;
  elements.generateDateNow.meta.checked = config.shortcuts.generateDateNow.metaKey;
  elements.generateDateNow.shift.checked = config.shortcuts.generateDateNow.shiftKey;

  elements.convertEpoch.input.value = config.shortcuts.convertEpoch.key;
  elements.convertEpoch.meta.checked = config.shortcuts.convertEpoch.metaKey;
  elements.convertEpoch.shift.checked = config.shortcuts.convertEpoch.shiftKey;

  elements.openModal.input.value = config.shortcuts.openModal.key;
  elements.openModal.meta.checked = config.shortcuts.openModal.metaKey;
  elements.openModal.shift.checked = config.shortcuts.openModal.shiftKey;
}

async function saveConfigFromForm(elements: OptionElements): Promise<void> {
  const newConfig: AppConfig = {
    shortcuts: {
      generateDateNow: {
        metaKey: elements.generateDateNow.meta.checked,
        shiftKey: elements.generateDateNow.shift.checked,
        key: elements.generateDateNow.input.value.toUpperCase(),
      },
      convertEpoch: {
        metaKey: elements.convertEpoch.meta.checked,
        shiftKey: elements.convertEpoch.shift.checked,
        key: elements.convertEpoch.input.value.toUpperCase(),
      },
      openModal: {
        metaKey: elements.openModal.meta.checked,
        shiftKey: elements.openModal.shift.checked,
        key: elements.openModal.input.value.toUpperCase(),
      },
    },
  };

  try {
    await saveConfig(newConfig);
    showSaveStatus(elements.saveStatus, "Settings saved successfully! ✨", true);
    console.log("Config saved:", newConfig);
  } catch (err) {
    showSaveStatus(elements.saveStatus, "Failed to save settings", false);
    console.error("Failed to save config", err);
  }
}

function showSaveStatus(
  statusElement: HTMLDivElement,
  message: string,
  success: boolean
): void {
  statusElement.textContent = message;
  statusElement.className = `save-status ${success ? "success" : "error"}`;
  
  setTimeout(() => {
    statusElement.textContent = "";
    statusElement.className = "save-status";
  }, 3000);
}

function initializeOptionsPage(): void {
  const elements = getOptionElements();

  getConfig((config) => {
    loadConfigIntoForm(config, elements);
  });

  elements.saveButton.addEventListener("click", () => {
    saveConfigFromForm(elements);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeOptionsPage);
} else {
  initializeOptionsPage();
}
