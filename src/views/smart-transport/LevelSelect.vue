<template>
  <div class="h-dvh w-full p-6 flex flex-col justify-between font-kid relative select-none">
    <AnimatedBackground type="sky" />

    <!-- Header -->
    <div class="flex justify-between items-center z-10 flex-shrink-0">
      <button 
        @click="goBack" 
        class="bg-white text-slate-700 border-b-4 border-slate-300 w-10 h-10 font-black rounded-full flex items-center justify-center active:scale-90 transition shadow-sm text-sm"
      >
        ↩
      </button>
      <h2 class="text-2xl font-black text-sky-600 bg-white/80 px-4 py-1.5 rounded-full border border-sky-200 shadow-sm">PILIH LEVEL</h2>
      <div class="w-10"></div>
    </div>

    <!-- Grid Peta Level -->
    <div class="flex-1 overflow-y-auto z-10 my-4 py-2 px-1 flex justify-center items-center">
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full max-w-xl">
        <button 
          v-for="lvl in store.levels" 
          :key="lvl.id"
          @click="selectLevel(lvl.id)"
          :class="[
            isLevelUnlocked(lvl.id) 
              ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-orange-600 text-white shadow-md' 
              : 'bg-slate-200 border-slate-300 text-slate-400 grayscale',
            'relative border-b-8 rounded-3xl p-5 font-black text-3xl flex flex-col items-center justify-center gap-1.5 transition transform active:scale-95 aspect-square'
          ]"
        >
          <span class="text-xs uppercase font-black tracking-widest opacity-80">Level</span>
          <span>{{ lvl.id }}</span>

          <!-- Tampilkan Ikon Gembok Jika Level Terkunci / Mode Demo -->
          <span v-if="!isLevelUnlocked(lvl.id)" class="absolute text-xl top-2 right-2">
            🔒
          </span>
        </button>
      </div>
    </div>

    <div class="w-full text-center text-xs font-black text-slate-400 z-10 flex-shrink-0">
      {{ store.isDemo ? 'VERSI DEMO: HANYA LEVEL 1 YANG TERBUKA 🔒' : 'SELESAIKAN LEVEL SEBELUMNYA UNTUK MEMBUKA 🔒' }}
    </div>

    <!-- Popup BuyModal untuk Pembelian Game -->
    <BuyModal v-if="store.showBuyModal" @close="store.showBuyModal = false" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useGameStore } from '../../stores/smart-transport/gameStore';
import { useAudio } from '../../composables/smart-transport/useAudio';
import AnimatedBackground from '../../components/smart-transport/AnimatedBackground.vue';
import BuyModal from '../../components/smart-transport/BuyModal.vue';

const store = useGameStore();
const router = useRouter();
const { playSound } = useAudio();

// Mengecek kondisi apakah level terbuka
const isLevelUnlocked = (levelId) => {
  if (store.isDemo && levelId > 1) {
    return false; // Gembok semua level selain level 1 jika DEMO MODE
  }
  return levelId <= store.highestLevelUnlocked;
};

const selectLevel = (id) => {
  playSound('click');
  const success = store.setLevel(id);
  if (success) {
    router.push('/game');
  }
};

const goBack = () => {
  playSound('click');
  router.push('/');
};
</script>