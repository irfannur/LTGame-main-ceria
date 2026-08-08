<template>
  <div class="w-full bg-slate-200 rounded-full h-4 shadow-inner border border-white">
    <div 
      class="bg-gradient-to-r from-emerald-400 to-green-500 h-full rounded-full transition-all duration-500 shadow"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  progress: { type: Number, required: true }
});
</script>