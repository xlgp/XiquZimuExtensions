<template>
  <el-button type="primary" @click="changeVisible">原始按钮</el-button>
  <ZimuLayer :layerInfo="layerInfo" />
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

const visible = ref(false);

const layerInfo = reactive({ isShow: false });

const data = ref(2);

const changeVisible = () => {
  layerInfo.isShow = !layerInfo.isShow;
};
</script>
