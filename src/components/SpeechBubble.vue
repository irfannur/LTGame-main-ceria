<template>
  <div class="relative bg-white border-4 border-sky-400 rounded-2xl p-3 shadow-lg max-w-xs text-center animate-fade-in">
    <p class="text-slate-800 font-bold text-sm sm:text-base leading-tight">
      {{ text }}
    </p>
    <!-- Segitiga Balon Percakapan -->
    <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-sky-400"></div>
    <div class="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white"></div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Ayo main!'
  }
});
</script>