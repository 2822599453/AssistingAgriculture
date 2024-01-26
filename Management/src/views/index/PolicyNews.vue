<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类:">
        <el-select v-model="searchValue.category_id">
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.level_name"
            :value="item.id + ''"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="来源:">
        <el-input
          v-model="searchValue.name"
          class="w-50 m-2"
          placeholder="请输入"
          :prefix-icon="Search"
        />
      </el-form-item>
      <el-form-item label="发布状态:">
        <!-- 这里后台标记发布状态，就是通过中文标记的，已发布 / 草稿 -->
        <el-select v-model="searchValue.is_publish">
          <el-option label="草稿" value="0"></el-option>
          <el-option label="已发布" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading" height="400">
      <el-table-column label="分类" prop="category_name"></el-table-column>
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false" @click="onArticleShow(row)">{{
            row.title
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="来源" prop="department_name"></el-table-column>
      <el-table-column label="发表时间" prop="edit_time">
        <template #default="{ row }">
          {{ formatTime(row.edit_time) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="is_publish">
        <template #default="{ row }">
          <el-tag :type="row.is_publish === '0' ? 'info' : 'success'">{{
            row.is_publish === '0' ? '草稿' : '已发布'
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button circle type="primary" :icon="Edit" @click="onEditArticle(row)"></el-button>
          <el-button circle type="danger" :icon="Delete" @click="onDeleteArticle(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

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

    <!-- 添加编辑的抽屉 -->
    <article-edit :category="category" ref="articleEditRef" @success="onSuccess"></article-edit>
    <article-show ref="articleShowRef"></article-show>
  </page-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Delete, Edit, Search } from '@element-plus/icons-vue';
import {
  getSecondCategoryService,
  getArticleListService,
  deleteArticleService
} from '@/api/article.js';
import { formatTime } from '@/utils/format.js';
import { flag } from '@/utils/article_flag.js';

const total = ref(0); // 总条数
const loading = ref(false); // loading状态

/* 获取数据 */
onMounted(() => {
  getArticleList();
  getCategory();
});
const articleList = ref([]);
const category = ref([]);
const getCategory = async () => {
  const res = await getSecondCategoryService(flag['index']);
  category.value = res.data.data;
};
const getArticleList = async () => {
  loading.value = true;
  const res = await getArticleListService(searchValue);
  articleList.value = res.data.data;
  total.value = res.data.total;
  loading.value = false;
};

/* 搜索 */
const searchValue = reactive({
  pagenum: 1, // 当前页
  pagesize: 5, // 当前生效的每页条数
  category_id: '',
  is_publish: '',
  name: '',
  flag: flag['index']
});
const onSearch = () => {
  searchValue.pagenum = 1; // 重置页面
  getArticleList();
};
const onReset = () => {
  searchValue.pagenum = 1; // 重置页面
  searchValue.category_id = '';
  searchValue.is_publish = '';
  searchValue.name = '';
  getArticleList();
};

/* 处理分页逻辑 */
const onSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 只要是每页条数变化了，那么原本正在访问的当前页意义不大了，数据大概率已经不在原来那一页了
  // 重新从第一页渲染即可
  searchValue.pagenum = 1;
  searchValue.pagesize = size;
  // 基于最新的当前页 和 每页条数，渲染数据
  getArticleList();
};
const onCurrentChange = (page) => {
  // 更新当前页
  searchValue.pagenum = page;
  // 基于最新的当前页，渲染数据
  getArticleList();
};

const articleShowRef = ref();
const onArticleShow = (row) => {
  articleShowRef.value.open(row);
};

/* 文章新增或编辑 */
const articleEditRef = ref();

// 添加
const onAddArticle = () => {
  articleEditRef.value.open({});
};
// 编辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row);
};
// 添加或者编辑 成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / searchValue.pagesize);
    // 更新成最大页码数，再渲染
    searchValue.pagenum = lastPage;
  }
  getArticleList();
};

/* 删除 */
const onDeleteArticle = async (row) => {
  // 提示用户是否要删除
  await ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  });
  await deleteArticleService(row.id);
  ElMessage.success('删除成功');
  // 重新渲染列表
  getArticleList();
};
</script>

<style lang="scss" scoped></style>
