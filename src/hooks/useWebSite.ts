import useQqVideo from "./useQqVideo";
import useYouku from "./useYouku";

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
};

let currentWebSite: string = sites.YOUKU.id;

const get = (id: string) => {
  switch (id) {
    case sites.YOUKU.id:
      return useYouku();
      break;
    case sites.QQVIDEO.id:
      return useQqVideo();
    default:
      break;
  }
};

export const setCurrentWebSite = (id: string) => {
  currentWebSite = id;
};

export default () => {
  return {
    getCurrentTime: () => {
      return get(currentWebSite)?.getCurrentTime();
    },
  };
};
