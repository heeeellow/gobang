<template>
  <div class="p-4 bg-white/90 rounded-xl shadow hover:shadow-md cursor-pointer">
    <div class="flex justify-between items-center">
      <p class="font-semibold">#{{ room.id }}</p>
      <svg v-if="room.lock" class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M12 17v.01M18 11H6a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2z"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    </div>
    <p class="text-xs text-gray-500 mt-1">玩家 {{ room.players }}/2 ｜ 15×15</p>
  </div>
</template>

<script setup>
defineProps({ room:Object })
</script>
