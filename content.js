let config = {
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

chrome.storage.local.get("config", function (data) {
  if (data.config) {
    config = data.config;
    console.log("Config loaded:", config);
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const date = request?.date;
  const msg = request?.msg;
  const action = request?.action;
  if (date) {
    showPopup(date, "top-right");
  } else if (msg) {
    generateDateNow();
  } else if (action === "openModal") {
    showModal();
  }
});

let keydownTimeoutId = null;

document.addEventListener("keydown", function (event) {
  if (keydownTimeoutId) {
    clearTimeout(keydownTimeoutId);
    keydownTimeoutId = null;
  }

  const isCommandOrCtrl = event.metaKey || event.ctrlKey;
  const isShift = event.shiftKey;
  const keyAction = event.key.toUpperCase();

  const shortcutActions = {
    generateDateNow: () => generateDateNow(),
    convertEpoch: () => {
      const selection = window.getSelection().toString().trim();
      const epochTime = parseInt(selection, 10);
      if (!isNaN(epochTime)) {
        const convertedDate = new Date(epochTime).toLocaleString();
        const message = `Converted Date: ${convertedDate}`;
        showPopup(message, "top-right");
      }
    },
    openModal: () => showModal(),
  };

  keydownTimeoutId = setTimeout(() => {
    for (const action in config.shortcuts) {
      const shortcut = config.shortcuts[action];
      if (
        isCommandOrCtrl === shortcut.metaKey &&
        isShift === shortcut.shiftKey &&
        keyAction === shortcut.key.toUpperCase()
      ) {
        shortcutActions[action]();
        break;
      }
    }
    keydownTimeoutId = null;
  }, 50);
});

function generateDateNow() {
  const nowEpochTime = Date.now();
  copyToClipboard(nowEpochTime.toString());
  showNotification("Date.now() was copied to the clipboard", "bottom-right");
}

function showModal() {
  const existingModal = document.getElementById("epochConverterModal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.setAttribute("id", "epochConverterModal");

  const modalContent = document.createElement("div");
  modalContent.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #323232;
    color: #cccccc;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 10001;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #cccccc;
  `;
  closeButton.onclick = function () {
    modal.remove();
  };

  modalContent.appendChild(closeButton);

  const form = document.createElement("form");
  form.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  `;

  const labels = ["Year", "Month", "Day", "Hour", "Minute", "Second"];
  const inputs = [];

  labels.forEach((label) => {
    const container = document.createElement("div");
    container.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

    const labelElement = document.createElement("label");
    labelElement.innerText = label;
    labelElement.style.cssText = `
      font-size: 12px;
      margin-bottom: 5px;
      color: #cccccc;
    `;

    const input = document.createElement("input");
    input.type = "number";
    input.style.cssText = `
      width: 50px;
      padding: 5px;
      text-align: center;
      background-color: #454545;
      color: #ffffff;
      border: 1px solid #ccc;
      border-radius: 3px;
    `;
    inputs.push(input);

    container.appendChild(labelElement);
    container.appendChild(input);
    form.appendChild(container);
  });

  const gmtContainer = document.createElement("div");
  gmtContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const gmtLabel = document.createElement("label");
  gmtLabel.innerText = "GMT";
  gmtLabel.style.cssText = `
    font-size: 12px;
    margin-bottom: 5px;
    color: #cccccc;
  `;

  const gmtSelect = document.createElement("select");
  for (let i = -12; i <= 14; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = `GMT${i >= 0 ? "+" + i : i}`;
    gmtSelect.appendChild(option);
  }
  gmtSelect.style.cssText = `
    padding: 5px;
    background-color: #454545;
    color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 3px;
  `;

  gmtContainer.appendChild(gmtLabel);
  gmtContainer.appendChild(gmtSelect);
  form.appendChild(gmtContainer);

  const convertButton = document.createElement("button");
  convertButton.type = "button";
  convertButton.innerText = "Convert";
  convertButton.style.cssText = `
    padding: 10px 20px;
    font-size: 14px;
    background-color: #454545;
    color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 20px;
  `;
  convertButton.onclick = function () {
    const [year, month, day, hour, minute, second] = inputs.map(
      (input, idx) => {
        let inputValue = Number(input.value);
        idx === 0 && inputValue === 0
          ? (inputValue += new Date().getFullYear())
          : null;
        idx === 1 && inputValue === 0 ? inputValue++ : null;
        idx === 2 && inputValue === 0 ? inputValue++ : null;
        return parseInt(inputValue, 10);
      }
    );
    month === 0 ? (month += 1) : null;
    const gmt = parseInt(gmtSelect.value, 10);

    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    const epochTime = date.getTime();
    copyToClipboard(epochTime.toString());
    showNotification(
      `Epoch time ${epochTime} copied to clipboard`,
      "bottom-right"
    );
    modal.remove();
  };

  form.appendChild(convertButton);
  modalContent.appendChild(form);
  modal.appendChild(modalContent);

  Object.assign(modal.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "10000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.remove();
    }
  };

  document.body.appendChild(modal);
}

function showPopup(message, position) {
  const existingPopup = document.getElementById("epochConverterPopup");
  if (existingPopup) {
    existingPopup.remove();
  }

  createNotificationElement(message, position, "epochConverterPopup");
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {})
    .catch((err) => {
      console.error("Failed to copy text to clipboard", err);
    });
}

function showNotification(message, position) {
  const existingNotification = document.getElementById("clipboardNotification");
  if (existingNotification) {
    existingNotification.remove();
  }

  createNotificationElement(message, position, "clipboardNotification");
}

function createNotificationElement(message, position, id) {
  const notification = document.createElement("div");
  notification.setAttribute("id", id);

  const header = document.createElement("div");
  header.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `;

  const iconUrl = chrome.runtime.getURL("images/icon48.png");
  const icon = document.createElement("img");
  icon.src = iconUrl;
  icon.style.cssText = "width: 35px; margin-left: 15px; ";

  icon.onerror = function () {
    console.error("Failed to load icon from URL:", iconUrl);
  };

  icon.onload = function () {
    console.log("Icon loaded successfully from URL:", iconUrl);
  };

  const title = document.createElement("div");
  title.appendChild(document.createTextNode("EpochTime_Converter"));
  title.style.cssText = `
    font-size: 16px;
    font-weight: bold;
    color: #cccccc;
  `;

  header.appendChild(icon);
  header.appendChild(title);

  const content = document.createElement("div");
  content.innerText = message;

  notification.appendChild(header);
  notification.appendChild(content);

  const positionStyles = {
    "top-right": {
      top: "20px",
      right: "20px",
    },
    "bottom-right": {
      bottom: "20px",
      right: "20px",
    },
  };

  Object.assign(notification.style, {
    position: "fixed",
    backgroundColor: "#323232",
    color: "#ffffff",
    padding: "20px 30px",
    borderRadius: "5px",
    zIndex: "10000",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontSize: "16px",
    transition: "opacity 0.3s ease",
    opacity: "1",
    display: "flex",
    flexDirection: "column",
    minWidth: "250px",
    ...positionStyles[position],
  });

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 7000);
}
