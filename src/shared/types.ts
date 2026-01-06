export interface ShortcutConfig {
  metaKey: boolean;
  shiftKey: boolean;
  key: string;
}

export interface AppConfig {
  shortcuts: {
    generateDateNow: ShortcutConfig;
    convertEpoch: ShortcutConfig;
    openModal: ShortcutConfig;
  };
}

export type NotificationPosition = "top-right" | "bottom-right";

export interface MessagePayload {
  date?: string;
  msg?: string;
  action?: "openModal";
}

export interface DateInputs {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  gmt: number;
}
