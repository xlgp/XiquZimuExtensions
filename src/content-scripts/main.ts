import useZimuLayer from "../hooks/useZimuLayer";

/// <reference types="chrome"/>

const { createVueApp } = useZimuLayer();

chrome.runtime.onMessage.addListener(
  (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message.key == 'create') { //创建
      createVueApp();
    }

    sendResponse("ok");
  }
);
