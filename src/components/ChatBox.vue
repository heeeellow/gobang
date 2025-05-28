<template>
  <div class="flex flex-col h-full bg-white rounded-2xl shadow p-4">
    <div class="flex-1 overflow-y-auto pr-1" ref="box">
      <p v-for="(m,i) in log" :key="i" class="text-sm mb-1"><strong>{{ m.user }}：</strong>{{ m.text }}</p>
    </div>
    <div class="flex gap-2 pt-2">
      <input v-model="text" @keyup.enter="send" placeholder="聊天..." class="border rounded w-full p-2 text-sm" />
      <button class="btn-primary" @click="send">发送</button>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick } from 'vue'
import { useUserStore } from '@/store/user'
const log = ref([]), text = ref(''), box = ref(null), user = useUserStore()
function send(){ if(!text.value) return; log.value.push({ user: user.username, text: text.value }); text.value=''; nextTick(()=> box.value.scrollTop = box.value.scrollHeight) }
</script>