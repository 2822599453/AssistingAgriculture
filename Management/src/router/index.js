import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/',
      component: () => import('@/views/home/Home.vue'),
      redirect: '/user/manage',
      children: [
        {
          path: '/user/manage',
          component: () => import('@/views/user/UserManagement.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        },
        {
          path: '/article/category',
          component: () => import('@/views/article/ArticleCategory.vue')
        },
        {
          path: '/three-agriculture',
          component: () => import('@/views/three-agriculture/ThreeAgriculture.vue')
        },
        {
          path: '/three-agriculture/market-price',
          component: () => import('@/views/three-agriculture/MarketPrice.vue')
        },
        {
          path: '/three-agriculture/product-demands',
          component: () => import('@/views/three-agriculture/ProductDemands.vue')
        },
        {
          path: '/three-agriculture/technology-service',
          component: () => import('@/views/three-agriculture/TechnologyService.vue')
        },
      ]
    }
  ]
})

// 登录访问拦截 vue3语法有改变
router.beforeEach((to, from) => {
  // 无token且不是登录页则拦截
  const userStore = useUserStore()
  if(!userStore.token && to.path !== '/login') return '/login'
  return true
})

export default router
