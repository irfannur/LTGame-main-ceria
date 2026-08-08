<template>
  <div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[60] font-kid">
    <div class="bg-white rounded-[2.5rem] border-8 border-amber-400 p-6 max-w-sm w-full text-center shadow-2xl relative animate-fadeIn">
      
      <!-- Tombol Close -->
      <button 
        @click="$emit('close')" 
        class="absolute -top-3 -right-3 bg-rose-500 text-white w-9 h-9 rounded-full font-black text-lg shadow-md border-2 border-white hover:bg-rose-600 active:scale-95 transition"
      >
        ✕
      </button>

      <div class="text-6xl mb-2 animate-bounce">🔒✨</div>

      <h2 class="text-2xl font-black text-slate-800 tracking-wide mb-1">
        LEVEL TERKUNCI!
      </h2>

      <p class="text-slate-600 font-bold text-xs leading-relaxed mb-4">
        Kamu sedang mencoba <span class="text-amber-500 font-black">Versi Demo</span>. 
        Buka akses ke <span class="text-emerald-600 font-black">20 Level Lengkap</span> & fitur seru lainnya sekarang!
      </p>

      <!-- Fitur Unggulan -->
      <div class="bg-amber-50 rounded-2xl p-3 border-2 border-amber-200 mb-5 text-left text-xs font-bold text-amber-900 flex flex-col gap-1.5">
        <div class="flex items-center gap-2">
          <span>✅</span> Akses Full 20 Level Acak Dinamis
        </div>
        <div class="flex items-center gap-2">
          <span>✅</span> Full Suara Narator Bahasa Indonesia
        </div>
        <div class="flex items-center gap-2">
          <span>✅</span> Bebas Iklan & Ringan di HP
        </div>
      </div>

      <!-- Tombol Link Beli -->
      <a 
        :href="store.buyUrl" 
        target="_blank"
        class="block w-full bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white font-black text-lg py-3 rounded-2xl shadow-lg border-b-4 border-green-700 active:scale-95 transition text-center"
      >
        BELI AKSES FULL GAME 🛒
      </a>

      <button 
        @click="$emit('close')" 
        class="mt-3 text-slate-400 hover:text-slate-600 font-bold text-xs underline"
      >
        Nanti Saja
      </button>

    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../../stores/smart-transport/gameStore';

const store = useGameStore();
defineEmits(['close']);
</script>