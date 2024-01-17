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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="fullname">
        <el-input v-model="formData.fullname" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-radio-group v-model="formData.role" class="ml-4">
          <el-radio label="1">管理员</el-radio>
          <el-radio label="2">普通用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="formData.gender" class="ml-4">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="formData.phone" placeholder="电话"></el-input>
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
  import { updateUserService, addUserService } from '@/api/user.js';
  const dialogVisible = ref(false);
  const formRef = ref();
  const formData = ref({
    username: '',
    password: '',
    fullname: '',
    role: '2',
    gender: '0',
    phone: '',
  });
  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 10, message: '用户名必须是 3-10位 的字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      {
        pattern: /^\S{6,15}$/,
        message: '密码必须是 6-15位 的非空字符',
        trigger: 'blur'
      }
    ],
    fullname: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 2, max: 10, message: '姓名必须是 2-10位 的字符', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '请输入用户电话', trigger: 'blur' },
      {
        pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        message: '请输入正确的手机号',
        trigger: ['blur', 'change']
      }
    ],
  };

  const emit = defineEmits(['success']);
  const onSubmit = async () => {
    await formRef.value.validate().then(async () => {
      const isEdit = formData.value.id;
      // console.log(formData.value)
      if (isEdit) {
        await updateUserService(formData.value);
        ElMessage.success('编辑成功');
      } else {
        await addUserService(formData.value);
        ElMessage.success('添加成功');
      }
      dialogVisible.value = false;
      emit('success');
    }).catch(() => {});
  };
  const onClose = () => {
    formRef.value.resetFields();
  };

  // 组件对外暴露一个方法 open，基于open传来的参数，区分添加还是编辑
  // open({})  => 表单无需渲染，说明是添加
  // open({ id, cate_name, ... })  => 表单需要渲染，说明是编辑
  // open调用后，可以打开弹窗
  const open = (row) => {
    console.log(row);
    dialogVisible.value = true;
    if (Object.keys(row).length === 0) {
      formData.value = {
        username: '',
        password: '',
        fullname: '',
        role: '2',
        gender: '0',
        phone: '',
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
