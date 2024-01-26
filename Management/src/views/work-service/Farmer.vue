<template>
  <page-container title="农户管理">
    <template #extra>
      <el-button type="primary" @click="addUser">添加用户</el-button>
    </template>

    <el-form inline>
      <el-form-item label="姓名:">
        <el-input
          v-model="searchValue.name"
          class="w-50 m-2"
          placeholder="请输入"
          :prefix-icon="Search"
          style="width: 190px;"
        />
      </el-form-item>
      <el-form-item label="身份证:">
        <el-input
          v-model="searchValue.ID_card"
          class="w-50 m-2"
          placeholder="请输入"
          :prefix-icon="Search"
          style="width: 190px;"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="farmerList" style="width: 100%" height="400">
      <el-table-column type="index" :index="indexShow" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="150"></el-table-column>
      <el-table-column prop="gender" label="性别" width="150">
        <template #default="{ row }">
          <el-tag :type="row.gender === '0' ? '' : 'danger'">{{
            row.gender === '0' ? '男' : '女'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ID_card" label="身份证号"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row 就是 farmerList 的一项， $index 下标 -->
        <template #default="{ row, $index }">
          <el-button :icon="Edit" circle type="primary" @click="onEdit(row, $index)"></el-button>
          <el-button :icon="Delete" circle type="danger" @click="onDelete(row, $index)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <farmer-edit ref="dialog" @success="onSuccess"></farmer-edit>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="searchValue.pagenum"
      v-model:page-size="searchValue.pagesize"
      :page-sizes="[5, 10, 20]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container> 
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { getFarmerListService, deleteFarmerService } from '@/api/work_service';
import { Edit, Delete, Search } from '@element-plus/icons-vue';
import FarmerEdit from './components/FarmerEdit.vue';
const total = ref(0); // 总条数
const loading = ref(false);
const dialog = ref();

/* 获取数据 */
onMounted(() => {
  getFarmerList();
});
const farmerList = ref([]);
const getFarmerList = async () => {
  loading.value = true;
  const res = await getFarmerListService(searchValue);
  farmerList.value = res.data.data;
  total.value = res.data.total;
  loading.value = false;
};

/* 分页翻页之后序号会重新开始，要进行处理 */
const indexShow = (index) => {
  const { pagenum, pagesize } = searchValue;
  return (pagenum - 1) * pagesize + index + 1;
};

/* 搜索 */
const searchValue = reactive({
  name: '',
  ID_card: '',
  pagenum: 1, // 当前页
  pagesize: 5 // 当前生效的每页条数
});
const onSearch = () => {
  console.log(searchValue);
  getFarmerList();
};
const onReset = () => {
  searchValue.ID_card = '';
  searchValue.name = ''
  getFarmerList();
};
// 编辑
const onEdit = (row) => {
  dialog.value.open(row);
};
// 添加
const addUser = () => {
  dialog.value.open({});
};
const onSuccess = () => {
  getFarmerList();
};
// 删除
const onDelete = (row) => {
  ElMessageBox.confirm('你确认要删除该用户吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await deleteFarmerService(row.id);
      ElMessage.success('删除成功');
      getFarmerList();
    })
    .catch(() => {});
};

// 处理分页逻辑
const onSizeChange = (size) => {
  console.log('当前每页条数', size);
  // 只要是每页条数变化了，那么原本正在访问的当前页意义不大了，数据大概率已经不在原来那一页了
  // 重新从第一页渲染即可
  searchValue.pagenum = 1;
  searchValue.pagesize = size;
  // 基于最新的当前页 和 每页条数，渲染数据
  getFarmerList();
};
const onCurrentChange = (page) => {
  console.log(page);
  // 更新当前页
  searchValue.pagenum = page;
  // 基于最新的当前页，渲染数据
  getFarmerList();
};
</script>

<style lang="scss" scoped></style>
