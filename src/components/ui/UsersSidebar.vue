<template>
  <aside class="w-60 card space-y-3">
    <h3 class="font-semibold text-lg text-center">在线用户</h3>
    <div class="scroll-y max-h-72 space-y-2">
      <p v-for="u in users" :key="u" class="px-3 py-1 bg-gray-100 rounded-lg">{{ u }}</p>
    </div>
  </aside>
</template>

<script setup>
defineProps({ users:Array })
</script>
