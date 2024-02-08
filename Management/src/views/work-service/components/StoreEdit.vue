<template>
  <el-dialog
    v-model="dialogVisible"
    @close="onClose"
    :title="formData.id ? '编辑商户' : '添加商户'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="130px"
      style="padding-right: 30px"
    >
      <el-form-item label="姓名" prop="store_name">
        <el-input v-model="formData.store_name" placeholder="请输入商户名称"></el-input>
      </el-form-item>
      <el-form-item label="法人" prop="superintendent">
        <el-input v-model="formData.superintendent" placeholder="请输入法人"></el-input>
      </el-form-item>
      <el-form-item label="经营范围" prop="business_line">
        <el-select v-model="formData.business_line" placeholder="请选择经营范围">
          <el-option
            v-for="item in business_line"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="社会信用代码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入社会信用代码"></el-input>
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
import { updateStoreService, addStoreService } from '@/api/work_service.js';

const dialogVisible = ref(false);
const business_line = [{value: '1', text: '餐饮'}, {value: '2', text: '住宿'}]
const formRef = ref();
const formData = ref({
  store_name: '',
  superintendent: '',
  business_line: '',
  code: '',
  address: ''
});
const rules = {
  store_name: [
    { required: true, message: '请输入商户名称', trigger: 'blur' },
    { min: 2, max: 10, message: '名称必须是 2-10位 的字符', trigger: 'blur' }
  ],
  superintendent: [
    { required: true, message: '请输入法人', trigger: 'blur' },
    { min: 2, max: 10, message: '名称必须是 2-10位 的字符', trigger: 'blur' }
  ],
  business_line: [{ required: true, message: '请选择', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  code: [
    { required: true, message: '请输入社会信用代码', trigger: 'blur' },
    {
      pattern: /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/,
      message: '请输入正确的社会信用代码',
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
        await updateStoreService(formData.value);
        ElMessage.success('编辑成功');
      } else {
        await addStoreService(formData.value);
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
      store_name: '',
  superintendent: '',
  business_line: '',
  code: '',
  address: ''
    };
  } else {
    console.log(row)
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
