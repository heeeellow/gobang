// src/composables/useToast.js
import { ref } from 'vue'

// 响应式状态
export const showToast = ref(false)
export const toastMsg  = ref('')

// 导出 useToast 函数
export function useToast() {
  return (m) => {
    toastMsg.value = m
    showToast.value = true
    setTimeout(() => (showToast.value = false), 3000)
  }
}
