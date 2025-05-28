import { ref, onUnmounted } from 'vue'
import { useUserStore } from '@/store'
export function useWebSocket(roomId) {
  const msgs = ref([])
  const u = useUserStore()
  const proto = location.protocol === 'https:' ? 'wss' : 'ws'
  const ws = new WebSocket(`${proto}://${location.host}/ws/room/${roomId}`)
  ws.addEventListener('open', () => ws.send(JSON.stringify({ action: 'auth', token: u.token })))
  ws.addEventListener('message', e => msgs.value.push(JSON.parse(e.data)))
  onUnmounted(() => ws.close())
  const send = obj => ws.readyState === 1 && ws.send(JSON.stringify(obj))
  return { msgs, send }
}