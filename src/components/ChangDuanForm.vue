<template>
  <el-form ref="zimuFormRef" :model="formData" :rules="rules" label-width="60px">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="剧种" prop="juZhong">
          <el-select
            v-model="formData.juZhong"
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="请输入剧种"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="(item, index) in juZhongList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="剧目" prop="juMu">
          <el-input v-model="formData.juMu" placeholder="请输入剧目"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="选段" prop="title">
          <el-input v-model="formData.title" placeholder="请输入选段"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="版本" prop="version">
          <el-input
            v-model="formData.version"
            placeholder="唱段版本（可不填）"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="制作者" prop="by">
          <el-input v-model="formData.by" placeholder="制作者"> </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="时差" prop="offset">
          <el-input-number
            v-model="formData.offset"
            placeholder="时差"
            :step="1"
          ></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item prop="content">
      <el-button class="add-btn" type="primary" @click="handleAddTime">
        <span>添加时间</span>
      </el-button>
      <el-input
        type="textarea"
        :autosize="autosize"
        v-model="formData.content"
        ref="contentRef"
        placeholder="请输入或复制唱词"
        @paste="handlePaste"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="关键词" prop="searchKeys">
      <el-input v-model="formData.searchKeys" placeholder="关键词以逗号隔开"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button plain type="primary" @click="handleCopy">复制</el-button>
      <el-button @click="resetForm(zimuFormRef)">重置</el-button>
      <el-button @click="handlePlay">当前时间播放</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import useChangDuanRules from "../hooks/useChangDuanRules";
import useInitChangDuan from "../hooks/useInitChangDuan";
import useChangDuanHandler from "../hooks/useChangDuanHandler";
import {
  JUZHONGLIST,
  END_TAG_CONTENT,
  SEPARATOR,
  DEFAULT_START_LINE,
  START_TAG_CONTENT,
} from "../data/XiquConstant";

import {
  hasTag,
  num2str,
  getShowTime,
  getLrc,
  getPastedContent,
  addShowTime,
} from "../hooks/changDuanUtil";

const juZhongList = reactive(JUZHONGLIST);
const formData: Ref<ChangDuanFromType> = ref<ChangDuanFromType>({
  juZhong: juZhongList[0],
  juMu: "",
  title: "",
  offset: -9,
  content: "",
  version: "",
  searchKeys: "",
  by: "戏曲字幕",
});

const props = defineProps({
  autosize: {
    type: [Object, Boolean],
    default: { minRows: 15, maxRows: 15 },
  },
});

const zimuFormRef = ref();
const contentRef = ref<HTMLElement | null>(null);
let textareaEl: HTMLTextAreaElement = (undefined as unknown) as HTMLTextAreaElement;

const { init, storageData } = useInitChangDuan(formData, contentRef);

const {
  handleAddTime,
  handleCopy,
  handlePaste,
  handlePlay,
  resetForm,
} = useChangDuanHandler(formData, () => textareaEl, storageData);

const rules = useChangDuanRules();

onMounted(() => {
  init();
  textareaEl = contentRef.value.$el.firstElementChild;
});
</script>
<style scoped>
.add-btn {
  width: 52px;
  position: absolute;
  left: -60px;
  top: 0;
  height: 100%;
}

.add-btn span {
  writing-mode: vertical-lr;
}
</style>
