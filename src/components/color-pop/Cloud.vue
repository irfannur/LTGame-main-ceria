<!-- src/components/Cloud.vue -->
<template>
  <div 
    class="absolute bg-white/80 rounded-full blur-[1px] shadow-sm pointer-events-none cloud-element"
    :style="{
      top: `${top}%`,
      width: '120px',
      height: '45px',
      animationDelay: `${delay}s`,
      animationDuration: `${speed}s`
    }"
  >
    <div class="absolute -top-6 left-4 w-14 h-14 bg-white/80 rounded-full"></div>
    <div class="absolute -top-4 right-5 w-12 h-12 bg-white/80 rounded-full"></div>
  </div>
</template>

<script setup>
defineProps({ top: Number, speed: Number, delay: Number });
</script>

<style scoped>
.cloud-element {
  left: -150px;
  animation: floatHorizontal linear infinite;
}

@keyframes floatHorizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(100vw + 200px));
  }
}
</style>