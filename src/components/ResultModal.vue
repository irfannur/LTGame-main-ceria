<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-kid">
    <div class="bg-white rounded-[3rem] border-8 border-amber-400 p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 transition-all">
      <div class="text-6xl mb-2 animate-bounce">🏆</div>
      
      <h2 class="text-3xl font-black text-amber-500 tracking-wide mb-1">
        {{ store.isGameFullyCompleted ? 'SELESAI KELAS!' : 'KAMU HEBAT!' }}
      </h2>
      <p class="text-slate-500 text-sm font-bold mb-4">
        {{ store.isGameFullyCompleted ? 'Semua 15 Level Selesai' : 'Level Selesai dengan Sempurna' }}
      </p>
      
      <!-- Rating Bintang -->
      <div class="flex justify-center gap-2 mb-6">
        <span 
          v-for="star in 3" 
          :key="star" 
          class="text-4xl transition-transform duration-500 filter drop-shadow-sm"
          :class="star <= 3 ? 'text-amber-400 scale-110' : 'text-slate-300 grayscale'"
        >
          ⭐
        </span>
      </div>

      <div class="flex flex-col gap-3">
        <!-- 1. Lanjut Level -->
        <button 
          v-if="!store.isGameFullyCompleted"
          @click="$emit('next')" 
          class="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-black text-xl py-3 rounded-2xl shadow-md border-b-4 border-emerald-600 active:scale-95 transition"
        >
          LEVEL SELANJUTNYA ▶
        </button>

        <!-- 2. Tombol Main Lagi (Hanya jika 15 level sudah rampung) -->
        <button 
          v-if="store.isGameFullyCompleted"
          @click="$emit('next')" 
          class="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-black text-xl py-3 rounded-2xl shadow-md border-b-4 border-emerald-600 active:scale-95 transition"
        >
          MAIN LAGI 🚀
        </button>

        <!-- 3. Tombol Reset Data Progres -->
        <!-- <button 
          @click="handleReset" 
          class="w-full bg-gradient-to-r from-rose-500 to-red-600 text-white font-black text-sm py-2.5 rounded-xl shadow-md border-b-4 border-red-700 active:scale-95 transition flex items-center justify-center gap-2"
        >
          <span>🔄</span> ULANG DARI AWAL
        </button> -->

        <!-- 4. Peta Level -->
        <button 
          @click="$emit('menu')" 
          class="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm py-2.5 rounded-xl border border-slate-300"
        >
          Peta Pemilihan Level
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore';

const store = useGameStore();
const emit = defineEmits(['next', 'menu', 'reset']);

const handleReset = () => {
  if (confirm('Apakah kamu yakin ingin mengulang dari awal dan menghapus semua bintang?')) {
    store.resetAllProgress();
    emit('reset');
  }
};
</script>