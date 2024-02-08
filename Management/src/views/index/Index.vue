<template>
  <div class="index">
    <personal-card></personal-card>
    <clock></clock>
  </div>
  <!-- <page-container >
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>

  </page-container> -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import PersonalCard from './components/PersonalCard.vue'
import Clock from './components/Clock.vue'
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
}
</style>
