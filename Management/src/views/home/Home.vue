<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu :default-active="$route.path" router unique-opened>
        <!-- <el-menu-item index="/article/channel">
          <el-icon> <Management /> </el-icon>
          <span>文章分类 no</span>
        </el-menu-item>

        <el-menu-item index="/article/manage">
          <el-icon> <Promotion /> </el-icon>
          <span>文章管理</span>
        </el-menu-item> -->
        <el-menu-item index="/user/manage">
          <el-icon> <Management /> </el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/article/category">
          <el-icon> <Management /> </el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon> <UserFilled /> </el-icon>
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
        <!-- <el-menu-item>
          <el-icon> <Management /> </el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="/aaa">
          <template #title>
            <el-icon> <UserFilled /> </el-icon>
            <span>动态</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon> <User /> </el-icon>
            <span>政策动态</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon> <Crop /> </el-icon>
            <span>地方新闻</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon> <EditPen /> </el-icon>
            <span>旅游活动</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/bbb">
          <template #title>
            <el-icon> <UserFilled /> </el-icon>
            <span>政务公开</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon> <User /> </el-icon>
            <span>补贴政策</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon> <Crop /> </el-icon>
            <span>政策解读</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon> <EditPen /> </el-icon>
            <span>补贴公示</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/ccc">
          <template #title>
            <el-icon> <UserFilled /> </el-icon>
            <span>办事服务</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon> <User /> </el-icon>
            <span>店铺审核</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon> <Crop /> </el-icon>
            <span>商户补贴</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/ddd">
          <template #title>
            <el-icon> <UserFilled /> </el-icon>
            <span>政府数据</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon> <User /> </el-icon>
            <span>统计分析</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon> <Crop /> </el-icon>
            <span>经济发展</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon> <Crop /> </el-icon>
            <span>人口就业</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon> <Crop /> </el-icon>
            <span>城市规划</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/eee">
          <template #title>
            <el-icon> <UserFilled /> </el-icon>
            <span>历史沿革</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon> <User /> </el-icon>
            <span>红色事迹</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon> <Crop /> </el-icon>
            <span>历史变迁</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/fff">
          <template #title>
            <el-icon> <UserFilled /> </el-icon>
            <span>三农服务</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon> <User /> </el-icon>
            <span>农资市场价格</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon> <Crop /> </el-icon>
            <span>农业科技服务</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon> <Crop /> </el-icon>
            <span>农产品供求</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon> <Crop /> </el-icon>
            <span>城市规划</span>
          </el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          你好，<strong>{{ userStore.userInfo.nickname || userStore.userInfo.username }}</strong>
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
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue';
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
    transition: all .5s;
  }
  .fade-enter-active {
    transition: all .5s ease .5s;
  }
  .fade-enter-from {
    transform: translate(-30px);
    opacity: 0;
  }
  .fade-leave-to {
    transform: translate(30px);
    opacity: 0;
  }
  .el-aside {
    background-color: #fff;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
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
