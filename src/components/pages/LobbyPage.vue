import { useToast } from '@/composables/useToast'
const toast = useToast()
<template>
  <AppShell>
    <div class="flex gap-6 w-full max-w-[1200px]">
      <!-- 左：房间列表区 -->
      <section class="flex-1 space-y-6">
        <h2 class="text-3xl font-bold text-center text-violet-600">游戏大厅</h2>

        <!-- 统计栏 -->
        <div class="flex justify-around text-sm text-gray-600">
          <span>在线用户 {{ onlineTotal }}</span>
          <span>房间数 {{ totalRooms }}</span>
        </div>

        <!-- 房间列表 / 空状态  -->
        <template v-if="rooms.length">
          <div ref="scroller" class="scroll-y grid lg:grid-cols-2 gap-3 max-h-[460px]">
            <RoomCard v-for="r in rooms" :key="r.id" :room="r" @click="join(r)"/>
          </div>
        </template>
        <template v-else>
          <!-- 空状态插画 -->
          <div class="flex flex-col items-center gap-6 pt-10">
            <svg class="w-40 h-40 opacity-70" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="#f3f4f6"/>
              <path d="M30 55h40M50 35v20" stroke="#d1d5db" stroke-width="6" stroke-linecap="round"/>
            </svg>
            <button class="btn btn-primary w-48" @click="openCreate=true">首个房间由你开启</button>
          </div>
        </template>

        <button class="btn btn-primary text-lg" @click="openCreate=true">创建房间</button>
      </section>

      <!-- 右：在线用户侧栏 -->
      <UsersSidebar :users="onlineUsers"/>

      <!-- 创建房间 Dialog -->
      <GlassDialog :open="openCreate" @close="openCreate=false">
        <template #default>
          <h3 class="text-xl font-semibold text-center">创建房间</h3>
          <input v-model="newId" type="number" placeholder="房号(1000-9999)" class="input"/>
          <input v-model="pwd" placeholder="密码(可留空)" class="input mt-2"/>
          <button class="btn btn-primary mt-4" @click="create">创建并进入</button>
        </template>
      </GlassDialog>

      <!-- 输入密码 Dialog -->
      <GlassDialog :open="openPwd" @close="openPwd=false">
        <h3 class="text-xl font-semibold text-center">房间需要密码</h3>
        <input v-model="pwdInput" type="password" class="input"/>
        <button class="btn btn-primary mt-4" @click="confirmPwd">加入房间</button>
      </GlassDialog>

      <!-- Toast -->
      <Toast/>
    </div>
  </AppShell>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/api'

import Toast from '@/components/ui/Toast.vue'        
import { useToast } from '@/composables/useToast.js' 

import AppShell      from '@/components/layout/AppShell.vue'
import UsersSidebar  from '@/components/ui/UsersSidebar.vue'
import GlassDialog   from '@/components/ui/GlassDialog.vue'
import RoomCard      from '@/components/ui/RoomCard.vue'

/* 状态 */
const rooms = ref([]); let page=1; const pageSize=20
const totalRooms = ref(0); const onlineTotal = ref(0); const onlineUsers = ref([])
const router = useRouter(); const toast = useToast()

/* 获取第一页 */
// LobbyPage.vue
async function fetchPage(){
  const { data } = await api.get('/rooms', { params:{ page, size:20 } }) // TODO: GET /rooms
  rooms.value.push(...data.list)
  totalRooms.value = data.total
  onlineTotal.value = data.users
  onlineUsers.value = data.onlineList          // 侧栏
}

onMounted(fetchPage)

/* 无限滚动 */
const scroller = ref()
onMounted(()=>{
  const io = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting && rooms.value.length<totalRooms.value){
      page++; fetchPage()
    }
  },{ root: scroller.value, threshold:1 })
  io.observe(scroller.value)
})

/* 创建房间 */
const openCreate = ref(false); const newId = ref(''); const pwd = ref('')
async function create(){
  try{
    const id = newId.value || Math.floor(1000+Math.random()*9000)
await api.post('/rooms', { id, password: pwd.value })   // TODO: POST /rooms
router.push(`/room/${id}`)

  }catch(e){ toast('创建失败') }
}

/* 加入房间逻辑 */
const openPwd = ref(false); const targetRoom = ref(null); const pwdInput = ref('')
function join(r){
  if(r.lock){ targetRoom.value=r; openPwd.value=true }
  else router.push({path:`/room/${r.id}`, query:{demo:1}})
}
async function confirmPwd(){
  try{
await api.post(`/rooms/${targetRoom.value.id}/join`, { password: pwdInput.value }) // TODO
router.push(`/room/${targetRoom.value.id}`)

  }catch(e){ toast('密码错误'); pwdInput.value='' }
}
</script>
