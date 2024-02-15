<template>
  <page-container title="商户管理">
    <template #extra>
      <el-button type="primary" @click="addUser" disabled>添加商户</el-button>
    </template>

    <el-form inline>
      <el-form-item label="商户名称:">
        <el-input
          v-model="searchValue.store_name"
          class="w-50 m-2"
          placeholder="请输入"
          :prefix-icon="Search"
          style="width: 190px"
        />
      </el-form-item>
      <el-form-item label="统一信用代码:">
        <el-input
          v-model="searchValue.code"
          class="w-50 m-2"
          placeholder="请输入"
          :prefix-icon="Search"
          style="width: 190px"
        />
      </el-form-item>
      <el-form-item label="经营范围:">
        <el-select v-model="searchValue.business_line" style="width: 190px">
          <el-option label="餐饮" value="1"></el-option>
          <el-option label="住宿" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="searchValue.state" style="width: 190px">
          <el-option label="待审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button @click="onProcess" color="#f3812f" style="color: #fff;" :disabled="!isSelected || !flag">审核通过</el-button>
        <el-button @click="onReturn" color="#f3812f" style="color: #fff;" :disabled="!isSelected || flag">打回</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="farmerList"
      style="width: 100%"
      highlight-current-row
      height="400"
      @row-click="handleRowClick"
    >
      <el-table-column prop="store_name" label="商户名称" width="150"></el-table-column>
      <el-table-column prop="superintendent" label="法人" width="150"></el-table-column>
      <el-table-column prop="business_line" label="经营范围" width="150">
        <template #default="{ row }">
          <el-tag :type="row.business_line === '1' ? '' : 'warning'">{{
            row.business_line === '1' ? '餐饮' : '住宿'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="150">
        <template #default="{ row }">
          <el-tag :type="row.state === '0' ? 'info' : 'success'">{{
            row.state === '0' ? '待审核' : '审核通过'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="社会信用代码"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button :icon="Edit" circle type="primary" disabled @click="onEdit(row, $index)"></el-button>
          <el-button :icon="Delete" circle type="danger" disabled @click="onDelete(row, $index)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <store-edit ref="dialog" @success="onSuccess"></store-edit>
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
import { getStoreListService, deleteStoreService, updateStoreService } from '@/api/work_service';
import { Edit, Delete, Search } from '@element-plus/icons-vue';
import StoreEdit from './components/StoreEdit.vue';
const total = ref(0); // 总条数
const loading = ref(false);
const dialog = ref();

/* 获取数据 */
onMounted(() => {
  getStoreList();
});
const farmerList = ref([]);
const getStoreList = async () => {
  loading.value = true;
  const res = await getStoreListService(searchValue);
  farmerList.value = res.data.data;
  total.value = res.data.total;
  loading.value = false;
};

/* 搜索 */
const searchValue = reactive({
  store_name: '',
  business_line: '',
  code: '',
  state: '',
  pagenum: 1, // 当前页
  pagesize: 5 // 当前生效的每页条数
});
const onSearch = () => {
  console.log(searchValue);
  getStoreList();
};
const onReset = () => {
  searchValue.store_name = '';
  searchValue.business_line = '';
  searchValue.code = '';
  searchValue.state = '';
  isSelected.value = false
  getStoreList();
};
/* 编辑 */
const onEdit = (row) => {
  dialog.value.open(row);
};
/* 添加 */
const addUser = () => {
  dialog.value.open({});
};
const onSuccess = () => {
  getStoreList();
};
/* 删除 */
const onDelete = (row) => {
  ElMessageBox.confirm('你确认要删除该用户吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await deleteStoreService(row.id);
      ElMessage.success('删除成功');
      getStoreList();
    })
    .catch(() => {});
};
/* 审核 */
const flag = ref(true) // true:通过  false:打回 
const isSelected = ref(false)
const selectOption = ref()
const onProcess = () => {
  ElMessageBox.confirm('你确认审核通过该店铺吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await updateStoreService({...selectOption.value, state: '1'});
      isSelected.value = false
      getStoreList();
    })
    .catch(() => {});
}
const onReturn = () => {
  ElMessageBox.confirm('你确认要打回该店铺吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await updateStoreService({...selectOption.value, state: '0'});
      isSelected.value = false
      getStoreList();
    })
    .catch(() => {});
}
const handleRowClick = (row) => {
  selectOption.value = row
  isSelected.value = true
  if(row && row.state === '0') {
    flag.value = true
  } else {
    flag.value = false
  }
}

/* 处理分页逻辑 */
const onSizeChange = (size) => {
  console.log('当前每页条数', size);
  // 只要是每页条数变化了，那么原本正在访问的当前页意义不大了，数据大概率已经不在原来那一页了
  // 重新从第一页渲染即可
  searchValue.pagenum = 1;
  searchValue.pagesize = size;
  // 基于最新的当前页 和 每页条数，渲染数据
  getStoreList();
};
const onCurrentChange = (page) => {
  console.log(page);
  // 更新当前页
  searchValue.pagenum = page;
  // 基于最新的当前页，渲染数据
  getStoreList();
};
</script>

<style lang="scss" scoped></style>
