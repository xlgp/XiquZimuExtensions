<template>
  <video controls width="250">
    <source
      src="https://video-web-cn.douyin.com/829ca51566135c9a7663342aadedf640/652f6131/tos-cn-ve-0015c800/oQlNiEgRtAIgtvy8QzeyGABPuhACfAF4LtFEGH?a=6383&ch=0&cr=3&dr=0&cd=0%7C0%7C0%7C3&br=966&bt=966&cs=0&ds=6&ft=biTtGbQQqUWXf_4ZPo0OW_EklpPiXf3uIFVJEkU-xRbPD-I&mime_type=video_mp4&qs=0&rc=NXZpTGRTaFBnKXVmfWVuZDFwekApOzgzZTo4ZmRkNzs6OzVnZ2cpOmpuOHg6ZWk5ZjMzajM1eXlTbGt2aXFEOmpibFxmK2BtYmJeYC4wLWAuMTYvYDNjYl5eYjE6Y2Qxa2U0NGBlb2YtLS5jLS06&btag=200018000&dy_q=1697600246&l=20231018113726F55AC43A960DC502CCBD&ply_type=3&policy=eyJ2bSI6MywidWlkIjoiMzAwODc0MzcyOTU1NDIzMSJ9"
    />
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
