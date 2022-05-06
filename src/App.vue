<template>
  <el-button type="text" @click="dialogVisible = true" 
    >Click to open Dialog
  </el-button>

  <el-dialog v-model="dialogVisible" :title="title" :modal="modal" :close-on-press-escape="autoClose" draggable>
    <Title></Title>
    <ChangCiList></ChangCiList>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Title from './components/Title.vue'
import ChangCiList from './components/ChangCiList.vue'

const dialogVisible = ref(false)
const modal = ref(false);
const title = ref('提取戏曲伴奏时间');
const autoClose = ref(false);
</script>
