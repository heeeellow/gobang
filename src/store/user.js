import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    token: '',
    checked: false      // 首次加载后设置 true
  }),
  getters: {
    isAuthed: s => !!s.token
  },
  actions: {
    set (username, token) {
      this.username = username
      this.token    = token
      localStorage.setItem('token', token)
    },
    clear () {
      this.username = ''
      this.token    = ''
      localStorage.removeItem('token')
    }
  }
})
