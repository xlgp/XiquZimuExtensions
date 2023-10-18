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
import useClipboard from "vue-clipboard3";
import useWebSite from "../hooks/useWebSite";
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
  addShowTime
} from "../hooks/changDuanUtil";

const { getCurrentTime, setCurrentTime } = useWebSite();
const { toClipboard } = useClipboard();

const zimuFormRef = ref();
const contentRef = ref();
let textareaEl: HTMLTextAreaElement = (undefined as unknown) as HTMLTextAreaElement;

const juZhongList = reactive(JUZHONGLIST);

const autosize = { minRows: 14, maxRows: 20 };

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

const storageKey = "__ZIMU_CHANGDUAN_FORM";
function init() {
  let storageValue = localStorage.getItem(storageKey);
  if (storageValue) {
    formData.value = JSON.parse(storageValue);
  }
}

function storageData() {
  localStorage.setItem(storageKey, JSON.stringify(formData.value));
}

function unloadListener() {
  window.addEventListener("unload", function (event) {
    storageData();
  });
}

onMounted(() => {
  init();
  unloadListener();
  textareaEl = contentRef.value.$el.firstElementChild;
});

const handlePlay = () => {
  let time = getShowTime(formData.value.content, SEPARATOR, textareaEl);
  time && setCurrentTime(+time);
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  storageData();
};

const handleAddTime = () => {
  formData.value.content = addShowTime(
    formData.value.content,
    textareaEl,
    getCurrentTime() + SEPARATOR
  );
};

const handlePaste = (event: ClipboardEvent) => {
  if (formData.value.content.trim() == "") {
    formData.value.content = getPastedContent(event);
    event.preventDefault();
  }
};

const handleCopy = async () => {
  try {
    await toClipboard(getLrc(formData.value));
    ElMessage({
      message: "已复制",
      type: "success",
    });
  } catch (e: any) {
    console.error(e);
    ElMessage.error("复制出错了, " + e.message);
  }
};

const rules = {
  juZhong: [
    {
      required: true,
      message: "请输入剧种",
      trigger: "blur",
    },
  ],
  juMu: [
    {
      required: true,
      message: "请输入剧目",
      trigger: "blur",
    },
  ],
  title: [
    {
      required: true,
      message: "请输入选段",
      trigger: "blur",
    },
  ],
  offset: [
    {
      required: true,
      message: "时差",
      trigger: "blur",
    },
  ],
  content: [
    {
      required: true,
      message: "唱词",
      trigger: "blur",
    },
  ],
};
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
