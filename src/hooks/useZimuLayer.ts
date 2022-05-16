import { App, createApp, reactive } from "vue";
import { s3Layer } from "vue3-layer";
import "vue3-layer/dist/s3Layer.css";
import { setCurrentWebSite } from "./useWebSite";
import ZimuLayer from "../views/ZimuLayer.vue";

export default () => {
  function getOptions() {
    /**
     * layerInfo
     * 因为此处父子组件都需要控制弹出层，
     * 所以使用object形式，父子组件直接操作layerInfo对象。
     */
    const layerInfo = reactive({
      isShow: true,
    });
    return layerInfo;
  }

  function createVueApp() {
    const mountEl = createElement();
    const app: App<Element> = createApp(ZimuLayer, { layerInfo: getOptions() });
    app.component("s3-layer", s3Layer).mount(mountEl);
    setCurrentWebSite(undefined);
    return app;
  }

  function createElement() {
    const MOUNT_EL_ID = "zimu-layer";

    let mountEl = document.getElementById(MOUNT_EL_ID);
    if (mountEl) {
      mountEl.remove();
    }
    mountEl = document.createElement("div");
    mountEl.setAttribute("id", MOUNT_EL_ID);
    document.body.appendChild(mountEl);
    return mountEl;
  }

  return {
    createElement,
    getOptions,
    createVueApp,
  };
};
