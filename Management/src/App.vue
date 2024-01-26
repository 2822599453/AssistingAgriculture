<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
    
  </div>
</template>
<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

</script>

<style>
.el-table tr {
  height: 60px;
}
</style>
