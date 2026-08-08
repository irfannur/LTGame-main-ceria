<!-- src/components/StarCounter.vue -->
<template>
  <div class="bg-white/90 backdrop-blur border-4 border-yellow-300 rounded-2xl p-2 px-4 shadow-md flex items-center gap-2 font-kid">
    <span class="text-3xl animate-spin-slow">⭐</span>
    <!-- Diubah dari store.starsEarned menjadi store.totalStars -->
    <span class="text-2xl font-black text-yellow-600">{{ store.totalStars }}</span>
  </div>
</template>

<script setup>
import { useGameStore } from '../../stores/color-pop/gameStore';
const store = useGameStore();
</script>