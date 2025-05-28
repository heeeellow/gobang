import { createRouter, createWebHistory } from 'vue-router'
import LoginRegister from '@/components/LoginRegister.vue'
import Lobby from '@/components/Lobby.vue'
import GameRoom from '@/components/GameRoom.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginRegister },
    { path: '/lobby', component: Lobby },
    { path: '/room/:id', component: GameRoom, props: true }
  ]
})