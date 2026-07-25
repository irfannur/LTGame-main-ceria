<template>
  <div class="w-screen h-screen flex flex-col bg-sky-100 font-kid overflow-hidden">
    <!-- Header Ringkas -->
    <header class="p-4 bg-white/80 backdrop-blur-md border-b-4 border-sky-300 flex items-center justify-between z-10">
      <button 
        @click="goHome"
        class="bg-amber-400 text-white font-black px-4 py-2 rounded-2xl border-b-4 border-amber-600 active:scale-95 transition"
      >
        ⬅️ KEMBALI
      </button>
      <h2 class="text-2xl font-black text-sky-600">PILIH LEVEL 🗺️</h2>
      <div class="text-amber-500 font-black text-lg">⭐ {{ store.totalStars }}</div>
    </header>

    <!-- Peta Grid Level -->
    <div class="flex-1 overflow-y-auto p-6 grid grid-cols-3 sm:grid-cols-5 gap-4 max-w-3xl mx-auto items-center">
      <button
        v-for="level in store.levels"
        :key="level.id"
        @click="playLevel(level.id)"
        class="relative flex flex-col items-center justify-center p-4 rounded-3xl border-b-8 font-black text-2xl shadow-lg transition transform active:scale-95"
        :class="[
          store.completedLevels.includes(level.id)
            ? 'bg-emerald-400 border-emerald-600 text-white'
            : 'bg-white border-sky-300 text-sky-600'
        ]"
      >
        <span>{{ level.id }}</span>
        <span class="text-xs font-bold mt-1">
          {{ store.completedLevels.includes(level.id) ? '⭐ Selesai' : 'Main' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/gameStore';
import { useAudio } from '../composables/useAudio';

const router = useRouter();
const store = useGameStore();
const { playSoundEffect } = useAudio();

const goHome = () => {
  playSoundEffect('click');
  router.push('/');
};

const playLevel = (id) => {
  playSoundEffect('click');
  store.selectLevel(id);
  router.push('/play');
};
</script>