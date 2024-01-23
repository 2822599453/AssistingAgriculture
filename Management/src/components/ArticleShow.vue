<template>
  <el-drawer v-model="visibleDrawer" title="文章详情" direction="rtl" size="50%">
    <!-- 发表文章表单 -->
    <div class="container">
      <div class="title">文章标题</div>
      <div>{{ formData.title }}</div>
    </div>
    <div class="container">
      <div class="title">文章分类</div>
      <div>{{ formData.category_name }}</div>
    </div>
    <div class="container">
      <div class="title">文章封面</div>
      <el-image
        style="width: 200px; height: 200px"
        :src="formData.cover"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :initial-index="4"
        :preview-src-list="srcList"
        fit="cover"
      />
    </div>
    <div class="container">
      <div class="title">文章内容</div>
      <div v-html="formData.content"></div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import {  getArticleDetailService } from '@/api/article';

const visibleDrawer = ref(false);

// 准备数据
const formData = ref({});

// 图片上传相关逻辑
const srcList = ref(['http://127.0.0.1:3000/article_uploads/1705892012353-kabi.jpeg']);

const open = async (row) => {
  visibleDrawer.value = true;
  const res = await getArticleDetailService(row.id);
  formData.value = res.data.data;
  console.log(formData.value);
};

defineExpose({
  open
});
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 10px;
  .title {
    padding-bottom: 5px;
    font-weight: bold;
  }
}
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
