<template>
  <el-dialog
    v-model="dialogVisible"
    @close="onClose"
    :title="formData.id ? '编辑人口情况' : '添加人口情况'"
    width="72%"
  >
    <el-form
      inline
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="130px"
      style="padding-right: 30px"
    >
      <el-form-item label="年份:" prop="time">
        <el-date-picker
          :disabled="formData.id ? true : false"
          v-model="formData.time"
          type="year"
          placeholder="请选择"
          style="width: 192px"
        />
      </el-form-item>

      <el-form-item label="黎平县" prop="area">
        <el-input v-model="formData.area.liping" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="德凤街道" prop="area">
        <el-input v-model="formData.area.defeng" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="高屯街道" prop="area">
        <el-input v-model="formData.area.gaotun" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="龙形街道" prop="area">
        <el-input v-model="formData.area.longxing" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="中潮镇" prop="area">
        <el-input v-model="formData.area.zhongchao" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="孟彦镇" prop="area">
        <el-input v-model="formData.area.mengyan" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="敖市镇" prop="area">
        <el-input v-model="formData.area.aoshi" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="九潮镇" prop="area">
        <el-input v-model="formData.area.jiuchao" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="岩洞镇" prop="area">
        <el-input v-model="formData.area.yandong" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="水口镇" prop="area">
        <el-input v-model="formData.area.shuikou" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="洪州镇" prop="area">
        <el-input v-model="formData.area.hongzhou" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="尚重镇" prop="area">
        <el-input v-model="formData.area.shangchong" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="双江镇" prop="area">
        <el-input v-model="formData.area.shuangjiang" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="肇兴镇" prop="area">
        <el-input v-model="formData.area.zhaoxing" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="龙额镇" prop="area">
        <el-input v-model="formData.area.longe" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="永从镇" prop="area">
        <el-input v-model="formData.area.yongcong" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="茅贡镇" prop="area">
        <el-input v-model="formData.area.maogong" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="地坪镇" prop="area">
        <el-input v-model="formData.area.diping" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="顺化瑶族乡" prop="area">
        <el-input v-model="formData.area.shunhua" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="雷洞瑶族水族乡" prop="area">
        <el-input v-model="formData.area.leidong" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="罗里乡" prop="area">
        <el-input v-model="formData.area.luoli" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="坝寨乡" prop="area">
        <el-input v-model="formData.area.bazhai" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="口江乡" prop="area">
        <el-input v-model="formData.area.koujiang" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="德顺乡" prop="area">
        <el-input v-model="formData.area.deshun" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="大稼乡" prop="area">
        <el-input v-model="formData.area.dajia" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="平寨乡" prop="area">
        <el-input v-model="formData.area.pingzhai" placeholder="请输入人口情况"></el-input>
      </el-form-item>
      <el-form-item label="德化乡" prop="area">
        <el-input v-model="formData.area.dehua" placeholder="请输入人口情况"></el-input>
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
import { addPopulationService, updatePopulationService } from '@/api/government_data.js';
import dayjs from 'dayjs';
const dialogVisible = ref(false);
const formRef = ref();
// 默认数据
const defaultForm = {
  time: '',
  area: {
    liping: '',
    defeng: '',
    gaotun: '',
    longxing: '',
    zhongchao: '',
    mengyan: '',
    aoshi: '',
    jiuchao: '',
    yandong: '',
    shuikou: '',
    hongzhou: '',
    shangchong: '',
    shuangjiang: '',
    zhaoxing: '',
    longe: '',
    yongcong: '',
    maogong: '',
    diping: '',
    shunhua: '',
    leidong: '',
    luoli: '',
    bazhai: '',
    koujiang: '',
    deshun: '',
    dajia: '',
    pingzhai: '',
    dehua: ''
  }
};

// 准备数据
const formData = ref({ ...defaultForm });

const rules = {
  time: [{ required: true, message: '请选择年份', trigger: 'blur' }],
  area: [{ required: true, message: '请输入人口情况', trigger: 'blur' }]
};

const emit = defineEmits(['success']);
/* 提交 */
const onSubmit = async () => {
  await formRef.value
    .validate()
    .then(async () => {
      const isEdit = formData.value.id;
      formData.value.time = dayjs(formData.value.time).format('YYYY-MM-DD HH:mm');
      formData.value.area = JSON.stringify(formData.value.area);
      if (isEdit) {
        console.log(formData.value);
        await updatePopulationService(formData.value);
        ElMessage.success('编辑成功');
      } else {
        console.log(formData.value);
        await addPopulationService(formData.value);
        ElMessage.success('添加成功');
      }
      dialogVisible.value = false;
      emit('success');
    })
    .catch(() => {});
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
    formData.value = { ...defaultForm };
  } else {
    row.area = JSON.parse(row.area);
    formData.value = { ...row }; // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
  }
};

// 向外暴露方法
defineExpose({
  open
});
</script>
