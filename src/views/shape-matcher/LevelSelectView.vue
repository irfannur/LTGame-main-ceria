<template>
  <div class="w-screen h-screen flex flex-col items-center justify-between p-6 bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 font-kid overflow-hidden relative">
    
    <!-- Header Navigation -->
    <div class="w-full max-w-2xl flex items-center justify-between z-10">
      <button 
        @click="goHome"
        class="bg-white/80 hover:bg-white p-3 rounded-2xl border-2 border-amber-400 shadow-md font-bold text-slate-700 active:scale-90 transition cursor-pointer"
      >
        🏠 Beranda
      </button>

      <div class="bg-amber-400 text-white font-black px-5 py-2 rounded-full shadow-lg border-2 border-amber-500 flex items-center gap-2">
        <span>⭐</span> {{ store.totalStars }} Bintang
      </div>
    </div>

    <!-- Judul -->
    <div class="text-center my-4 z-10">
      <h1 class="text-4xl sm:text-5xl font-black text-sky-600 drop-shadow-sm">PILIH LEVEL 🗺️</h1>
      <p v-if="store.isDemoAccount" class="text-amber-600 font-bold text-xs sm:text-sm mt-1 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 inline-block">
        Mode Demo: Hanya Level 1 yang terbuka
      </p>
    </div>

    <!-- Grid Level -->
    <div class="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-3 gap-4 z-10 overflow-y-auto max-h-[60vh] p-2">
      <div
        v-for="lvl in store.levels"
        :key="lvl.id"
        @click="handleLevelClick(lvl.id)"
        :class="[
          'relative p-5 rounded-3xl border-4 text-center cursor-pointer transition transform active:scale-95 flex flex-col items-center justify-center min-h-[120px] shadow-lg',
          isLevelLocked(lvl.id) 
            ? 'bg-slate-200/80 border-slate-300 text-slate-400 opacity-90' 
            : 'bg-white border-amber-400 hover:border-amber-500 text-sky-600'
        ]"
      >
        <!-- Ikon Gembok untuk Level Terkunci -->
        <template v-if="isLevelLocked(lvl.id)">
          <div class="text-4xl mb-1">🔒</div>
          <span class="font-black text-slate-500 text-lg">Level {{ lvl.id }}</span>
          <span class="text-[10px] font-bold bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full mt-1">
            {{ store.isDemoAccount ? 'DEMO LOCK' : 'TERKUNCI' }}
          </span>
        </template>

        <!-- Level Terbuka -->
        <template v-else>
          <span class="text-3xl font-black text-amber-500 mb-1">LEVEL {{ lvl.id }}</span>
          <span class="text-xs font-bold text-sky-700">{{ lvl.title || 'Bentuk & Warna' }}</span>
          
          <!-- Indicator Selesai -->
          <div v-if="store.completedLevels.includes(lvl.id)" class="absolute top-2 right-2 text-xl">
            ✅
          </div>
        </template>
      </div>
    </div>

    <!-- Footer Space -->
    <div class="mb-4"></div>

    <!-- Modal Beli Token -->
    <BuyTokenModal 
      :is-open="showBuyModal" 
      @close="showBuyModal = false" 
    />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useShapeStore } from '../../stores/shape-matcher/gameStore.js';
import { useAudio } from '../../composables/shape-matcher/useAudio.js';
import BuyTokenModal from '../../components/shape-matcher/BuyTokenModal.vue';

const router = useRouter();
const store = useShapeStore();
const { playSoundEffect } = useAudio();

const showBuyModal = ref(false);

// Kondisi penentuan gembok
const isLevelLocked = (levelId) => {
  // Jika akun Demo, gembok semua level selain Level 1
  if (store.isDemoAccount) {
    return levelId > 1;
  }
  
  // Untuk akun biasa: Level 1 terbuka, level lain butuh level sebelumnya selesai
  if (levelId === 1) return false;
  return !store.completedLevels.includes(levelId - 1);
};

const handleLevelClick = (levelId) => {
  if (isLevelLocked(levelId)) {
    playSoundEffect('wrong');
    
    if (store.isDemoAccount) {
      // Tampilkan modal promosi jika diklik di mode demo
      showBuyModal.value = true;
    }
    return;
  }

  playSoundEffect('click');
  store.selectLevel(levelId);
  router.push('/shape-matcher/play');
};

const goHome = () => {
  playSoundEffect('click');
  router.push('/');
};
</script>