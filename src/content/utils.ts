export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text to clipboard", err);
    throw err;
  }
}

export function getSelectionText(): string {
  return window.getSelection()?.toString().trim() || "";
}

export function removeElementById(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.remove();
  }
}

export function epochToDateString(epochTime: number): string {
  return new Date(epochTime).toLocaleString();
}

export function parseEpochTime(text: string): number {
  const num = parseInt(text.trim(), 10);
  if (isNaN(num)) {
    return NaN;
  }
  if (num.toString().length < 13) {
    return num * 1000;
  }
  return num;
}
