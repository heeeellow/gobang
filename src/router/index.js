import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'
import api from '@/utils/api'

/* 懒加载页面组件 */
const Login = () => import('@/components/pages/LoginPage.vue')
const Lobby = () => import('@/components/pages/LobbyPage.vue')
const Room  = () => import('@/components/pages/RoomPage.vue')

/* ① 先创建路由实例 */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/lobby', component: Lobby },
    { path: '/room/:id', component: Room, props: true }
  ]
})

/* ② 挂导航守卫（正式后端接口占位） */
router.beforeEach(async (to, from, next) => {
 const user = useUserStore()

  if (!user.checked) {
    if (user.token) {
      try {
        const { data } = await api.get('/auth/me')    // TODO: 后端实现
        user.username = data.username                 // ✓ 成功
      } catch {
        user.clear()                                  // ✗ 失败 → 清 token
      }
    }
    user.checked = true
  }

  if (!user.isAuthed && to.path !== '/login') return next('/login')
  if ( user.isAuthed && to.path === '/login')  return next('/lobby')
  next()
})

/* ③ 只导出一次 */
export default router
