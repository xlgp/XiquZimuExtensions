import useBilibili from "./useBilibili";
import useQqVideo from "./useQqVideo";
import useYouku from "./useYouku";
import useVideoDom from './useVideoDom'

type SiteType = {
  id: string;
  name: string;
  host: string;
};

type Site = {
  [key: string]: SiteType;
};

export const sites: Site = {
  YOUKU: { id: "YOUKU", name: "优酷", host: "v.youku.com" },
  QQVIDEO: { id: "QQVIDEO", name: "腾讯视频", host: "v.qq.com" },
  BILIBILI: { id: "BILIBILI", name: "哔哩哔哩", host: "www.bilibili.com" },
  IQIYI: { id: "IQIYI", name: "爱奇艺", host: "www.iqiyi.com" },
};

let webSite: any;

const get = (id: string) => {
  switch (id) {
    case sites.YOUKU.id:
      return useYouku();
    case sites.QQVIDEO.id:
      return useQqVideo();
    case sites.BILIBILI.id:
      return useBilibili();
    default:
      return useVideoDom();
  }
};

export function initCurrentWebSite(): SiteType {
  let host: string = window.location.host;
  for (const key in sites) {
    if (Object.prototype.hasOwnProperty.call(sites, key)) {
      const element = sites[key];
      if (element.host == host) {
        return element;
      }
    }
  }
  return ({} as unknown) as SiteType;
}

export const setCurrentWebSite = (id?: string) => {
  webSite = useVideoDom();
};

export const setVideoDom = (dom: HTMLElement) => {
  webSite.setVideo(dom);
};

export default () => {
  return {
    getCurrentTime: () => {
      return webSite?.getCurrentTime();
    },
  };
};
