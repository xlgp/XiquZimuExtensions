<template>
  <el-radio-group v-model="radio" @change="change">
    <el-radio border v-for="(value, key) in WebSiteEnum" :label="value">{{ value }}</el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { WebSiteEnum , setCurrentWebSite} from "../hooks/useWebSite";

const radio = ref(WebSiteEnum.YOUKU);

const change = (value)=>{
    setCurrentWebSite(value);
}

</script>
