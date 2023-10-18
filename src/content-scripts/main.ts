import useZimuLayer from "../hooks/useZimuLayer";

/// <reference types="chrome"/>

const { createVueApp } = useZimuLayer();

const addScriptToBody = () => {
  if (!document.scripts) {
    document.body.append(document.createElement("script"));
  }
}

chrome.runtime.onMessage.addListener(
  (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message.key == 'create') { //创建
      addScriptToBody();
      createVueApp();
    }
    sendResponse("ok");
  }
);
