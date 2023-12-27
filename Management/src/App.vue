<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
    
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const router = useRouter();
const route = useRoute();
</script>

<style scoped></style>
