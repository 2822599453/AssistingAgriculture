<template>
  <page-container title="用户管理">
    <template #extra>
      <el-button type="primary" @click="addUser">添加用户</el-button>
    </template>

    <el-form inline>
      <el-form-item label="姓名:">
        <!-- Vue2 => v-model :value 和 @input 的简写 -->
        <!-- Vue3 => v-model :modelValue 和 @update:modelValue 的简写 -->
        <!-- <channel-select v-model="params.cate_id"></channel-select> -->
        <el-input
          v-model="searchValue.fullname"
          class="w-50 m-2"
          placeholder="请输入"
          :prefix-icon="Search"
        />
        <!-- Vue3 => v-model:cid  :cid 和 @update:cid 的简写 -->
        <!-- <channel-select v-model:cid="params.cate_id"></channel-select> -->
      </el-form-item>
      <el-form-item label="角色:">
        <el-select v-model="searchValue.role">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="普通用户" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别:">
        <el-select v-model="searchValue.gender">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="userList" style="width: 100%" height="400">
      <el-table-column type="index" :index="indexShow" label="序号" width="100"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="fullname" label="姓名"></el-table-column>
      <el-table-column prop="role" label="角色">
        <template #default="{ row, $index }">
          <el-tag :type="row.role === '1' ? '' : 'success'">{{
            row.role === '1' ? '管理员' : '普通用户'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别">
        <template #default="{ row, $index }">
          <el-tag :type="row.gender === '0' ? '' : 'danger'">{{
            row.gender === '0' ? '男' : '女'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row 就是 userList 的一项， $index 下标 -->
        <template #default="{ row, $index }">
          <el-button :icon="Edit" circle type="primary" @click="onEdit(row, $index)"></el-button>
          <el-button :icon="Delete" circle type="danger" @click="onDelete(row, $index)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <user-edit ref="dialog" @success="onSuccess"></user-edit>
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
import { getUserListService, deleteUserService } from '@/api/user';
import { Edit, Delete, Search } from '@element-plus/icons-vue';
import UserEdit from './components/UserEdit.vue';
const total = ref(0); // 总条数
const loading = ref(false);
const dialog = ref();

/* 获取数据 */
onMounted(() => {
  getUserList();
});
const userList = ref([]);
const getUserList = async () => {
  loading.value = true;
  const res = await getUserListService(searchValue);
  userList.value = res.data.data;
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
  gender: '',
  role: '',
  fullname: '',
  pagenum: 1, // 当前页
  pagesize: 5 // 当前生效的每页条数
});
const onSearch = () => {
  console.log(searchValue);
  getUserList();
};
const onReset = () => {
  searchValue.gender = '';
  searchValue.role = '';
  searchValue.fullname = '';
  getUserList();
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
  getUserList();
};
// 删除
const onDelete = (row) => {
  ElMessageBox.confirm('你确认要删除该用户吗', '温馨提示', {
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

// 处理分页逻辑
const onSizeChange = (size) => {
  console.log('当前每页条数', size);
  // 只要是每页条数变化了，那么原本正在访问的当前页意义不大了，数据大概率已经不在原来那一页了
  // 重新从第一页渲染即可
  searchValue.pagenum = 1;
  searchValue.pagesize = size;
  // 基于最新的当前页 和 每页条数，渲染数据
  getUserList();
};
const onCurrentChange = (page) => {
  console.log(page);
  // 更新当前页
  searchValue.pagenum = page;
  // 基于最新的当前页，渲染数据
  getUserList();
};
</script>

<style lang="scss" scoped></style>
