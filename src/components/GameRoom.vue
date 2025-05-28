<template>
  <main class="card max-w-4xl gap-4 w-full">
    <h2 class="text-xl font-bold">房间 {{ roomId }}</h2>
    <div v-if="!game.running" class="flex flex-col items-center gap-2">
      <p class="text-gray-500">等待双方准备...</p>
      <button class="btn-secondary" @click="ready">{{ game.readySelf ? '取消准备' : '我已准备' }}</button>
    </div>

    <div v-else class="flex flex-col items-center gap-2 w-full">
      <div class="flex gap-6 text-lg font-semibold">
        <span>时间：{{ mm }}:{{ ss }}</span>
        <span>轮到：<span :class="turnClass">{{ game.turn==='black'?'黑':'白' }}</span></span>
      </div>
      <div class="flex flex-col md:flex-row gap-4 w-full h-[540px]">
        <Goban class="flex-1" />
        <ChatBox class="md:w-72" />
      </div>
      <div class="flex gap-4">
        <button class="btn-danger" @click="giveUp">认输</button>
        <button class="btn bg-gray-400" @click="finish">结束</button>
      </div>
    </div>
  </main>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Goban from './Goban.vue'
import ChatBox from './ChatBox.vue'
import { useGameStore } from '@/store/game'
const roomId = useRoute().params.id, router = useRouter(), game = useGameStore()
const mm = computed(()=>String(Math.floor(game.time/60)).padStart(2,'0'))
const ss = computed(()=>String(game.time%60).padStart(2,'0'))
const turnClass = computed(()=> game.turn==='black' ? 'text-black' : 'text-white bg-black px-2 rounded')
function ready() { game.toggleReadySelf() }
function giveUp() { alert('你已认输'); game.stop() }
function finish(){ game.stop(); router.push('/lobby') }
onMounted(()=> game.mockPeerReady())
</script>