<template>
  <Transition appear>
    <Dialog :open="open" @close="$emit('close',false)" class="fixed inset-0 z-50 flex items-center justify-center">
      <DialogOverlay class="absolute inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="card relative w-[340px] space-y-6">
        <slot/>
      </div>
    </Dialog>
  </Transition>
</template>

<script setup>
import { Dialog, DialogOverlay } from '@headlessui/vue'
defineProps({ open:Boolean })
</script>
