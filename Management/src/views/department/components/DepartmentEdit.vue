<template>
  <el-dialog
    v-model="dialogVisible"
    @close="onClose"
    :title="formData.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="属地" prop="area" >
        <el-input v-model="formData.area" disabled></el-input>
      </el-form-item>

      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入部门名称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { addDepartmentService, updateDepartmentService } from '@/api/department.js';
const dialogVisible = ref(false);
const formRef = ref();
const formData = ref({
  area: '黔东南苗族侗族自治州',
  name: ''
});
const rules = {
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' }
  ]
};

const emit = defineEmits(['success']);
/* 提交 */
const onSubmit = async () => {
  await formRef.value.validate();
  const isEdit = formData.value.id;
  if (isEdit) {
    console.log(formData.value);
    await updateDepartmentService(formData.value);
    ElMessage.success('编辑成功');
  } else {
    console.log(formData.value);
    await addDepartmentService(formData.value);
    ElMessage.success('添加成功');
  }
  dialogVisible.value = false;
  emit('success');
};
/* 关闭 */
const onClose = () => {
  formRef.value.resetFields();
};

// 组件对外暴露一个方法 open，基于open传来的参数，区分添加还是编辑
// open({})  => 表单无需渲染，说明是添加
// open({ id, cate_name, ... })  => 表单需要渲染，说明是编辑
// open调用后，可以打开弹窗
const open = (row) => {
  dialogVisible.value = true;
  if (Object.keys(row).length === 0) {
    formData.value = {
      area: '黔东南苗族侗族自治州',
      name: ''
    };
  } else {
    formData.value = { ...row }; // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
  }
};

// 向外暴露方法
defineExpose({
  open
});
</script>
