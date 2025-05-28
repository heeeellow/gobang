import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const username = ref('访客')
  function setUsername(n) { username.value = n }
  return { username, setUsername }
})