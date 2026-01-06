import type { AppConfig } from "./types";

export const DOM_IDS = {
  MODAL: "epochConverterModal",
  POPUP: "epochConverterPopup",
  NOTIFICATION: "clipboardNotification",
} as const;

export const CSS_CLASSES = {
  MODAL: "epoch-modal",
  MODAL_OVERLAY: "epoch-modal-overlay",
  MODAL_CONTENT: "epoch-modal-content",
  MODAL_CLOSE: "epoch-modal-close",
  MODAL_FORM: "epoch-modal-form",
  MODAL_INPUT_CONTAINER: "epoch-modal-input-container",
  MODAL_LABEL: "epoch-modal-label",
  MODAL_INPUT: "epoch-modal-input",
  MODAL_SELECT: "epoch-modal-select",
  MODAL_BUTTON: "epoch-modal-button",
  NOTIFICATION: "epoch-notification",
  NOTIFICATION_HEADER: "epoch-notification-header",
  NOTIFICATION_ICON: "epoch-notification-icon",
  NOTIFICATION_TITLE: "epoch-notification-title",
  NOTIFICATION_CONTENT: "epoch-notification-content",
} as const;

export const Z_INDEX = {
  MODAL_OVERLAY: 10000,
  MODAL_CONTENT: 10001,
  NOTIFICATION: 10000,
} as const;

export const TIMING = {
  KEYBOARD_DEBOUNCE: 50,
  NOTIFICATION_DISPLAY: 7000,
  NOTIFICATION_FADE: 300,
} as const;

export const DEFAULT_CONFIG: AppConfig = {
  shortcuts: {
    generateDateNow: {
      metaKey: true,
      shiftKey: true,
      key: "O",
    },
    convertEpoch: {
      metaKey: true,
      shiftKey: true,
      key: "S",
    },
    openModal: {
      metaKey: true,
      shiftKey: true,
      key: "M",
    },
  },
};

export const GMT_RANGE = {
  MIN: -12,
  MAX: 14,
} as const;
