<template>
  <video ref="videoRef" controls class="video" autoplay></video>
  <div>
    <input type="file" id="file" hidden @change="changeHandler" />
    <el-input v-model="videoSrc" placeholder="于此输入音视频网络地址" clearable>
      <template #append>
        <el-button @click="playVideoWithWeb">播放</el-button>
      </template>
    </el-input>
    <label
      class="drag-box"
      for="file"
      :ondrop="dropHandler"
      :ondragover="dragOverHandler"
    >
      <span>点我选择音视频，或拖拽音视频至此</span>
    </label>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

const videoRef = ref();

let currentFile: File = undefined;

const videoSrc = ref("");

const playVideoWithWeb = () => playVideo(new URL(videoSrc.value));

const equalFiles = (file1: File, file2: File) => {
  if (file1 == file2) {
    return true;
  }
  if (!file1 || !file2) {
    return false;
  }

  return (
    file1.name == file2.name &&
    file2.type == file1.type &&
    file1.lastModified &&
    file2.lastModified
  );
};

const playVideo = (url: URL) => {
  videoRef.value.src = url;
  videoRef.value.play();
};

const playVideoWithFile = (file: File) => {
  if (!file) {
    console.warn("没有选择音视频文件");
    return;
  }
  if (!equalFiles(currentFile, file)) {
    currentFile = file;
    playVideo(URL.createObjectURL(file));
  }
};

const changeHandler = (e: Event) => {
  if (e.target.files.length > 0) {
    playVideoWithFile(e.target.files[0]);
  }
};

const dropHandler = (ev: Event) => {
  ev.preventDefault();
  let file;
  if (ev.dataTransfer.items) {
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === "file") {
        file = ev.dataTransfer.items[i].getAsFile();
        break;
      }
    }
  } else {
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      file = ev.dataTransfer.files[i];
      break;
    }
  }
  playVideoWithFile(file);
};

const dragOverHandler = (e: Event) => {
  e.preventDefault();
};
</script>
<style lang="css">
.drag-box {
  display: flex;
  height: 200px;
  border: 1px dashed var(--el-color-primary);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  color: var(--el-text-color-primary);
  cursor: pointer;
}

.video {
  height: 400px;
  width: 100%;
}
</style>
