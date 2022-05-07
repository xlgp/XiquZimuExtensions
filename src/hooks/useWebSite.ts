import useQqVideo from "./useQqVideo";
import useYouku from "./useYouku"

export enum WebSiteEnum {
    YOUKU = '优酷',
    QQVIDEO = '腾讯视频'
}

let currentWebSite = WebSiteEnum.YOUKU;

const get = (webSite: WebSiteEnum) => {

    switch (webSite) {
        case WebSiteEnum.YOUKU:
            return useYouku();
            break;
        case WebSiteEnum.QQVIDEO:
            return useQqVideo();
        default:
            break;
    }
}

export const  setCurrentWebSite = (webSite:WebSiteEnum)=>{
    currentWebSite = webSite;
}

export default ()=>{
    return{
        getCurrentTime:()=>{
            return get(currentWebSite)?.getCurrentTime();
        }
    }
}