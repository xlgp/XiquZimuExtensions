<template>
  <el-radio-group v-model="radio" @change="change">
    <el-radio border v-for="item in siteList" :label="item.id">{{ item.name }}</el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { setCurrentWebSite, sites } from "../hooks/useWebSite";

function initRadio() {
  let host: string = window.location.host;
  for (const key in sites) {
    if (Object.prototype.hasOwnProperty.call(sites, key)) {
      const element = sites[key];
      if (element.host == host) {
        return element.id;
      }
    }
  }
  return '';
}

const radio = ref(initRadio());

const siteList = computed(() => {
  return Object.values(sites);
});

const change = (value: string) => {
  console.log("change", value);
  setCurrentWebSite(value);
}

</script>
