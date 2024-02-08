<template>
  <el-dialog
    v-model="dialogVisible"
    @close="onClose"
    :title="formData.id ? '编辑农户' : '添加农户'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="ID_card">
        <el-input v-model="formData.ID_card" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="性别" required>
        <el-radio-group v-model="formData.gender" class="ml-4">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="formData.address" placeholder="请输入地址"></el-input>
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
import { updateFarmerService, addFarmerService } from '@/api/work_service.js';

const dialogVisible = ref(false);
const formRef = ref();
const formData = ref({
  name: '',
  ID_card: '',
  gender: '0',
  phone: '',
  address: ''
});
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名必须是 2-10位 的字符', trigger: 'blur' }
  ],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入用户电话', trigger: 'blur' },
    {
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: ['blur', 'change']
    }
  ],
  ID_card: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    {
      pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9xX]$/,
      message: '请输入正确的身份证号',
      trigger: ['blur', 'change']
    }
  ]
};

/* 提交 */
const emit = defineEmits(['success']);
const onSubmit = async () => {
  console.log(formData.value);
  await formRef.value
    .validate()
    .then(async () => {
      const isEdit = formData.value.id;
      console.log(formData.value);
      if (isEdit) {
        await updateFarmerService(formData.value);
        ElMessage.success('编辑成功');
      } else {
        await addFarmerService(formData.value);
        ElMessage.success('添加成功');
      }
      dialogVisible.value = false;
      emit('success');
    })
    .catch(() => {});
};
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
      name: '',
      ID_card: '',
      gender: '0',
      phone: '',
      address: ''
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

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
