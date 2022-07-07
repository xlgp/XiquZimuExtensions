<template>
  <el-form :label-position="'top'" :model="formData">
    <el-form-item label="配置">
      <el-button @click="handleConfig">配置</el-button>
    </el-form-item>
    <el-form-item label="Dom KEY">
      <el-input v-model="formData.key" placeholder="dom 的 tag 或 id 或 css 选择器" />
      <p class="error">{{ zhixingError }}</p>
    </el-form-item>
    <el-form-item label="Dom Index">
      <el-input-number v-model="formData.index" controls-position="right" />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleZhixing">执行</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { setCurrentWebSite, setVideoDom } from "../hooks/useWebSite";
const handleConfig = () => {
  setCurrentWebSite();
};

const formData = reactive({
  index: 0,
  key: "",
});

const zhixingError = ref("");

const handleZhixing = (e: Event) => {
  zhixingError.value = "";
  let key = formData.key;
  if (key && key.trim()) {
    try {
      let dom = (null as unknown) as HTMLElement;
      if (key.startsWith(".")) {
        // css
        dom = document.getElementsByClassName(key.substring(1))[
          formData.index
        ] as HTMLElement;
      } else if (key.startsWith("#")) {
        // id, 只有一个，不需要index
        dom = document.getElementById(key.substring(1)) as HTMLElement;
      } else {
        //tag
        dom = document.getElementsByTagName(key)[formData.index] as HTMLElement;
      }
      setVideoDom(dom);
    } catch (error: any) {
      console.error(error);
      zhixingError.value = error.message;
    }
  }
};
</script>
<style scope>
.error {
  margin-top: 4px;
  color: red;
}
</style>
