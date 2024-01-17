<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="addCategory">添加分类</el-button>
    </template>

    <el-form inline>
      <el-form-item label="一级分类:">
        <el-select v-model="searchValue.parent_id">
          <el-option v-for="item in firstCategory" :key="item.id" :label="item.level_name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="categoryList" style="width: 100%; height: 400px">
      <el-table-column type="index" :index="indexShow" label="序号" width="100"></el-table-column>
      <el-table-column prop="parent_name" label="一级分类"></el-table-column>
      <el-table-column prop="level_name" label="二级分类"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row 就是 categoryList 的一项， $index 下标 -->
        <template #default="{ row, $index }">
          <el-button :icon="Edit" circle type="primary" @click="onEdit(row, $index)"></el-button>
          <el-button :icon="Delete" circle type="danger" @click="onDelete(row, $index)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="searchValue.pagenum"
      v-model:page-size="searchValue.pagesize"
      :page-sizes="[2, 3, 5, 10]"
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
import { getCategoryListService, getFirstCategoryService } from '@/api/article';
import { Edit, Delete } from '@element-plus/icons-vue';
import ChannelEdit from './components/ChannelEdit.vue';

const loading = ref(false);
const dialog = ref();

/* 获取数据 */
onMounted(() => {
  getcategoryList();
  getFirstCategory();
});
const categoryList = ref([]);
const total = ref(0); // 总条数
const getcategoryList = async () => {
  loading.value = true;
  const res = await getCategoryListService(searchValue);
  categoryList.value = res.data.data;
  total.value = res.data.total;
  loading.value = false;
};
const firstCategory = ref([]);
const getFirstCategory = async () => {
  const res = await getFirstCategoryService();
  firstCategory.value = res.data.data;
};

/* 分页翻页之后序号会重新开始，要进行处理 */
const indexShow = (index) => {
  const { pagenum, pagesize } = searchValue;
  return (pagenum - 1) * pagesize + index + 1;
};

/* 搜索 */
const searchValue = reactive({
  parent_id: '',
  pagenum: 1, // 当前页
  pagesize: 5 // 当前生效的每页条数
});
const onSearch = () => {
  console.log(searchValue);
  getcategoryList();
};
const onReset = () => {
  searchValue.parent_id = '';
  getcategoryList();
};

/* 操作 */
// 编辑
const onEdit = (row) => {
  dialog.value.open(row, firstCategory.value);
};
// 添加
const addCategory = () => {
  dialog.value.open({}, firstCategory.value);
};
// 删除
const onDelete = (row) => {
  ElMessageBox.confirm('你确认要删除该分类吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await deleteUserService(row.id);
      ElMessage.success('删除成功');
      getUserList();
    })
    .catch(() => {});
};
const onSuccess = () => {
  getcategoryList();
};

/* 处理分页逻辑 */
const onSizeChange = (size) => {
  console.log('当前每页条数', size);
  // 只要是每页条数变化了，那么原本正在访问的当前页意义不大了，数据大概率已经不在原来那一页了
  // 重新从第一页渲染即可
  searchValue.pagenum = 1;
  searchValue.pagesize = size;
  // 基于最新的当前页 和 每页条数，渲染数据
  getcategoryList();
};
const onCurrentChange = (page) => {
  console.log(page);
  // 更新当前页
  searchValue.pagenum = page;
  // 基于最新的当前页，渲染数据
  getcategoryList();
};
</script>

<style lang="scss" scoped></style>
