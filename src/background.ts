chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails) => {
    console.log(details);
  }
);

chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  console.log(tab);
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { key: 'create', value:'' });
  }
});

chrome.runtime.onMessage.addListener(
  (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    console.log(message);
    sendResponse(message);
  }
);

export {};
