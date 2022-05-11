<template>
  <s3-layer
    v-model="_layerInfo.isShow"
    :title="title"
    :shade="0"
    :area="['auto', '90vh']"
    :maxmin="true"
    :type="1"
  >
    <el-tabs style="margin: 20px;">
      <el-tab-pane label="功能">
        <ChangDuanForm />
      </el-tab-pane>
      <el-tab-pane label="配置">
        <ZimuConfig />
      </el-tab-pane>
    </el-tabs>
  </s3-layer>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  layerInfo: Object,
});

const _layerInfo = props.layerInfo;

const title = ref("提取戏曲伴奏时间");

const handleYes = (index, layero) => {
  _layerInfo.isShow = false;
};
</script>
