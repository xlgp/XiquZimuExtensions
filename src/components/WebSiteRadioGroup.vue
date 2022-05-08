<template>
  <el-radio-group v-model="radio" @change="change">
    <el-radio border v-for="item in siteList" :label="item.id">{{ item.name }}</el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { setCurrentWebSite, sites, initCurrentWebSite } from "../hooks/useWebSite";

const radio = ref(initCurrentWebSite()?.id);

const siteList = computed(() => {
  return Object.values(sites);
});

const change = (value: string) => {
  console.log("change", value);
  setCurrentWebSite(value);
};
</script>
