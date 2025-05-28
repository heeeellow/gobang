<template>
  <canvas ref="canvas" class="rounded-3xl shadow-inner" :width="size" :height="size" @click="click"/>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'

const props = defineProps({ pieces: Array }) // 外部传入棋子
const emits = defineEmits(['place'])         // 发出落子事件
const canvas = ref(null)
const size = 600
const grid = 15
const cell = size / (grid+1)

let ctx
onMounted(() => {
  ctx = canvas.value.getContext('2d')
  drawBoard()
  watch(() => props.pieces.length, drawAll)
}, { flush:'post' })

function drawBoard(){
  ctx.fillStyle = '#f9e6b3'
  ctx.fillRect(0,0,size,size)
  ctx.strokeStyle = '#0003'
  for(let i=1;i<=grid;i++){
    const p = i*cell
    ctx.beginPath(); ctx.moveTo(cell, p); ctx.lineTo(size-cell, p); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(p, cell); ctx.lineTo(p, size-cell); ctx.stroke()
  }
}

function drawAll(){
  drawBoard()
  for (const {x,y,color} of props.pieces){
    ctx.beginPath()
    ctx.arc((x+1)*cell, (y+1)*cell, cell*0.45, 0, Math.PI*2)
    ctx.fillStyle = color==='black'?'#2d2d2d':'#f5f5f5'
    ctx.shadowColor = '#0006'
    ctx.shadowBlur = 4
    ctx.fill(); ctx.shadowBlur =0
  }
}

function click(e){
  const rect = canvas.value.getBoundingClientRect()
  const x = Math.round((e.clientX-rect.left)/cell)-1
  const y = Math.round((e.clientY-rect.top)/cell)-1
  // 越界/已有子过滤
  if(x<0||x>=grid||y<0||y>=grid||props.pieces.some(p=>p.x===x&&p.y===y)) return
  emits('place', {x,y})
}
</script>
