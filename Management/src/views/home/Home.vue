<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="aside">
      <div class="el-aside__logo"></div>
      <el-menu :default-active="$route.path" router unique-opened>
        <el-sub-menu index="/index">
          <template #title>
            <el-icon size="19"> <HomeFilled /> </el-icon>
            <span>首页</span>
          </template>
          <el-menu-item index="/index/policy-news">
            <el-icon>
              <User />
            </el-icon>
            <span>政策要闻</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/news">
          <el-icon> <el-image :src="news" fit="contain"></el-image> </el-icon>
          <span>新闻动态</span>
        </el-menu-item>
        <el-menu-item index="/open-government">
          <el-icon> <el-image :src="opengovernment" fit="contain"></el-image> </el-icon>
          <span>政务公开</span>
        </el-menu-item>
        <el-sub-menu index="/travel-service">
          <template #title>
            <el-icon> <el-image :src="travel" fit="contain"></el-image> </el-icon>
            <span>醉游侗寨</span>
          </template>
          <el-menu-item index="/travel-service/article">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/work-service">
          <template #title>
            <el-icon> <el-image :src="workservice" fit="contain"></el-image> </el-icon>
            <span>办事服务</span>
          </template>
          <el-menu-item index="/work-service/farmer">
            <el-icon>
              <User />
            </el-icon>
            <span>农户基本资料</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/government-data">
          <template #title>
            <el-icon> <el-image :src="governmentdata" fit="contain"></el-image> </el-icon>
            <span>政府数据</span>
          </template>
          <el-menu-item index="/government-data/statistics">
            <el-icon> <User /> </el-icon>
            <span>统计分析</span>
          </el-menu-item>
          <el-menu-item index="/government-data/economy">
            <el-icon> <Crop /> </el-icon>
            <span>经济发展</span>
          </el-menu-item>
          <el-menu-item index="/government-data/population">
            <el-icon> <Crop /> </el-icon>
            <span>人口就业</span>
          </el-menu-item>
          <el-menu-item index="/government-data/city">
            <el-icon> <Crop /> </el-icon>
            <span>城市规划</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/history">
          <el-icon> <el-image :src="history" fit="contain"></el-image> </el-icon>
          <span>历史沿革</span>
        </el-menu-item>
        <el-menu-item index="/three-agriculture">
          <el-icon> <el-image :src="threeagriculture" fit="contain"></el-image> </el-icon>
          <span>三农服务</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon size="19"> <UserFilled /> </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/department">
          <el-icon> <el-image :src="department" fit="contain"></el-image> </el-icon>
          <span>职能部门</span>
        </el-menu-item>
        <el-menu-item index="/user/manage">
          <el-icon> <el-image :src="usermanage" fit="contain"></el-image> </el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/article/category">
          <el-icon> <el-image :src="category" fit="contain"></el-image> </el-icon>
          <span>文章分类</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          你好，<strong>{{ userStore.userInfo.fullname || userStore.userInfo.username }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.userInfo.avatar || avatar" />
            <el-icon> <CaretBottom /> </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <Transition name="fade">
            <component :is="Component" />
          </Transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import {
  Management,
  HomeFilled,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue';
import news from '@/assets/aside-icon/news.svg';
import opengovernment from '@/assets/aside-icon/opengovernment.svg';
import travel from '@/assets/aside-icon/travel.svg';
import governmentdata from '@/assets/aside-icon/governmentdata.svg';
import history from '@/assets/aside-icon/history.svg';
import department  from '@/assets/aside-icon/department.svg';
import usermanage  from '@/assets/aside-icon/usermanage.svg';
import category  from '@/assets/aside-icon/category.svg';
import threeagriculture  from '@/assets/aside-icon/threeagriculture.svg';
import workservice  from '@/assets/aside-icon/workservice.svg';

import avatar from '@/assets/default.png';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores';
import router from '@/router';

const userStore = useUserStore();

// 获取用户数据
onMounted(async () => {
  userStore.getUserInfo();
});

// 下拉菜单
const handleCommand = (key) => {
  if (key === 'logout') {
    // 退出操作
    ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
      router.push('/login');
      ElMessage.success('退出登录');
    });
  } else {
    router.push(`/user/${key}`);
  }
};
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter-active {
    transition: all 0.5s ease 0.5s;
  }
  .fade-enter-from {
    transform: translate(-30px);
    opacity: 0;
  }
  .fade-leave-to {
    transform: translate(30px);
    opacity: 0;
  }
  .aside::-webkit-scrollbar {
    padding-bottom: 50px;
    display: none; /* 隐藏滚动条 */
  }
  .el-aside {
    background-color: #fff;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-image {
      width: 18px;
      height: 18px;
    }
    .el-sub-menu .el-icon {
      color: #606266;
    }
    .el-menu {
      border-right: none;
    }
    :deep(.el-sub-menu .el-sub-menu__icon-arrow) {
      display: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
