<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 overflow-y-auto space-y-2 p-2">
      <p v-for="(m,i) in log" :key="i"
         :class="m.self?'text-right text-primary-TO':'text-left'">
        {{ m.text }}
      </p>
    </div>
    <form @submit.prevent="send" class="flex gap-2">
      <input v-model="txt" class="flex-1 rounded-xl border p-2 dark:bg-slate-900/30 dark:border-slate-600" />
      <button class="btn-secondary !px-4 !py-1">发</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ log:Array })
const emits = defineEmits(['send'])

const txt = ref('')
function send(){
  if(!txt.value) return
  emits('send', txt.value)
  txt.value = ''
}
</script>
