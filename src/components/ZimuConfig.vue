
<template>
    <el-form :label-position="'top'" :model="formData">
        <el-form-item label="配置">
            <el-button @click="handleConfig">配置</el-button>
        </el-form-item>
        <el-form-item label="获取 Video Dom 代码">
            <el-input
                v-model="formData.code"
                placeholder="$('video')[0] or document.getElementsByTagName('video')[0]"
            >
                <template #append>
                    <el-button @click="handleZhixing">执行</el-button>
                </template>
            </el-input>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { setCurrentWebSite, setVideoDom } from "../hooks/useWebSite.ts";
const handleConfig = () => {
    setCurrentWebSite();
};

const formData = reactive({
    code: ''
})

const handleZhixing = (e: Event) => {
    if (formData.code && formData.code.trim()) {
        try {
            let func = new Function("return " + formData.code.trim());
            let dom = func();
            setVideoDom(dom);
        } catch (error) {
            console.error(error);
        }
    }
}
</script>