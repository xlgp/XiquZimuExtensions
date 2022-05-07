<template>
  <s3-layer
    v-model="_layerInfo.isShow"
    :title="title"
    @yes="handleYes"
    :shade="0"
    :area="['auto', '90vh']"
    :maxmin="true"
    :type="1"
  >
    <div style="margin: 20px;">
      <ChangDuanForm />
    </div>
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
