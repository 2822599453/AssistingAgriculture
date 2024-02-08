<template>
  <el-dialog
    v-model="dialogVisible"
    @close="onClose"
    :title="formData.id ? '编辑gdp' : '添加gdp'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="130px"
      style="padding-right: 30px"
    >
      <el-form-item label="年份:" prop="time" >
        <el-date-picker
          :disabled="formData.id ? true : false"
          style="width: 100%"
          v-model="formData.time"
          type="year"
          placeholder="请选择"
        />
      </el-form-item>

      <el-form-item label="生产总值(万元)" prop="total" >
        <el-input v-model="formData.total" placeholder="请输入生产总值"></el-input>
      </el-form-item>
      <el-form-item label="增长率(%)" prop="rate">
        <el-input v-model="formData.rate" placeholder="请输入增长率"></el-input>
      </el-form-item>
      <el-form-item label="产业类别" prop="type">
        <el-select v-model="formData.type" style="width: 100%">
          <el-option label="地区生产总值" value="0"></el-option>
          <el-option label="第一产业增加值" value="1"></el-option>
          <el-option label="第二产业增加值" value="2"></el-option>
          <el-option label="第三产业增加值" value="3"></el-option>
        </el-select>
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
import { addGdpService, updateGdpService } from '@/api/government_data.js';
import dayjs from 'dayjs'
const dialogVisible = ref(false);
const formRef = ref();
const formData = ref({
  total: '',
  time: '',
  type: '',
  rate: ''
});
const rules = {
  time: [{ required: true, message: '请选择年份', trigger: 'blur' }],
  total: [{ required: true, message: '请输入生产总值', trigger: 'blur' }],
  rate: [{ required: true, message: '请输入增长率', trigger: 'blur' }],
  type: [{ required: true, message: '请选择产业类别', trigger: 'blur' }],
};

const emit = defineEmits(['success']);
/* 提交 */
const onSubmit = async () => {
  await formRef.value.validate();
  const isEdit = formData.value.id;
  formData.value.time = dayjs(formData.value.time).format('YYYY-MM-DD HH:mm')
  if (isEdit) {
    console.log(formData.value);
    await updateGdpService(formData.value);
    ElMessage.success('编辑成功');
  } else {
    console.log(formData.value);
    await addGdpService(formData.value);
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
      total: '',
      time: '',
      type: '',
      rate: ''
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
