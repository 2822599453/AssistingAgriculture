<template>
  <page-container title="经济发展">
    <template #extra>
      <el-button type="primary" @click="onAddGdp">添加生产总值</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="年份:">
        <el-date-picker v-model="searchValue.time" @change="timeChange" type="year" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="产业类别:">
        <!-- 这里后台标记发布状态，就是通过中文标记的，已发布 / 草稿 -->
        <el-select v-model="searchValue.type">
          <el-option label="地区生产总值" value="0"></el-option>
          <el-option label="第一产业增加值" value="1"></el-option>
          <el-option label="第二产业增加值" value="2"></el-option>
          <el-option label="第三产业增加值" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="gdpList" v-loading="loading" height="400">
      <el-table-column type="index" :index="indexShow" label="序号" width="100"></el-table-column>
      <el-table-column label="年份" prop="time"> </el-table-column>
      <el-table-column label="产业类别" prop="type_text"> </el-table-column>
      <el-table-column label="生产总值(万元)" prop="total"></el-table-column>

      <el-table-column label="增长率(%)" prop="rate"> </el-table-column>

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
    <economy-edit ref="economyEditRef" @success="onSuccess"></economy-edit>
  </page-container>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { Delete, Edit, Search } from '@element-plus/icons-vue';
import { getGdpListService, deleteGdpService } from '@/api/government_data.js';
import economyEdit from './components/EconomyEdit.vue';
import dayjs from 'dayjs';

const total = ref(0); // 总条数
const loading = ref(false); // loading状态
const gdpList = ref([]);
/* 获取数据 */
onMounted(() => {
  getGdpList();
});

const getGdpList = async () => {
  loading.value = true;
  const res = await getGdpListService(searchValue);
  gdpList.value = res.data.data;
  total.value = res.data.total;
  loading.value = false;
  gdpList.value.forEach((item) => {
    item.time = dayjs(item.time).format('YYYY');
    switch (item.type) {
      case '0':
        item.type_text = '地区生产总值';
        break;
      case '1':
        item.type_text = '第一产业增加值';
        break;
      case '2':
        item.type_text = '第二产业增加值';
        break;
      case '3':
        item.type_text = '第三产业增加值';
        break;
    }
  });
};

/* 搜索 */
const searchValue = reactive({
  pagenum: 1, // 当前页
  pagesize: 5, // 当前生效的每页条数
  type: '',
  time: ''
});
const timeChange = (value) => {
  searchValue.time = dayjs(value).format('YYYY-MM-DD HH:mm')
}

const onSearch = () => {
  searchValue.pagenum = 1; // 重置页面
  searchValue.time = searchValue.time || '';
  getGdpList();
};
const onReset = () => {
  searchValue.pagenum = 1; // 重置页面
  searchValue.type = '';
  searchValue.time = '';
  getGdpList();
};

/* 处理分页逻辑 */
const onSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 只要是每页条数变化了，那么原本正在访问的当前页意义不大了，数据大概率已经不在原来那一页了
  // 重新从第一页渲染即可
  searchValue.pagenum = 1;
  searchValue.pagesize = size;
  // 基于最新的当前页 和 每页条数，渲染数据
  getGdpList();
};
const onCurrentChange = (page) => {
  // 更新当前页
  searchValue.pagenum = page;
  // 基于最新的当前页，渲染数据
  getGdpList();
};
/* 分页翻页之后序号会重新开始，要进行处理 */
const indexShow = (index) => {
  const { pagenum, pagesize } = searchValue;
  return (pagenum - 1) * pagesize + index + 1;
};


/* 文章新增或编辑 */
const economyEditRef = ref();

// 添加
const onAddGdp = () => {
  economyEditRef.value.open({});
};
// 编辑
const onEditGdp = (row) => {
  economyEditRef.value.open(row);
};
// 添加或者编辑 成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / searchValue.pagesize);
    // 更新成最大页码数，再渲染
    searchValue.pagenum = lastPage;
  }
  getGdpList();
};

/* 删除 */
const onDeleteGdp = async (row) => {
  // 提示用户是否要删除
  ElMessageBox.confirm('你确认要删除吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(async () => {
    await deleteGdpService(row.id);
    ElMessage.success('删除成功');
    getGdpList();
  }).catch(() => {});
};
</script>

<style lang="scss" scoped></style>
