<template>
  <s3-layer
    v-model="_layerInfo.isShow"
    :title="title"
    :shade="0"
    :area="['70vh', '90vh']"
    :maxmin="true"
    :type="1"
    offset="rt"
  >
    <el-scrollbar height="83vh">
      <el-tabs style="margin: 20px">
        <el-tab-pane label="功能">
          <ChangDuanForm />
        </el-tab-pane>
        <el-tab-pane label="配置">
          <ZimuConfig />
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </s3-layer>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const _layerInfo = reactive({
  isShow: true,
});

const title = ref("提取戏曲伴奏时间");
</script>
