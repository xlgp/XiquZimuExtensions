<template>
  <el-form-item label="来源" label-width="60px">
    <webSiteRadioGroup />
  </el-form-item>
  <el-form ref="elForm" :model="formData" :rules="rules" label-width="60px">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="剧种" prop="juZhong">
          <el-input
            v-model="formData.juZhong"
            placeholder="请输入剧种"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="剧目" prop="juMu">
          <el-input v-model="formData.juMu" placeholder="请输入剧目" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="选段" prop="title">
          <el-input
            v-model="formData.title"
            placeholder="请输入选段"
            clearable
          ></el-input>
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
    <el-form-item label="唱词" prop="content">
      <el-input
        v-model="formData.content"
        type="textarea"
        ref="contentRef"
        placeholder="请输入或复制唱词"
        @paste="handlePaste"
        :autosize="{ minRows: 10, maxRows: 25 }"
      ></el-input>
    </el-form-item>
    <el-button type="primary" @click="addShowTime">添加时间</el-button>
    <el-button> 复制 </el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useWebSite, { WebSiteEnum } from "../hooks/useWebSite.ts";

const { getCurrentTime } = useWebSite();

const contentRef = ref();

const formData = ref({
  juZhong: "",
  juMu: "",
  title: "",
  offset: 0,
  content: "",
});

const getTime = (time: number) => {
  let minute = Math.floor(time / 60000);
  let second = (time % 60000) / 1000;
  let millis = time % 1000;
  return (
    ((minute < 10 && "0" + minute) || minute) +
    ":" +
    ((second < 10 && "0" + second) || second) +
    "." +
    ((millis < 10 && "0" + millis) || millis)
  );
};

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
    let paste = event.clipboardData?.getData("text");
    if (paste && paste.trim()) {
      let list = paste.split("\n").filter((value: string) => value.trim());
      let time = 7 * 1000;
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        list[i] = "[" + getTime(time * (i + 1)) + "]" + list[i];
      }
      formData.value.content = list.join("\n");
    }
    event.preventDefault();
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
