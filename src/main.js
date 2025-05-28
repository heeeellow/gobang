import { createApp } from 'vue'
import App    from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserStore } from '@/store/user'

import './styles/tailwind.css'
import './styles/theme.css'

const app = createApp(App).use(createPinia()).use(router)

/* 把本地 token 预写进 Pinia，便于 /auth/me 校验 */
const token = localStorage.getItem('token')
if (token) {
  const user = useUserStore()
  user.token = token
}

app.mount('#app')
