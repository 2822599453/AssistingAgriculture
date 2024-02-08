<template>
  <div class="personal-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-avatar :size="100" :src="userInfo.avatar" />
          <div>
            <h3>{{ userInfo.fullname }}</h3>
            <h3>{{ userInfo.role === '1' ? '管理员' : '普通用户' }}</h3>
          </div>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 6px"><user /></el-icon>
              用户名
            </div>
          </template>
          {{ userInfo.username }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 6px"><iphone /></el-icon>
              电话
            </div>
          </template>
          {{ userInfo.phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 6px"><tickets /></el-icon>
              性别
            </div>
          </template>
          <el-tag :type="userInfo.gender === '0' ? '' : 'danger'">
            {{ userInfo.gender === '0' ? '男' : '女' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 6px"><office-building /></el-icon>
              职能部门
            </div>
          </template>
          {{ userInfo.department_name }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { Iphone, Location, OfficeBuilding, Tickets, User } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores';
const userStore = useUserStore();
const userInfo = ref({});
onMounted(() => {
  userInfo.value = userStore.userInfo;
});
</script>

<style lang="scss" scoped>
.personal-card {
  .card-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .box-card {
    width: 480px;
  }
  .cell-item {
    display: flex;
    align-items: center;
  }
}
</style>
