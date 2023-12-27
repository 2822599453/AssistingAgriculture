import { defineStore } from 'pinia'
import { userGetInfoService } from '@/api/user'
import {ref} from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    
    const userInfo = ref({})
    const setUserInfo = (data) => {
      userInfo.value = data
    }
    const getUserInfo = async () => {
      const res = await userGetInfoService() // 请求获取数据
      userInfo.value = res.data.data
    }
    return {
      token,
      setToken,
      userInfo,
      setUserInfo,
      getUserInfo
    }
  },
  {
    persist: true
  }
)
