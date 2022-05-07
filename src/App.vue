<template>
  <ZimuLayer :layerInfo="layerInfo"/>
  <el-button @click="handleClick">发射点发射点发射点</el-button>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

/**
 * layerInfo
 * 因为此处父子组件都需要控制弹出层，
 * 所以使用object形式，父子组件直接操作layerInfo对象。
 */
const layerInfo = reactive({
isShow: false,
})

const handleClick = ()=>{
  layerInfo.isShow = !layerInfo.isShow;
}

</script>