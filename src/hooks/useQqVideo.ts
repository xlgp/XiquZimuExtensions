export default () => {
  let video: HTMLMediaElement = getVideo();

  function getVideo() {
    //直接取dom, 应该要先判断一下，dom是否存在
    return $("video")[0] as HTMLMediaElement;
  }

  function getCurrentTime() {
    return video.currentTime;
  }
  function setVideo(dom: HTMLMediaElement) {
    video = dom;
  }
  return {
    getCurrentTime,
    setVideo,
  };
};
