<template>
  <el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="date" label="时间" width="100">
      <template #default="scope">
        <el-input v-model="scope.row.time" placeholder="时间" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="唱词">
      <template #default="scope">
        <el-input v-model="scope.row.name" placeholder="唱词" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #header>
        <el-button>添加唱词</el-button>
        <el-popconfirm @confirm="handleDeleteAll()" title="Are you sure to delete all?">
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleCopy(scope.$index, scope.row)">复制</el-button>
        <el-popconfirm
          @confirm="handleDelete(scope.$index, scope.row)"
          title="Are you sure to delete this?"
        >
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
        <el-button size="small" @click="handleMove(scope.$index, scope.row)">移动</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const multipleTableRef = ref()

const handleCopy = (index: number, row: Object) => {
  console.log(index, row)
}

const handleMove = (index: number, row: Object) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: Object) => {
  tableData.value.splice(index, 1);
}

const handleDeleteAll = () => {
  const rows = multipleTableRef.value!.getSelectionRows();
  if (rows && rows.length > 0) {
    // 删除多选数据
  }
}

const tableData = ref([
  {
    id: 1,
    time: '00:13.45',
    name: '一月思念如痴如醉'
  },
  {
    id: 2,
    time: '00:18.45',
    name: '相爷带的佳音归'
  },
  {
    id: 3,
    time: '00:24.45',
    name: '数组中的每个元素都会执行这个'
  },
  {
    id: 4,
    time: '00:28.45',
    name: '当前元素属于的数组对'
  }
])
</script>
