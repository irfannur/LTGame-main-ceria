<!-- components/SettingsModal.vue -->
<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-kid">
    <div class="bg-white rounded-[2rem] border-4 border-sky-400 p-6 max-w-xs w-full text-center relative shadow-2xl">
      
      <h3 class="text-2xl font-black text-sky-500 mb-4 tracking-wide">⚙️ PENGATURAN</h3>

      <div class="flex flex-col gap-3.5 mb-5">
        <!-- Baris 1: Kontrol Musik -->
        <div class="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm">
          <span class="font-extrabold text-slate-700 text-sm flex items-center gap-1.5">🎵 Musik Latar</span>
          <button 
            @click="store.toggleMusic" 
            :class="store.isMusicOn ? 'bg-green-400 border-green-600' : 'bg-slate-300 border-slate-400'"
            class="text-white font-black text-xs px-3 py-1.5 rounded-xl border-b-4 active:scale-95 transition min-w-[70px]"
          >
            {{ store.isMusicOn ? 'AKTIF' : 'MATI' }}
          </button>
        </div>

        <!-- Baris 2: Kontrol Efek Suara (SFX) -->
        <div class="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm">
          <span class="font-extrabold text-slate-700 text-sm flex items-center gap-1.5">🔊 Efek Balon</span>
          <button 
            @click="store.toggleSound" 
            :class="store.isSoundOn ? 'bg-green-400 border-green-600' : 'bg-slate-300 border-slate-400'"
            class="text-white font-black text-xs px-3 py-1.5 rounded-xl border-b-4 active:scale-95 transition min-w-[70px]"
          >
            {{ store.isSoundOn ? 'AKTIF' : 'MATI' }}
          </button>
        </div>

        <!-- Baris 3: Kontrol Suara Narator -->
        <div class="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm">
          <span class="font-extrabold text-slate-700 text-sm flex items-center gap-1.5">🗣️ Narator</span>
          <button 
            @click="store.toggleNarrator" 
            :class="store.isNarratorOn ? 'bg-green-400 border-green-600' : 'bg-slate-300 border-slate-400'"
            class="text-white font-black text-xs px-3 py-1.5 rounded-xl border-b-4 active:scale-95 transition min-w-[70px]"
          >
            {{ store.isNarratorOn ? 'AKTIF' : 'MATI' }}
          </button>
        </div>

        <!-- Baris 4: Tombol Reset Progres Data -->
        <button 
          @click="showConfirm = true"
          class="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs py-2.5 px-3 rounded-2xl border border-rose-200 flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          🗑️ Reset Semua Progres Game
        </button>
      </div>

      <!-- Tombol Tutup -->
      <button 
        @click="$emit('close')" 
        class="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white text-base font-black py-2.5 rounded-2xl shadow border-b-4 border-blue-600 active:scale-95 transition"
      >
        OK 🌟
      </button>

      <!-- Sub-Modal / Pop-up Konfirmasi Reset -->
      <div 
        v-if="showConfirm" 
        class="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[60]"
      >
        <div class="bg-white rounded-3xl p-5 border-4 border-rose-400 max-w-[260px] w-full text-center shadow-2xl animate-scale-up">
          <div class="text-3xl mb-2">⚠️</div>
          <h4 class="text-lg font-black text-rose-600 mb-1">Reset Progres?</h4>
          <p class="text-slate-500 text-xs font-bold mb-4 leading-relaxed">
            Semua bintang, skor tertinggi, dan level yang terbuka akan **kembali ke awal**.
          </p>
          
          <div class="flex gap-2">
            <button 
              @click="executeReset" 
              class="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs py-2 rounded-xl border-b-4 border-rose-700 active:scale-95 transition"
            >
              Ya, Reset
            </button>
            <button 
              @click="showConfirm = false" 
              class="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs py-2 rounded-xl border-b-4 border-slate-300 active:scale-95 transition"
            >
              Batal
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGameStore } from '../../stores/color-pop/gameStore';

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const store = useGameStore();
const showConfirm = ref(false);

const executeReset = () => {
  store.resetAllProgress(); // Memanggil action reset bawaan dari gameStore.js
  showConfirm.value = false;
  emit('close'); // Tutup modal setelah reset berhasil
};
</script>