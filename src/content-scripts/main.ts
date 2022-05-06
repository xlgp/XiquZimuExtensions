import { App, createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import ZimuDialog from "../views/ZimuDialog.vue";

const MOUNT_EL_ID = "attonex_clipper";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
  mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);

const vm = createApp(ZimuDialog)
  .use(ElementPlus)
  .mount(mountEl);

let visible = false;

((vm as unknown) as App<Element>).provide("toggleVisible", visible);

function toggleVisible(toggleVisible: boolean) {
  visible = !visible;
  ((vm as unknown) as App<Element>).provide("toggleVisible", visible);
}

chrome.runtime.onMessage.addListener(
  (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    console.log(vm);
    console.log("message", message);

    if (message.toggleVisible) {
      toggleVisible(message.toggleVisible);
    }
    sendResponse("ok");
  }
);
