<template>
  <main class="card">
    <h2 class="text-2xl font-semibold">欢迎，{{ user.username }}</h2>
    <button class="btn-primary w-full" @click="quickStart">快速开始</button>
    <p class="text-gray-400 text-sm">(本地演示自动进入房间 #1)</p>
  </main>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
const router = useRouter(), user = useUserStore()
function quickStart() { router.push('/room/1') }
</script>
