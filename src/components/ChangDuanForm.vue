<template>
  <el-form-item label="来源" label-width="60px">
    <webSiteRadioGroup />
  </el-form-item>
  <el-form ref="elForm" :model="formData" :rules="rules" label-width="60px">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="剧种" prop="juZhong">
          <el-input v-model="formData.juZhong" placeholder="请输入剧种" clearable></el-input>
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
          <el-input v-model="formData.title" placeholder="请输入选段" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="时差" prop="offset">
          <el-input-number v-model="formData.offset" placeholder="时差" :step="1"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="唱词" prop="content">
      <el-input
        v-model="formData.content"
        type="textarea"
        ref="contentRef"
        placeholder="请输入或复制唱词"
        :autosize="{ minRows: 10, maxRows: 25 }"
      ></el-input>
    </el-form-item>
    <el-form-item label="始时" prop="startTime">
      <el-input v-model="formData.startTime" placeholder="请输入开始时间">
        <template #prepend>
          <el-button @click="getStartTime">获取时间</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-button type="primary" @click="addShowTime">添加时间</el-button>
    <el-button @click="handleCopy">复制</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { start } from "repl";
import { ref } from "vue";
import useWebSite, { WebSiteEnum } from "../hooks/useWebSite.ts";

const { getCurrentTime } = useWebSite();

const contentRef = ref();

const formData = ref({
  juZhong: "",
  juMu: "",
  title: "",
  offset: -15,
  content: "",
  startTime: ''
});


const getStartTime = () => {
  formData.value.startTime = getCurrentTime();
}

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

const handleCopy = () => {
  console.log(getLrc());
}

const getLrc = () => {
  let list = [];

  list.push('[ti:' + formData.value.title + "]");
  list.push('[jz:' + formData.value.juZhong + "]");
  list.push('[jm:' + formData.value.juMu + "]");
  list.push('[ofsset:' + formData.value.offset + "]");

  let contentList = formData.value.content.split('\n');
  let startTime = str2num(formData.value.startTime);

  for (let i = 0; i < contentList.length; i++) {
    const element = contentList[i];
    let ci = element.split(']');
    let time = str2num(ci[0].substring(1)) - startTime;
    let changci = '[' + num2str(time) + ']' + ci[1];
    list.push(changci);
  }

  return list.join('\n');
}

const str2num = (text: string) => {
  let textList = text.split(':');
  //毫秒 和 秒
  let sms = textList[textList.length - 1].split('.');
  //毫秒
  let ms = parseInt(sms[1]);
  //秒
  let second = parseInt(sms[0]);

  //分
  let m = parseInt(textList[textList.length - 2]);

  let c = m * 60 * 1000 + second * 1000 + ms * 10;

  return c;
}

const num2str = (num: number) => {
  let m = Math.floor(num / 60000);
  let s = Math.floor(num % 60000 / 1000);
  let ms = num % 1000 / 10;
  return (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s) + "." + (ms < 10 ? '0' + ms : ms);
}

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
      message: '开始时间',
      trigger: 'blur'
    }
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
