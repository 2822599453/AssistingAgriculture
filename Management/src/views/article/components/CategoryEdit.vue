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
      <el-form-item label="一级分类" prop="parent_name">
        <el-select
          v-model="formData.parent_name"
          @change="onChange"
          class="m-2"
          style="width: 100%"
        >
          <el-option
            v-for="item in firstCategory"
            :key="item.id"
            :label="item.level_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" prop="level_name">
        <el-input v-model="formData.level_name" placeholder="请输入分类名称"></el-input>
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
import { updateCategoryService, addCategoryService } from '@/api/article.js';
const dialogVisible = ref(false);
const formRef = ref();
const firstCategory = ref([]);
const formData = ref({
  level: '2',
  parent_id: '',
  parent_name: '',
  level_name: ''
});
const rules = {
  // firstCategory: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  cate_alias: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { min: 1, max: 10, message: '必须是 3-10位 的字符', trigger: 'blur' }
  ]
};

/* 选择一级分类 */
const onChange = (value, label) => {
  formData.value.parent_id = value + '';
  firstCategory.value.map((item) => {
    if (item.id == value) {
      formData.value.parent_name = item.level_name;
    }
  });
};

const emit = defineEmits(['success']);
/* 提交 */
const onSubmit = async () => {
  await formRef.value.validate();
  const isEdit = formData.value.id;
  if (isEdit) {
    console.log(formData.value);
    await updateCategoryService(formData.value);
    ElMessage.success('编辑成功');
  } else {
    console.log(formData.value);
    await addCategoryService(formData.value);
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
const open = (row, options) => {
  dialogVisible.value = true;
  if (Object.keys(row).length === 0) {
    formData.value = {
      level: '2',
      parent_id: '',
      parent_name: '',
      level_name: ''
    };
  } else {
    formData.value = { ...row }; // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
  }
  firstCategory.value = options;
};

// 向外暴露方法
defineExpose({
  open
});
</script>
