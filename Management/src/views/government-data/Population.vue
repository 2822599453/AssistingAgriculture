<template>
  <page-container title="人口就业">
    <template #extra>
      <el-button type="primary" @click="onAddPopulation">添加人口情况</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="年份:">
        <el-date-picker v-model="searchValue.time" @change="timeChange" type="year" placeholder="请选择" />
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="populationList" v-loading="loading" height="400">
      <el-table-column type="index" :index="indexShow" label="序号" width="100"></el-table-column>
      <el-table-column label="年份" prop="time"> </el-table-column>
      <el-table-column label="人口情况" prop="area"> 
        <template #default="{ row }">
          <el-link type="primary" :underline="false" @click="onEditGdp(row)">查看详情</el-link>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button circle type="primary" :icon="Edit" @click="onEditGdp(row)"></el-button>
          <el-button circle type="danger" :icon="Delete" @click="onDeleteGdp(row)"></el-button>
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
    <population-edit ref="PopulationEditRef" @success="onSuccess"></population-edit>
  </page-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Delete, Edit, 
 } from '@element-plus/icons-vue';
import { getPopulationListService, deletePopulationService } from '@/api/government_data.js';
import populationEdit from './components/PopulationEdit.vue';
import dayjs from 'dayjs';

const total = ref(0); // 总条数
const loading = ref(false); // loading状态
const populationList = ref([]);
/* 获取数据 */
onMounted(() => {
  getPopulationList();
});

const getPopulationList = async () => {
  loading.value = true;
  const res = await getPopulationListService(searchValue);
  populationList.value = res.data.data;
  total.value = res.data.total;
  loading.value = false;
  populationList.value.forEach((item) => {
    item.time = dayjs(item.time).format('YYYY');
  });
};

/* 搜索 */
const searchValue = reactive({
  pagenum: 1, // 当前页
  pagesize: 5, // 当前生效的每页条数
  time: ''
});
const timeChange = (value) => {
  searchValue.time = dayjs(value).format('YYYY-MM-DD HH:mm')
}

const onSearch = () => {
  searchValue.pagenum = 1; // 重置页面
  searchValue.time = searchValue.time || '';
  getPopulationList();
};
const onReset = () => {
  searchValue.pagenum = 1; // 重置页面
  searchValue.time = '';
  getPopulationList();
};

/* 处理分页逻辑 */
const onSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 只要是每页条数变化了，那么原本正在访问的当前页意义不大了，数据大概率已经不在原来那一页了
  // 重新从第一页渲染即可
  searchValue.pagenum = 1;
  searchValue.pagesize = size;
  // 基于最新的当前页 和 每页条数，渲染数据
  getPopulationList();
};
const onCurrentChange = (page) => {
  // 更新当前页
  searchValue.pagenum = page;
  // 基于最新的当前页，渲染数据
  getPopulationList();
};
/* 分页翻页之后序号会重新开始，要进行处理 */
const indexShow = (index) => {
  const { pagenum, pagesize } = searchValue;
  return (pagenum - 1) * pagesize + index + 1;
};


/* 文章新增或编辑 */
const PopulationEditRef = ref();

// 添加
const onAddPopulation = () => {
  PopulationEditRef.value.open({});
};
// 编辑
const onEditGdp = (row) => {
  PopulationEditRef.value.open(row);
};
// 添加或者编辑 成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / searchValue.pagesize);
    // 更新成最大页码数，再渲染
    searchValue.pagenum = lastPage;
  }
  getPopulationList();
};

/* 删除 */
const onDeleteGdp = async (row) => {
  // 提示用户是否要删除
  ElMessageBox.confirm('你确认要删除吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(async () => {
    await deletePopulationService(row.id);
    ElMessage.success('删除成功');
    getPopulationList();
  }).catch(() => {});
};
</script>

<style lang="scss" scoped></style>
