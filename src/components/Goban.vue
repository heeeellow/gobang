<template>
  <div class="flex items-center justify-center w-full h-full bg-amber-100 rounded-2xl shadow-inner">
    <canvas ref="canvas" :width="size" :height="size" @click="handle"></canvas>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useGameStore } from '@/store/game'
const size=500, grid=15, cell=size/(grid+1)
const pieces = ref([]), canvas = ref(null), game = useGameStore()
function draw(){
  const ctx = canvas.value.getContext('2d')
  ctx.clearRect(0,0,size,size)
  ctx.fillStyle='#fcd34d33'; ctx.fillRect(0,0,size,size)
  ctx.strokeStyle='#555'
  for(let i=1;i<=grid;i++){ ctx.beginPath(); ctx.moveTo(cell,i*cell); ctx.lineTo(cell*grid,i*cell); ctx.stroke(); ctx.beginPath(); ctx.moveTo(i*cell,cell); ctx.lineTo(i*cell,cell*grid); ctx.stroke() }
  [4,8,12].forEach(i=>[4,8,12].forEach(j=>{ ctx.beginPath(); ctx.arc(i*cell,j*cell,2.5,0,2*Math.PI); ctx.fill() }))
  pieces.value.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x*cell,p.y*cell,cell*0.4,0,2*Math.PI); ctx.fillStyle=p.color==='black'?'#000':'#fff'; ctx.shadowColor='#0003'; ctx.shadowBlur=2; ctx.fill(); ctx.shadowBlur=0; ctx.stroke() })
}
function handle(e){
  if(!game.running){ alert('未开始'); return }
  const rect=canvas.value.getBoundingClientRect(), x=Math.round((e.clientX-rect.left)/cell), y=Math.round((e.clientY-rect.top)/cell)
  if(pieces.value.some(p=>p.x===x&&p.y===y)) return
  pieces.value.push({x,y,color:game.turn}); game.swap(); draw()
}
onMounted(draw)
</script>