<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main><ChangDuanForm /></el-main>
  </el-container>
</template>
<script setup>
import { setCurrentWebSite } from "./hooks/useWebSite";

setCurrentWebSite();
</script>
