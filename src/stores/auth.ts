// Extremely insecure, do not copy
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const storedPassword = ref<string>('')

    const isAdmin = computed(() => {
      return storedPassword.value === import.meta.env.VITE_MAGIC_WORD
    })

    function setPassword(password: string) {
      storedPassword.value = password
    }

    return {
      isAdmin,
      setPassword,
      storedPassword
    }
  },
  {
    persist: true
  }
)
