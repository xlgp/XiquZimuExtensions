<template>
  <video controls width="350">
    <source src="http://localhost/video/%E5%89%AA%E5%8F%91%E8%AE%B0-%E9%87%87%E8%8D%AF%20(online-video-cutter.com).mp4" />
  </video>
  <ZimuLayer :layerInfo="layerInfo" />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { setCurrentWebSite } from "./hooks/useWebSite";

setCurrentWebSite();

const layerInfo = reactive({ isShow: false });

const changeVisible = () => {
  layerInfo.isShow = !layerInfo.isShow;
};
</script>
