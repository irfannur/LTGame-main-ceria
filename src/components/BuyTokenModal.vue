<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-kid animate-fade-in"
      @click.self="close"
    >
      <div class="bg-white rounded-3xl border-8 border-amber-400 p-6 max-w-sm w-full shadow-2xl text-center transform transition-all relative">
        
        <!-- Ikon / Ilustrasi -->
        <div class="text-6xl mb-3 animate-bounce">🔒</div>

        <!-- Judul -->
        <h2 class="text-2xl sm:text-3xl font-black text-amber-500 mb-2">
          LEVEL TERKUNCI!
        </h2>

        <!-- Deskripsi -->
        <p class="text-slate-600 font-bold text-sm sm:text-base leading-relaxed mb-6">
          Kamu sedang menggunakan <span class="text-amber-600 underline">Token DEMO</span>. Untuk membuka semua level dan fitur seru lainnya, yuk beli token resminya! 🚀
        </p>

        <!-- Tombol Beli / Link Toko -->
        <a 
          :href="store.buyTokenUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          @click="playSoundEffect('click')"
          class="block w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-xl py-3.5 rounded-2xl shadow-lg border-b-4 border-emerald-700 active:scale-95 transition mb-3 uppercase tracking-wide cursor-pointer text-center"
        >
          🛒 BELI TOKEN FULL
        </a>

        <!-- Tombol Tutup -->
        <button 
          @click="close"
          class="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 rounded-xl transition text-sm cursor-pointer"
        >
          Nanti Saja
        </button>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore';
import { useAudio } from '../composables/useAudio';

defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close']);
const store = useGameStore();
const { playSoundEffect } = useAudio();

const close = () => {
  playSoundEffect('click');
  emit('close');
};
</script>