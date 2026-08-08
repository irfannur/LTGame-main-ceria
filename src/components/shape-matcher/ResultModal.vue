<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-kid animate-fade-in">
      <div class="bg-white rounded-3xl border-8 border-amber-400 p-6 max-w-sm w-full shadow-2xl text-center transform transition-all relative">
        
        <!-- Badge Selamat -->
        <div class="text-6xl mb-2 animate-bounce">🌟</div>
        <h2 class="text-3xl font-black text-amber-500 mb-1">HEBAT!</h2>
        <p class="text-sky-800 font-bold mb-4">Kamu Menyelesaikan Level {{ store.currentLevel.id }}!</p>

        <!-- Tombol Navigasi -->
        <div class="space-y-3">
          <!-- Tombol Lanjut -->
          <button 
            @click="handleNext"
            class="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-xl py-3 rounded-2xl shadow-lg border-b-4 border-emerald-700 active:scale-95 transition cursor-pointer"
          >
            LANJUT LEVEL 🚀
          </button>

          <!-- Tombol Main Lagi -->
          <button 
            @click="handleReset"
            class="w-full bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold py-2.5 rounded-2xl border-2 border-sky-300 transition active:scale-95 cursor-pointer text-sm"
          >
            🔄 Main Lagi
          </button>

          <!-- Tombol Menu Level -->
          <!-- <button 
            @click="handleMenu"
            class="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 rounded-2xl transition cursor-pointer text-xs"
          >
            🗺️ Pilih Level Lain
          </button> -->
        </div>

      </div>
    </div>

    <!-- Modal Beli Token khusus jika mencoba lanjut di mode Demo -->
    <BuyTokenModal 
      :is-open="showBuyModal" 
      @close="showBuyModal = false" 
    />
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { useShapeStore } from '../../stores/shape-matcher/gameStore.js';
import { useAudio } from '../../composables/shape-matcher/useAudio.js';
import BuyTokenModal from './BuyTokenModal.vue';

const emit = defineEmits(['next', 'menu', 'reset']);
const store = useShapeStore();
const { playSoundEffect } = useAudio();

const showBuyModal = ref(false);

const handleNext = () => {
  playSoundEffect('click');
  
  // Jika akun Demo, cegah lanjut dan munculkan modal beli
  if (store.isDemoAccount) {
    showBuyModal.value = true;
    return;
  }

  emit('next');
};

const handleReset = () => {
  playSoundEffect('click');
  emit('reset');
};

const handleMenu = () => {
  playSoundEffect('click');
  emit('menu');
};
</script> 