<template>
  <page-container title="更换头像">
    <el-upload
      ref="uploadRef"
      :auto-upload="false"
      class="avatar-uploader"
      :show-file-list="false"
      :on-change="onSelectFile"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

    <br />

    <el-button
      @click="uploadRef.$el.querySelector('input').click()"
      type="primary"
      :icon="Plus"
      size="large"
      >选择图片</el-button
    >
    <el-button @click="onUpdateAvatar" type="success" :icon="Upload" size="large"
      >上传头像</el-button
    >
  </page-container>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { Plus, Upload } from '@element-plus/icons-vue';
  import { useUserStore } from '@/stores';
  import {  updateUserAvatarService, getUserInfoService } from '@/api/user';
  const userStore = useUserStore();
  const imgUrl = ref(userStore.userInfo.avatar);
  console.log(userStore.userInfo);
  const uploadRef = ref();
  const imgFile = reactive({
    id: userStore.userInfo.id,
    rawFile: null
  });
  const onSelectFile = (uploadFile) => {
    console.log(uploadFile);
    // 区别：https://blog.csdn.net/weixin_58016047/article/details/122146647?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522170506840816800184114911%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=170506840816800184114911&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-7-122146647-null-null.142^v99^pc_search_result_base2&utm_term=js%20FileReader%E5%92%8CcreateObjectURL&spm=1018.2226.3001.4187
    // 1. 基于 FileReader 读取图片做预览
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile.raw);
    imgFile.rawFile = uploadFile.raw;
    reader.onload = (res) => {
      imgUrl.value = reader.result;
    };
    // 2.createObjectURL API
    // imgUrl.value = URL.createObjectURL(uploadFile.raw)
  };

  const onUpdateAvatar = async () => {
    const formData = new FormData();
    for (let i in imgFile) {
      formData.append(i, imgFile[i]);
    }
    
    await updateUserAvatarService(formData);
    await getUserInfoService();
    // 发送请求更新头像
    // await userUpdateAvatarService(imgUrl.value)
    // userStore 重新渲染
    // await userStore.getUserInfo()
    // 提示用户
    ElMessage.success('头像更新成功')
  };
</script>

<style lang="scss" scoped>
  .avatar-uploader {
    :deep() {
      .avatar {
        width: 278px;
        height: 278px;
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
        width: 278px;
        height: 278px;
        text-align: center;
      }
    }
  }
</style>
