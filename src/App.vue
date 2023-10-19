<template>
  <el-container>
    <el-header>
      <span>戏曲字幕 唱词制作</span>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12"><Media /> </el-col>
        <el-col :span="12"> <ChangDuanForm /></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { setCurrentWebSite } from "./hooks/useWebSite";

setCurrentWebSite();
</script>
<style lang="css">
header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c0545;
}
header span {
  color: #fff;
  font-size: 1.5em;
}
</style>
