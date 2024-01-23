<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formData.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formData" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <el-select v-model="formData.category_id" style="width: 100%">
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.level_name"
            :value="item.id + ''"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            v-model:content="formData.content"
            content-type="html"
            theme="snow"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('1')" type="primary">发布</el-button>
        <el-button @click="onPublish('0')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {addArticleService, getArticleDetailService, updateArticleService} from '@/api/article'
import { baseURL } from '@/utils/request';
import axios from 'axios';
import { formatTime } from '@/utils/format.js';
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const props = defineProps({
  category: Array
});

const visibleDrawer = ref(false);

// 默认数据
const defaultForm = {
  department_id: userStore.userInfo.department_id,
  category_id: '',
  category_name: '',
  title: '',
  content: '',
  cover: '',
  is_publish: '',
  edit_time: ''
};

// 准备数据
const formData = ref({ ...defaultForm });

// 图片上传相关逻辑
const imgUrl = ref('');
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw); // 预览图片
  formData.value.cover = uploadFile.raw;
};

// 提交
const emit = defineEmits(['success']);
const onPublish = async (is_publish) => {
  formData.value.is_publish = is_publish;
  props.category.forEach(item => {
    if(formData.value.category_id == item.id) {
      formData.value.category_name = item.level_name
    }
  })
  formData.value.edit_time = formatTime(Date.now())
  // 转换成 FormData
  const fd = new FormData();
  for (let key in formData.value) {
    fd.append(key, formData.value[key]);
  }
  
  if (formData.value.id) {
    // 编辑操作
    console.log(formData.value)
    await updateArticleService(fd)
    ElMessage.success('修改成功');
    visibleDrawer.value = false;
    emit('success', 'edit');
  } else {
    // 添加操作
    await addArticleService(fd)
    ElMessage.success('添加成功');
    visibleDrawer.value = false;
    emit('success', 'add');
  }
};

// 组件对外暴露一个方法 open，基于open传来的参数，区分添加还是编辑
// open({})  => 表单无需渲染，说明是添加
// open({ id, ..., ... })  => 表单需要渲染，说明是编辑
// open调用后，可以打开抽屉
const editorRef = ref();
const open = async (row) => {
  console.log(row)
  visibleDrawer.value = true;
  if (row.id) {
    const res = await getArticleDetailService(row.id)
    formData.value = res.data.data;
    console.log(formData.value)
    imgUrl.value = formData.value.cover;
    // const file = await imageUrlToFileObject(imgUrl.value, formData.value.cover_img);
    // formData.value.cover = file;
  } else {
    // 重置数据
    formData.value = { ...defaultForm };
    imgUrl.value = '';
    // editorRef._value.setHTML('')
  }
};

// 将网络图片地址转换为 File 对象的函数
async function imageUrlToFileObject(imageUrl, filename) {
  try {
    // 使用 Axios 下载图片数据
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    // 将下载的数据转换成 Blob 对象
    const blob = new Blob([response.data], {
      type: response.headers['content-type']
    });
    // 创建 File 对象
    const file = new File([blob], filename, {
      type: response.headers['content-type']
    });
    return file;
  } catch (error) {
    console.error('Error converting image URL to File object:', error);
    return null;
  }
}

defineExpose({
  open
});
</script>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
