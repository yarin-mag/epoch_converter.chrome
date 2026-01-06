import type { DateInputs } from "../shared/types";
import { DOM_IDS, CSS_CLASSES, GMT_RANGE } from "../shared/constants";
import { removeElementById, copyToClipboard } from "./utils";
import { showNotification } from "./notifications";

function createCloseButton(onClose: () => void): HTMLButtonElement {
  const closeButton = document.createElement("button");
  closeButton.className = CSS_CLASSES.MODAL_CLOSE;
  closeButton.innerHTML = "&times;";
  closeButton.setAttribute("aria-label", "Close modal");
  closeButton.onclick = onClose;
  return closeButton;
}

function createDateInput(label: string): {
  container: HTMLDivElement;
  input: HTMLInputElement;
} {
  const container = document.createElement("div");
  container.className = CSS_CLASSES.MODAL_INPUT_CONTAINER;

  const labelElement = document.createElement("label");
  labelElement.className = CSS_CLASSES.MODAL_LABEL;
  labelElement.textContent = label;

  const input = document.createElement("input");
  input.type = "number";
  input.className = CSS_CLASSES.MODAL_INPUT;
  input.setAttribute("aria-label", label);

  container.appendChild(labelElement);
  container.appendChild(input);

  return { container, input };
}

function createDateInputs(container: HTMLDivElement): HTMLInputElement[] {
  const labels = ["Year", "Month", "Day", "Hour", "Minute", "Second"];
  const inputs: HTMLInputElement[] = [];

  labels.forEach((label) => {
    const { container: inputContainer, input } = createDateInput(label);
    inputs.push(input);
    container.appendChild(inputContainer);
  });

  return inputs;
}

function createGMTSelector(container: HTMLDivElement): HTMLSelectElement {
  const gmtLabel = document.createElement("label");
  gmtLabel.className = CSS_CLASSES.MODAL_LABEL;
  gmtLabel.textContent = "GMT Offset";

  const gmtSelect = document.createElement("select");
  gmtSelect.className = CSS_CLASSES.MODAL_SELECT;
  gmtSelect.setAttribute("aria-label", "GMT offset");

  for (let i = GMT_RANGE.MIN; i <= GMT_RANGE.MAX; i++) {
    const option = document.createElement("option");
    option.value = i.toString();
    option.textContent = `GMT${i >= 0 ? `+${i}` : i}`;
    gmtSelect.appendChild(option);
  }

  container.appendChild(gmtLabel);
  container.appendChild(gmtSelect);

  return gmtSelect;
}

function normalizeInputs(inputs: HTMLInputElement[]): DateInputs {
  const values = inputs.map((input, idx) => {
    let value = Number(input.value);
    if (idx === 0 && value === 0) {
      value += new Date().getFullYear();
    } else if (idx === 1 && value === 0) {
      value++;
    } else if (idx === 2 && value === 0) {
      value++;
    }
    return parseInt(value.toString(), 10);
  });

  let month = values[1];
  if (month === 0) {
    month += 1;
  }

  return {
    year: values[0],
    month,
    day: values[2],
    hour: values[3],
    minute: values[4],
    second: values[5],
    gmt: 0,
  };
}

async function handleModalConvert(
  inputs: HTMLInputElement[],
  gmtSelect: HTMLSelectElement,
  modal: HTMLDivElement
): Promise<void> {
  const dateInputs = normalizeInputs(inputs);
  dateInputs.gmt = parseInt(gmtSelect.value, 10);

  const date = new Date(
    Date.UTC(
      dateInputs.year,
      dateInputs.month - 1,
      dateInputs.day,
      dateInputs.hour,
      dateInputs.minute,
      dateInputs.second
    )
  );
  const epochTime = date.getTime();

  try {
    await copyToClipboard(epochTime.toString());
    showNotification(`Epoch time ${epochTime} copied to clipboard`, "bottom-right");
    modal.remove();
  } catch (err) {
    console.error("Failed to copy epoch time", err);
  }
}

function setupModalEvents(
  modal: HTMLDivElement,
  closeButton: HTMLButtonElement,
  convertButton: HTMLButtonElement,
  inputs: HTMLInputElement[],
  gmtSelect: HTMLSelectElement
): void {
  const closeModal = () => modal.remove();

  closeButton.onclick = closeModal;
  convertButton.onclick = () => handleModalConvert(inputs, gmtSelect, modal);

  modal.onclick = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);
}

function createModalHeader(): HTMLDivElement {
  const header = document.createElement("div");
  header.className = "epoch-modal-header";

  const title = document.createElement("h2");
  title.className = "epoch-modal-title";
  title.textContent = "📅 Date to Epoch Converter";

  const subtitle = document.createElement("p");
  subtitle.className = "epoch-modal-subtitle";
  subtitle.textContent = "Enter a date and time to convert to epoch timestamp";

  header.appendChild(title);
  header.appendChild(subtitle);
  return header;
}

function createModalForm(): {
  form: HTMLFormElement;
  inputs: HTMLInputElement[];
  gmtSelect: HTMLSelectElement;
  convertButton: HTMLButtonElement;
} {
  const form = document.createElement("form");
  form.className = CSS_CLASSES.MODAL_FORM;

  const header = createModalHeader();
  form.appendChild(header);

  const inputsRow = document.createElement("div");
  inputsRow.className = "epoch-modal-inputs-row";

  const inputs = createDateInputs(inputsRow);
  form.appendChild(inputsRow);

  const gmtContainer = document.createElement("div");
  gmtContainer.className = "epoch-modal-select-container";
  const gmtSelect = createGMTSelector(gmtContainer);
  form.appendChild(gmtContainer);

  const convertButton = document.createElement("button");
  convertButton.type = "button";
  convertButton.className = CSS_CLASSES.MODAL_BUTTON;
  const buttonText = document.createElement("span");
  buttonText.className = "epoch-modal-button-text";
  buttonText.textContent = "✨ Convert";
  convertButton.appendChild(buttonText);

  form.appendChild(convertButton);

  return { form, inputs, gmtSelect, convertButton };
}

function createModal(): HTMLDivElement {
  const modal = document.createElement("div");
  modal.id = DOM_IDS.MODAL;
  modal.className = CSS_CLASSES.MODAL_OVERLAY;

  const modalContent = document.createElement("div");
  modalContent.className = CSS_CLASSES.MODAL_CONTENT;

  modal.appendChild(modalContent);
  return modal;
}

export function showModal(): void {
  removeElementById(DOM_IDS.MODAL);

  const modal = createModal();
  const modalContent = modal.querySelector(
    `.${CSS_CLASSES.MODAL_CONTENT}`
  ) as HTMLDivElement;

  const closeButton = createCloseButton(() => modal.remove());
  modalContent.appendChild(closeButton);

  const { form, inputs, gmtSelect, convertButton } = createModalForm();
  modalContent.appendChild(form);

  setupModalEvents(modal, closeButton, convertButton, inputs, gmtSelect);

  document.body.appendChild(modal);
}
