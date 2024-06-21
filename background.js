chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convertEpoch",
    title: "Convert from epoch",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "grabDateNow",
    title: "Give me Date.now to clipboard",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    id: "openModal",
    title: "Open Date to Epoch Converter",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertEpoch") {
    const epochTime = parseInt(info.selectionText.trim(), 10);
    if (!isNaN(epochTime)) {
      const convertedDate = new Date(epochTime).toLocaleString();
      chrome.tabs.sendMessage(tab.id, { date: convertedDate });
    }
  } else if (info.menuItemId === "grabDateNow") {
    chrome.tabs.sendMessage(tab.id, { msg: "Date.now()" });
  } else if (info.menuItemId === "openModal") {
    chrome.tabs.sendMessage(tab.id, { action: "openModal" });
  }
});
