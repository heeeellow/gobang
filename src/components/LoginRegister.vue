<template>
  <main class="card">
    <h1 class="text-3xl font-bold">五子棋 Demo</h1>
    <input v-model="name" placeholder="输入昵称" class="border rounded w-full p-3" />
    <button class="btn-primary w-full" @click="enter">进入大厅</button>
  </main>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
const name = ref(''), router = useRouter(), u = useUserStore()
function enter() { u.setUsername(name.value || '匿名'); router.push('/lobby') }
</script>