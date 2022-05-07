<template>
    <el-dialog
        v-model="dialogVisible"
        :title="title"
        :modal="modal"
        :close-on-press-escape="autoClose"
        :close-on-click-modal="autoClose"
        draggable
    >
        <Title></Title>
        <!-- <ChangCiList></ChangCiList> -->
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
  <script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import { inject } from 'vue'
import Title from '../components/Title.vue'
import ChangCiList from '../components/ChangCiList.vue'

const props =  defineProps({
    visible:Boolean
});

const dialogVisible = ref(props.visible);
const modal = ref(false);
const title = ref('提取戏曲伴奏时间');
const autoClose = ref(false);
</script>  

<style scoped>
.zimu-dialog{
    position: fixed;
    top: 0;
}
.zimu-dialog > div{
        position: initial;
}
.el-overlay-dialog{
        position: initial;
            overflow: initial;
}
.el-dialog{
        --el-dialog-width: auto;
            margin: auto;
}
</style>