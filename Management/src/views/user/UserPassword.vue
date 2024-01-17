<template>
  <page-container title="修改密码">
    <el-row>
      <el-col :span="12">
        <el-form
          ref="formRef"
          :model="pwdForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="原密码" prop="password">
            <el-input v-model="pwdForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="pwdForm.newPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="pwdForm.confirmPassword" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">修改密码</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form></el-col
      >
    </el-row>
  </page-container>
</template>

<script setup>
import { ref } from 'vue'
import { updatePasswordService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()

const formRef = ref()
const pwdForm = ref({
  username: userStore.userInfo.username,
  password: '',
  newPassword: '',
  confirmPassword: ''
})

const checkDifferent = (rule, value, callback) => {
  // 校验新密码和原密码不能一样
  if (value === pwdForm.value.password) {
    callback(new Error('新密码不能与原密码一样'))
  } else {
    callback()
  }
}
const checkSameAsNewPwd = (rule, value, callback) => {
  // 校验确认密码必须和新密码一样
  if (value !== pwdForm.value.newPassword) {
    callback(new Error('确认密码必须和新密码一样'))
  } else {
    callback()
  }
}
const rules = ref({
  password: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '原密码长度在6-15位之间', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '新密码长度在6-15位之间', trigger: 'blur' },
    { validator: checkDifferent, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '确认密码长度在6-15位之间', trigger: 'blur' },
    { validator: checkSameAsNewPwd, trigger: 'blur' }
  ]
})



const submitForm = async () => {
  formRef.value.validate().then(async () => {
    await updatePasswordService(pwdForm.value)
    ElMessage.success('密码修改成功')
  }).catch(() => {})
  // await userUpdatePasswordService(pwdForm.value)
  

  // 密码修改成功后，退出重新登录
  // 清空本地存储的 token 和 个人信息
  // userStore.setToken('')
  // userStore.setUser({})

  // 拦截登录
  // router.push('/login')
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>


