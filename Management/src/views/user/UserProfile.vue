<template>
  <page-container title="基本资料">
    <!-- 表单部分 -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-input :placeholder="form.role === '1' ? '管理员' : '普通用户'" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户性别" prop="email">
        <el-radio-group v-model="form.gender" class="ml-4">
          <el-radio label="0" size="large" border>男</el-radio>
          <el-radio label="1" size="large" border>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户姓名" prop="fullname">
        <el-input v-model="form.fullname"></el-input>
      </el-form-item>
      <el-form-item label="用户电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<script setup>
  import PageContainer from '@/components/PageContainer.vue';
  import { ref } from 'vue';
  import { useUserStore } from '@/stores';
  import { updateUserService } from '@/api/user';

  const formRef = ref();

  // 是在使用仓库中数据的初始值 (无需响应式) 解构无问题
  const {
    userInfo: { id,fullname, role, gender, phone, username, password },
    getUserInfo
  } = useUserStore();

  const form = ref({
    id,
    fullname,
    role,
    username,
    gender,
    phone,
    password
  });

  const rules = ref({
    fullname: [
      { required: true, message: '请输入用户姓名', trigger: 'blur' },
      {
        pattern: /^\S{2,10}/,
        message: '昵称长度在2-10个非空字符',
        trigger: 'blur'
      }
    ],
    phone: [
      { required: true, message: '请输入用户电话', trigger: 'blur' },
      {
        pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        message: '请输入正确的手机号',
        trigger: ['blur', 'change']
      }
    ]
  });

  const submitForm = async () => {
    // 等待校验结果
    await formRef.value.validate();
    // 提交修改
    console.log(form.value)
    await updateUserService(form.value);
    // 通知 user 模块，进行数据的更新
    getUserInfo();
    // 提示用户
    ElMessage.success('修改成功');
  };
</script>
