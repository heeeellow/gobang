<template>
  <transition name="fade">
    <div v-if="showToast" class="toast">{{ toastMsg }}</div>
  </transition>
</template>

<script setup>
// 用 @ 别名（不需要写 .js，Vite 会自动补）
import { showToast, toastMsg } from '@/composables/useToast'
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity .3s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

.toast {
  @apply fixed bottom-8 left-1/2 transform -translate-x-1/2
         bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg;
  animation: fade-in-out 3s both;
}
</style>
