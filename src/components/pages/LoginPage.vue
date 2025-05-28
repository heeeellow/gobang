<template>
  <AppShell>
    <div class="card w-[340px] space-y-8">
      <!-- 标签 -->
      <div class="bg-gray-100 rounded-full p-1 flex">
        <button :class="[tab==='login'?active:ghost]" @click="tab='login'">登录</button>
        <button :class="[tab==='reg'?active:ghost]" @click="tab='reg'">注册</button>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <input v-model="u" class="input" placeholder="用户名" required/>
        <input v-model="p" type="password" class="input" placeholder="密码" required/>
        <button :class="tab==='login'?'btn btn-primary':'btn btn-secondary'">
          {{ tab==='login'?'立即登录':'立即注册' }}
        </button>
      </form>
    </div>
  </AppShell>
</template>

<script setup>
import { ref } from 'vue'; import { useRouter } from 'vue-router'
import api from '@/utils/api'; import { useUserStore } from '@/store/user'
import AppShell from '@/components/layout/AppShell.vue'

const tab = ref('login'); const u = ref(''); const p = ref('')
const router = useRouter(); const user = useUserStore()

async function submit(){
  const path = tab.value==='login'?'/login':'/register'
  const { data } = await api.post(path,{ username:u.value, password:p.value })
  user.set(data.username,data.token); router.push('/lobby')
}

const active='flex-1 text-center py-2 text-sm font-semibold rounded-full bg-white shadow'
const ghost ='flex-1 text-center py-2 text-sm font-medium text-gray-500'
</script>
