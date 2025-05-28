import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const username = ref('')
  function setUser(t, u) {
    token.value = t
    username.value = u
  }
  return { token, username, setUser }
})