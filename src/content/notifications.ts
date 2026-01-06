import type { NotificationPosition } from "../shared/types";
import { DOM_IDS, CSS_CLASSES, TIMING } from "../shared/constants";
import { removeElementById } from "./utils";

function createNotificationHeader(): HTMLDivElement {
  const header = document.createElement("div");
  header.className = CSS_CLASSES.NOTIFICATION_HEADER;

  const iconUrl = chrome.runtime.getURL("images/icon48.png");
  const icon = document.createElement("img");
  icon.src = iconUrl;
  icon.className = CSS_CLASSES.NOTIFICATION_ICON;
  icon.alt = "Epoch Converter";
  icon.style.objectFit = "contain";

  icon.onerror = () => {
    icon.style.display = "none";
    console.error("Failed to load icon from URL:", iconUrl);
  };

  const title = document.createElement("div");
  title.className = CSS_CLASSES.NOTIFICATION_TITLE;
  title.textContent = "Epoch Converter";

  header.appendChild(icon);
  header.appendChild(title);
  return header;
}

function createNotificationElement(
  message: string,
  position: NotificationPosition,
  id: string
): HTMLDivElement {
  const notification = document.createElement("div");
  notification.id = id;
  notification.className = `${CSS_CLASSES.NOTIFICATION} ${position}`;

  const header = createNotificationHeader();
  notification.appendChild(header);

  const content = document.createElement("div");
  content.className = CSS_CLASSES.NOTIFICATION_CONTENT;
  content.textContent = message;
  notification.appendChild(content);

  return notification;
}

export function showNotification(
  message: string,
  position: NotificationPosition
): void {
  removeElementById(DOM_IDS.NOTIFICATION);

  const notification = createNotificationElement(
    message,
    position,
    DOM_IDS.NOTIFICATION
  );

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => {
      notification.remove();
    }, TIMING.NOTIFICATION_FADE);
  }, TIMING.NOTIFICATION_DISPLAY);
}

export function showPopup(
  message: string,
  position: NotificationPosition
): void {
  removeElementById(DOM_IDS.POPUP);

  const popup = createNotificationElement(message, position, DOM_IDS.POPUP);
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("fade-out");
    setTimeout(() => {
      popup.remove();
    }, TIMING.NOTIFICATION_FADE);
  }, TIMING.NOTIFICATION_DISPLAY);
}
