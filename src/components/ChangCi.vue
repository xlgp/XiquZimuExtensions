<template>
    <el-input
      v-model="name"
      placeholder="唱词"
      class="input-with-input"
    >
      <template #prepend>
        <el-input
      v-model="time"
      placeholder="时间"
    />
      </template>
    </el-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const time = ref('');
const name = ref('');
</script>

<style>
.input-with-input .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
      padding: 0;
}
</style>