<template>
  <div class="absolute inset-0 overflow-hidden transition-colors duration-1000 select-none z-0" :class="bgClass">
    <!-- Tema Awan / Langit (Default & Silhouette & Counting) -->
    <div v-if="type === 'sky' || type === 'silhouette' || type === 'counting' || type === 'sound' || type === 'color' || type === 'function'" class="absolute inset-0">
      <div class="absolute top-10 left-[10%] w-20 h-8 bg-white/70 rounded-full blur-[1px] animate-float"></div>
      <div class="absolute top-24 right-[15%] w-28 h-10 bg-white/60 rounded-full blur-[1px] animate-float" style="animation-delay: 1.5s;"></div>
    </div>
    
    <!-- Tema Rel Kereta -->
    <div v-if="type === 'rail'" class="absolute bottom-0 w-full h-24 bg-zinc-700 border-t-8 border-amber-800 flex items-center">
      <div class="w-full h-3 bg-zinc-400 flex justify-between px-2">
        <div v-for="i in 20" :key="i" class="w-2 h-8 bg-amber-900 -mt-2.5"></div>
      </div>
    </div>

    <!-- Tema Air / Laut -->
    <div v-if="type === 'sea'" class="absolute bottom-0 w-full h-32 bg-sky-600/90 border-t-4 border-sky-400">
      <div class="absolute inset-x-0 top-2 h-4 bg-sky-500/50 animate-pulse"></div>
      <span class="absolute bottom-4 left-10 text-4xl opacity-30">🐟</span>
      <span class="absolute bottom-8 right-16 text-4xl opacity-30">🐳</span>
    </div>

    <!-- Tema Luar Angkasa -->
    <div v-if="type === 'space'" class="absolute inset-0 bg-slate-950 flex flex-wrap p-10 justify-around gap-12">
      <div v-for="i in 15" :key="i" class="w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse" :style="`animation-duration: ${1 + i%2}s`"></div>
      <div class="absolute top-12 right-12 w-16 h-16 bg-amber-100 rounded-full shadow-[0_0_20px_#fef08a]"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  type: { type: String, default: 'sky' }
});

const bgClass = computed(() => {
  switch (props.type) {
    case 'rail': return 'bg-emerald-100';
    case 'sea': return 'bg-cyan-100';
    case 'space': return 'bg-slate-900';
    default: return 'bg-gradient-to-b from-sky-300 to-sky-100';
  }
});
</script>