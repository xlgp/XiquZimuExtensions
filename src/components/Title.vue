<template>
<el-row :gutter="10">
  <el-form ref="elForm" :model="formData" :rules="rules" label-width="60px">
    <el-col :span="12">
      <el-form-item label="剧种" prop="juZhong">
        <el-input v-model="formData.juZhong" placeholder="请输入剧种" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="剧目" prop="juMu">
        <el-input v-model="formData.juMu" placeholder="请输入剧目" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="选段" prop="title">
        <el-input v-model="formData.title" placeholder="请输入选段" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="时差" prop="offset">
        <el-input-number v-model="formData.offset" placeholder="时差" :step='1'></el-input-number>
      </el-form-item>
    </el-col>
  </el-form>
</el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

    const formData=ref( {
        juZhong: undefined,
        juMu: undefined,
        title: undefined,
        offset: 0,
      });
      const rules= {
        juZhong: [{
          required: true,
          message: '请输入剧种',
          trigger: 'blur'
        }],
        juMu: [{
          required: true,
          message: '请输入剧目',
          trigger: 'blur'
        }],
        title: [{
          required: true,
          message: '请输入选段',
          trigger: 'blur'
        }],
        offset: [{
          required: true,
          message: '时差',
          trigger: 'blur'
        }],
      };
</script>