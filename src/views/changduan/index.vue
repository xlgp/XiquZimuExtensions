<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <Media />
        </el-col>
        <el-col :span="12">
            <ChangDuanForm :juZhongs="JUZHONGLIST" />
        </el-col>
    </el-row>
</template>
  
<script lang="ts" setup>
import { JUZHONGLIST } from "../../data/XiquConstant";
import { setCurrentWebSite } from "../../hooks/useWebSite";

setCurrentWebSite();
</script>
  