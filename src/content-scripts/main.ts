import { App} from "vue";
import useZimuLayer from "../hooks/useZimuLayer";

const { createVueApp } = useZimuLayer();

let app: App<Element>;

chrome.runtime.onMessage.addListener(
  (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message.key == 'create') { //创建
      app = createVueApp();
    }

    sendResponse("ok");
  }
);
