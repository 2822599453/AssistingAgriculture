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
          path: '/index/policy-news',
          component: () => import('@/views/index/PolicyNews.vue')
        },
        {
          path: '/news',
          component: () => import('@/views/news/News.vue')
        },
        {
          path: '/open-government',
          component: () => import('@/views/open-government/OpenGovernment.vue')
        },
        {
          path: '/travel-service/article',
          component: () => import('@/views/travel-service/TravelArticle.vue')
        },
        {
          path: '/work-service/farmer',
          component: () => import('@/views/work-service/Farmer.vue')
        },
        {
          path: '/government-data/statistics',
          component: () => import('@/views/government-data/Statistics.vue')
        },
        {
          path: '/government-data/economy',
          component: () => import('@/views/government-data/Economy.vue')
        },
        {
          path: '/government-data/population',
          component: () => import('@/views/government-data/Population.vue')
        },
        {
          path: '/government-data/city',
          component: () => import('@/views/government-data/City.vue')
        },
        {
          path: '/government-data/echart',
          component: () => import('@/views/government-data/Echart.vue')
        },
        {
          path: '/history',
          component: () => import('@/views/history/History.vue')
        },
        {
          path: '/three-agriculture',
          component: () => import('@/views/three-agriculture/ThreeAgriculture.vue')
        },
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
          path: '/department',
          component: () => import('@/views/department/Department.vue')
        },
        {
          path: '/article/category',
          component: () => import('@/views/article/ArticleCategory.vue')
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
