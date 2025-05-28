<template>
  <AppShell>
    <div class="glass flex flex-col md:flex-row gap-6 w-[min(100%,900px)]">
      <!-- 棋盘区域 -->
      <Goban class="flex-1" :pieces="game.pieces" @place="place"/>

      <!-- 侧栏 -->
      <div class="flex flex-col gap-4 w-full md:w-64">
        <div class="text-center space-y-1">
          <p class="text-lg font-semibold">房间 #{{ id }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ game.isMyTurn ? '轮到你' : '等待对手' }}
          </p>
          <p v-if="game.startTime" class="text-xs text-gray-500">
            已用时 {{ elapsed }} s
          </p>
        </div>

        <button
          v-if="!game.ready"
          class="btn-primary"
          @click="ready">
          {{ readyLabel }}
        </button>

        <button
          v-else
          class="btn-danger"
          @click="resign">
          认输
        </button>

        <ChatBox class="flex-1" :log="log" @send="sendChat"/>
      </div>
    </div>
  </AppShell>
</template>

<script setup>
import { computed, ref, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '@/store/game'
import { createWS } from '@/utils/ws'
import Goban from '@/components/ui/Goban.vue'
import ChatBox from '@/components/ui/ChatBox.vue'

const { id } = useRoute().params
const router = useRouter()
const game = useGameStore()
const log = ref([])

// RoomPage.vue
const ws = new WebSocket(`${location.protocol==='https:'?'wss':'ws'}://${location.host}/ws/room/${id}`)

/* 后端约定：
   ➜ 客户端 send            ➜ 服务端 broadcast
   {action:'ready',ready:t}   {action:'ready',user,ready}
   {action:'move',x,y}        {action:'move',x,y,color}
   {action:'chat',text}       {action:'chat',user,text}
   {action:'resign'}          {action:'result',winner,reason}
*/

onBeforeUnmount(ws.close)

const elapsed = computed(() =>
  game.startTime ? Math.floor((Date.now()-game.startTime)/1000) : 0)

const readyLabel = computed(() => game.ready ? '取消准备' : '准备')

function ready(){
  game.ready = !game.ready
  ws.send({ action: 'ready', ready: game.ready })
}

function place(pos){
  if (!game.isMyTurn) return
  ws.send({ action:'move', ...pos })
}

function sendChat(text){
  ws.send({ action:'chat', text })
  log.value.push({ self:true, text })
}

function resign(){
  ws.send({ action:'resign' })
}

function handleMsg(msg){
  switch(msg.action){
    case 'ready':                 // 对手准备/取消
      // 更新 Ready UI 逻辑
      break
    case 'start':
      game.startTime = Date.now()
      game.isMyTurn = msg.first     // 后端告知先手
      break
    case 'move':
      game.pieces.push(msg)
      game.isMyTurn = !game.isMyTurn
      break
    case 'chat':
      log.value.push({ self:false, text: msg.text })
      break
    case 'result':
      alert(msg.reason==='resign'?'对手认输':'你输了')
      router.push('/lobby')
      break
  }
}
</script>
