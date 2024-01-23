<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="addCategory">添加职能部门</el-button>
    </template>

    <el-form inline @submit.native.prevent>
      <el-form-item label="部门名称:">
        <el-input
          v-model="searchValue.name"
          class="w-50 m-2"
          placeholder="请输入部门名称"
          :prefix-icon="Search"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="departmentList" style="width: 100%" height="400">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="area" label="属地"></el-table-column>
      <el-table-column prop="name" label="部门名称"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row 就是 departmentList 的一项， $index 下标 -->
        <template #default="{ row, $index }">
          <el-button :icon="Edit" circle type="primary" @click="onEdit(row, $index)"></el-button>
          <el-button :icon="Delete" circle type="danger" @click="onDelete(row, $index)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <department-edit ref="dialog" @success="onSuccess"></department-edit>
  </page-container>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { getDepartmentListService, deleteDepartmentService } from '@/api/department';
import { Edit, Delete, Search } from '@element-plus/icons-vue';
import DepartmentEdit from './components/DepartmentEdit.vue';

const loading = ref(false);
const dialog = ref();

/* 获取数据 */
onMounted(() => {
  getDepartmentList();
});
const departmentList = ref([]);
const total = ref(0); // 总条数
const getDepartmentList = async () => {
  loading.value = true;
  const res = await getDepartmentListService(searchValue);
  departmentList.value = res.data.data;
  loading.value = false;
};

/* 搜索 */
const searchValue = reactive({
  name: ''
});
const onSearch = () => {
  console.log(searchValue);
  getDepartmentList();
};
const onReset = () => {
  searchValue.name = '';
  getDepartmentList();
};

/* 操作 */
// 编辑
const onEdit = (row) => {
  dialog.value.open(row);
};
// 添加
const addCategory = () => {
  dialog.value.open({});
};
// 删除
const onDelete = (row) => {
  ElMessageBox.confirm('你确认要删除该分类吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      console.log(row)
      await deleteDepartmentService(row.id);
      ElMessage.success('删除成功');
      getDepartmentList();
    })
    .catch(() => {});
};
const onSuccess = () => {
  getDepartmentList();
};
</script>

<style lang="scss" scoped></style>
