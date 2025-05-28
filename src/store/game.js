import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useGameStore = defineStore('game', () => {
  const readySelf = ref(false)
  const readyPeer = ref(false)
  const running = ref(false)
  const turn = ref('black')
  const time = ref(0)
  let timer = null
  function toggleReadySelf() {
    readySelf.value = !readySelf.value
    if (readySelf.value && readyPeer.value) start()
  }
  function mockPeerReady() { // 本地演示：自动在 1s 后准备
    setTimeout(() => { readyPeer.value = true; if (readySelf.value) start() }, 1000)
  }
  function start() {
    running.value = true
    time.value = 0
    clearInterval(timer)
    timer = setInterval(() => time.value++, 1000)
  }
  function stop() { running.value = false; clearInterval(timer) }
  function swap() { turn.value = turn.value === 'black' ? 'white' : 'black' }
  return { readySelf, readyPeer, running, turn, time, toggleReadySelf, mockPeerReady, stop, swap }
})