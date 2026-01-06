import type { AppConfig } from "./types";
import { DEFAULT_CONFIG } from "./constants";

export async function loadConfig(): Promise<AppConfig> {
  return new Promise((resolve) => {
    chrome.storage.local.get("config", (data) => {
      if (data.config) {
        resolve(data.config as AppConfig);
      } else {
        resolve(DEFAULT_CONFIG);
      }
    });
  });
}

export async function saveConfig(config: AppConfig): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ config }, () => {
      resolve();
    });
  });
}

export function getConfig(callback: (config: AppConfig) => void): void {
  chrome.storage.local.get("config", (data) => {
    if (data.config) {
      callback(data.config as AppConfig);
    } else {
      callback(DEFAULT_CONFIG);
    }
  });
}
