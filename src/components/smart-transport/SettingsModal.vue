<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-kid">
    <div class="bg-white rounded-[2.5rem] border-4 border-sky-400 p-6 max-w-sm w-full text-center relative shadow-2xl animate-float">
      <h3 class="text-2xl font-black text-sky-500 mb-5 tracking-wide">⚙️ PENGATURAN</h3>

      <div class="flex flex-col gap-3 mb-6">
        <!-- Toggle Musik Latar -->
        <div class="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-100 shadow-sm">
          <span class="font-extrabold text-slate-700 text-sm flex items-center gap-1.5">🎵 Musik Latar</span>
          <button 
            @click="store.toggleMusic" 
            :class="store.isMusicOn ? 'bg-green-400 border-green-600' : 'bg-slate-300 border-slate-400'"
            class="text-white font-black text-xs px-4 py-2 rounded-xl border-b-4 active:scale-95 transition min-w-[80px]"
          >
            {{ store.isMusicOn ? 'AKTIF' : 'MATI' }}
          </button>
        </div>

        <!-- Toggle Efek Suara -->
        <div class="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-100 shadow-sm">
          <span class="font-extrabold text-slate-700 text-sm flex items-center gap-1.5">🔊 Efek Suara</span>
          <button 
            @click="store.toggleSound" 
            :class="store.isSoundOn ? 'bg-green-400 border-green-600' : 'bg-slate-300 border-slate-400'"
            class="text-white font-black text-xs px-4 py-2 rounded-xl border-b-4 active:scale-95 transition min-w-[80px]"
          >
            {{ store.isSoundOn ? 'AKTIF' : 'MATI' }}
          </button>
        </div>

        <!-- Toggle Suara Narator -->
        <div class="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-100 shadow-sm">
          <span class="font-extrabold text-slate-700 text-sm flex items-center gap-1.5">🗣️ Suara Narator</span>
          <button 
            @click="store.toggleNarrator" 
            :class="store.isNarratorOn ? 'bg-green-400 border-green-600' : 'bg-slate-300 border-slate-400'"
            class="text-white font-black text-xs px-4 py-2 rounded-xl border-b-4 active:scale-95 transition min-w-[80px]"
          >
            {{ store.isNarratorOn ? 'AKTIF' : 'MATI' }}
          </button>
        </div>

        <!-- Tombol Reset Data Game -->
        <div class="flex items-center justify-between bg-rose-50 p-3.5 rounded-2xl border border-rose-100 shadow-sm mt-1">
          <span class="font-extrabold text-rose-600 text-sm flex items-center gap-1.5">🔄 Progres Game</span>
          <button 
            @click="handleReset" 
            class="bg-rose-500 hover:bg-rose-600 border-rose-700 text-white font-black text-xs px-4 py-2 rounded-xl border-b-4 active:scale-95 transition min-w-[80px]"
          >
            RESET
          </button>
        </div>
      </div>

      <button 
        @click="$emit('close')" 
        class="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white text-base font-black py-3 rounded-2xl shadow border-b-4 border-blue-600 active:scale-95 transition"
      >
        OK 🌟
      </button>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../../stores/smart-transport/gameStore';

defineProps({ isOpen: { type: Boolean, required: true } });
const emit = defineEmits(['close']);
const store = useGameStore();

const handleReset = () => {
  const isConfirmed = confirm('Apakah kamu yakin ingin menghapus semua progres game dan bintang?');
  
  if (isConfirmed) {
    if (typeof store.resetAllProgress === 'function') {
      store.resetAllProgress();
    }
    alert('Progres berhasil direset!');
    emit('close');
  }
};
</script>