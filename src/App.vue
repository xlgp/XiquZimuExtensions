<template>
  <el-button type="primary" @click="changeVisible">原始按钮</el-button>
  <ZimuLayer :layerInfo="layerInfo" />
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const layerInfo = reactive({ isShow: false });

const changeVisible = () => {
  layerInfo.isShow = !layerInfo.isShow;
};
</script>
