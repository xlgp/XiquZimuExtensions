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
        <el-form-item label="时差" prop="offset">
          <el-input-number
            v-model="formData.offset"
            placeholder="时差"
            :step="1"
          ></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button style="width: 100%" type="primary" @click="addShowTime"
          >添加时间</el-button
        >
      </el-col>
      <el-col :span="12">
        <el-form-item label="始时" prop="startTime">
          <el-input v-model="startTimeComputed" placeholder="请输入开始时间">
            <template #append>
              <el-button @click="getStartTime">获取时间</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="唱词" prop="content">
      <el-input
        type="textarea"
        :rows="16"
        v-model="formData.content"
        ref="contentRef"
        placeholder="请输入或复制唱词"
        @paste="handlePaste"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button plain type="primary" @click="handleCopy">复制</el-button>
      <el-button @click="resetForm(zimuFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import useClipboard from "vue-clipboard3";
import useWebSite from "../hooks/useWebSite";
import { JUZHONGLIST, END_TAG_CONTENT } from "../data/XiquConstant";

const { getCurrentTime } = useWebSite();
const { toClipboard } = useClipboard();

const zimuFormRef = ref();
const contentRef = ref();

const juZhongList = reactive(JUZHONGLIST);

const formData = ref({
  juZhong: juZhongList[0],
  juMu: "",
  title: "",
  offset: -15,
  content: "",
  startTime: 0,
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
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  storageData();
};

const getStartTime = () => {
  formData.value.startTime = getCurrentTime();
};

const startTimeComputed = computed(() => {
  return num2str(formData.value.startTime, true);
});

const addShowTime = () => {
  let textarea = contentRef.value.$el.firstElementChild;
  let i =
    formData.value.content.substring(0, textarea.selectionEnd).lastIndexOf("\n") + 1;
  textarea.setRangeText("[" + getCurrentTime() + "]", i, i);
  formData.value.content = textarea.value;
  let j = formData.value.content.substring(i + 1).indexOf("\n") + i;
  textarea.focus();
  textarea.setSelectionRange(j + 2, j + 2);
};

const handlePaste = (event: ClipboardEvent) => {
  if (formData.value.content.trim() == "") {
    let paste = event?.clipboardData?.getData("text");
    if (paste && paste.trim()) {
      let list = paste.split("\n").filter((value) => value.trim());
      list.push(END_TAG_CONTENT);
      formData.value.content = list.join("\n");
    }
    event.preventDefault();
  }
};

const handleCopy = async () => {
  try {
    await toClipboard(getLrc());
    ElMessage({
      message: "已复制",
      type: "success",
    });
  } catch (e: any) {
    console.error(e);
    ElMessage.error("复制出错了, " + e.message);
  }
};

const getLrc = () => {
  let list = [];

  list.push("[ti:" + formData.value.title + "]");
  list.push("[jz:" + formData.value.juZhong + "]");
  list.push("[jm:" + formData.value.juMu + "]");
  list.push("[ofsset:" + formData.value.offset + "]");

  let contentList = formData.value.content.split("\n");
  let startTime = formData.value.startTime;

  for (let i = 0; i < contentList.length; i++) {
    const element = contentList[i];
    let ci = element.split("]");
    if (Number.isNaN(Number(ci[0].substring(1)))) {
      list.push(ci);
    } else {
      let time = Number(ci[0].substring(1)) - startTime;
      let changci = "[" + num2str(time, false) + "]" + ci[1];
      list.push(changci);
    }
  }
  return list.join("\n");
};

/**
 * hasHour 是否需要小时
 */
const num2str = (num: number, hasHour: boolean | undefined) => {
  num = Math.floor(num * 1000);
  let h = Math.floor(num / 3600000);
  let m = Math.floor(num / 60000);
  let s = Math.floor((num % 60000) / 1000);
  let ms = Math.floor((num % 1000) / 10);
  let hStr = (h < 10 ? "0" + h : h) + ":";
  return (
    ((hasHour && hStr) || "") +
    (m < 10 ? "0" + m : m) +
    ":" +
    (s < 10 ? "0" + s : s) +
    "." +
    (ms < 10 ? "0" + ms : ms)
  );
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
  startTime: [
    {
      required: true,
      message: "开始时间",
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
