<template>
  <header class="w-full flex items-center justify-between px-4 py-2 bg-white/80 backdrop-blur-md border-b-4 border-sky-300 shadow-sm z-30">
    <button 
      @click="$emit('open-menu')"
      class="bg-amber-400 hover:bg-amber-500 text-white font-black text-lg px-4 py-2 rounded-2xl border-b-4 border-amber-600 active:scale-95 transition flex items-center gap-1 shadow"
    >
      <span>🏡</span>
      <span class="hidden sm:inline">Menu</span>
    </button>

    <!-- Score & Bintang -->
    <div class="flex items-center gap-2 bg-amber-100 border-2 border-amber-300 px-4 py-1.5 rounded-full shadow-inner">
      <span class="text-2xl animate-bounce">⭐</span>
      <span class="text-amber-700 font-black text-xl tracking-wider">{{ store.totalStars }}</span>
    </div>

    <!-- Tombol Pengaturan -->
    <button 
      @click="$emit('open-settings')"
      class="bg-sky-400 hover:bg-sky-500 text-white font-black text-xl p-2.5 rounded-2xl border-b-4 border-sky-600 active:scale-95 transition shadow"
    >
      ⚙️
    </button>
  </header>
</template>

<script setup>
import { useShapeStore } from '../../stores/shape-matcher/gameStore';
const store = useShapeStore();
defineEmits(['open-menu', 'open-settings']);
</script>