document.addEventListener("DOMContentLoaded", function () {
  const generateDateNowInput = document.getElementById("generateDateNow");
  const generateDateNowMeta = document.getElementById("generateDateNowMeta");
  const generateDateNowShift = document.getElementById("generateDateNowShift");

  const convertEpochInput = document.getElementById("convertEpoch");
  const convertEpochMeta = document.getElementById("convertEpochMeta");
  const convertEpochShift = document.getElementById("convertEpochShift");

  const openModalInput = document.getElementById("openModal");
  const openModalMeta = document.getElementById("openModalMetaKey");
  const openModalShift = document.getElementById("openModalShift");

  const saveButton = document.getElementById("saveButton");

  // Load existing config
  chrome.storage.local.get("config", function (data) {
    const config = data.config || {
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
          key: "E",
        },
      },
    };

    generateDateNowInput.value = config.shortcuts.generateDateNow.key;
    generateDateNowMeta.checked = config.shortcuts.generateDateNow.metaKey;
    generateDateNowShift.checked = config.shortcuts.generateDateNow.shiftKey;

    convertEpochInput.value = config.shortcuts.convertEpoch.key;
    convertEpochMeta.checked = config.shortcuts.convertEpoch.metaKey;
    convertEpochShift.checked = config.shortcuts.convertEpoch.shiftKey;

    openModalInput.value = config.shortcuts.openModal.key;
    openModalMeta.checked = config.shortcuts.openModal.metaKey;
    openModalShift.checked = config.shortcuts.openModal.shiftKey;
  });

  saveButton.addEventListener("click", function () {
    const newConfig = {
      shortcuts: {
        generateDateNow: {
          metaKey: generateDateNowMeta.checked,
          shiftKey: generateDateNowShift.checked,
          key: generateDateNowInput.value.toUpperCase(),
        },
        convertEpoch: {
          metaKey: convertEpochMeta.checked,
          shiftKey: convertEpochShift.checked,
          key: convertEpochInput.value.toUpperCase(),
        },
        openModal: {
          metaKey: openModalMeta.checked,
          shiftKey: openModalShift.checked,
          key: openModalInput.value.toUpperCase(),
        },
      },
    };

    // Save the new config to storage
    chrome.storage.local.set({ config: newConfig }, function () {
      console.log("Config saved:", newConfig);
    });
  });
});
