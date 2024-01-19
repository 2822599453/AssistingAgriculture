<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类:">
        <el-select>
          <el-option v-for="item in category" :key="item.id" :label="item.level_name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <!-- 这里后台标记发布状态，就是通过中文标记的，已发布 / 草稿 -->
        <el-select v-model="searchValue.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <!-- 利用作用域插槽 row 可以获取当前行的数据 => v-for 遍历 item -->
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
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 添加编辑的抽屉 -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Delete, Edit } from '@element-plus/icons-vue';
// import ChannelSelect from './components/ChannelSelect.vue'
// import ArticleEdit from './components/ArticleEdit.vue'
import { getSecondCategoryService, getArticleListService} from '@/api/article.js'
import { formatTime } from '@/utils/format.js';

const total = ref(0); // 总条数
const loading = ref(false); // loading状态

const articleList = ref([]);
const category = ref([])
const searchValue = ref({
  pagenum: 1, // 当前页
  pagesize: 5, // 当前生效的每页条数
  cate_id: '',
  state: ''
});

onMounted(() => {
  // getArticleList()
  getCategory()
  
})

const getCategory = async () => {
  const res = await getSecondCategoryService('8')
  category.value = res.data.data
}
const getArticleList = async () => {
  loading.value = true;
  const res = await getArticleListService(searchValue.value);
  articleList.value = res.data.data;
  total.value = res.data.total;

  loading.value = false;
};


// 处理分页逻辑
const onSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 只要是每页条数变化了，那么原本正在访问的当前页意义不大了，数据大概率已经不在原来那一页了
  // 重新从第一页渲染即可
  searchValue.value.pagenum = 1;
  searchValue.value.pagesize = size;
  // 基于最新的当前页 和 每页条数，渲染数据
  getArticleList();
};
const onCurrentChange = (page) => {
  // 更新当前页
  searchValue.value.pagenum = page;
  // 基于最新的当前页，渲染数据
  getArticleList();
};

// 搜索逻辑 => 按照最新的条件，重新检索，从第一页开始展示
const onSearch = () => {
  searchValue.value.pagenum = 1; // 重置页面
  getArticleList();
};

// 重置逻辑 => 将筛选条件清空，重新检索，从第一页开始展示
const onReset = () => {
  searchValue.value.pagenum = 1; // 重置页面
  searchValue.value.cate_id = '';
  searchValue.value.state = '';
  getArticleList();
};

const articleEditRef = ref();
// 添加逻辑
const onAddArticle = () => {
  articleEditRef.value.open({});
};
// 编辑逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row);
};

// 删除逻辑
const onDeleteArticle = async (row) => {
  // 提示用户是否要删除
  await ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  });
  await artDelService(row.id);
  ElMessage.success('删除成功');
  // 重新渲染列表
  getArticleList();
};

// 添加或者编辑 成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / searchValue.value.pagesize);
    // 更新成最大页码数，再渲染
    searchValue.value.pagenum = lastPage;
  }

  getArticleList();
};
</script>

<style lang="scss" scoped></style>
