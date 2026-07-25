<template>
  <Teleport to="body">
    <div 
      v-if="store.isSettingsOpen" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-kid animate-fade-in"
      @click.self="close"
    >
      <div class="bg-white rounded-3xl border-8 border-amber-400 p-6 max-w-sm w-full shadow-2xl transform transition-all relative">
        
        <!-- Header Modal -->
        <div class="text-center mb-6">
          <h2 class="text-3xl font-black text-sky-600">PENGATURAN ⚙️</h2>
        </div>

        <!-- Opsi Toggle -->
        <div class="space-y-3">
          
          <!-- Toggle Musik -->
          <div class="flex items-center justify-between bg-sky-50 p-3.5 rounded-2xl border-2 border-sky-200">
            <span class="font-bold text-sky-900 text-base">🎵 Musik Latar</span>
            <button 
              @click="handleToggleMusic"
              :class="store.isMusicOn ? 'bg-emerald-500' : 'bg-slate-300'"
              class="w-14 h-8 flex items-center rounded-full p-1 transition duration-300 shadow-inner cursor-pointer"
            >
              <div 
                :class="store.isMusicOn ? 'translate-x-6' : 'translate-x-0'"
                class="bg-white w-6 h-6 rounded-full shadow-md transform transition duration-300 flex items-center justify-center text-xs font-bold"
              >
                {{ store.isMusicOn ? '✓' : '✕' }}
              </div>
            </button>
          </div>

          <!-- Toggle Efek Suara -->
          <div class="flex items-center justify-between bg-amber-50 p-3.5 rounded-2xl border-2 border-amber-200">
            <span class="font-bold text-amber-900 text-base">🔔 Efek Suara</span>
            <button 
              @click="handleToggleSound"
              :class="store.isSoundOn ? 'bg-emerald-500' : 'bg-slate-300'"
              class="w-14 h-8 flex items-center rounded-full p-1 transition duration-300 shadow-inner cursor-pointer"
            >
              <div 
                :class="store.isSoundOn ? 'translate-x-6' : 'translate-x-0'"
                class="bg-white w-6 h-6 rounded-full shadow-md transform transition duration-300 flex items-center justify-center text-xs font-bold"
              >
                {{ store.isSoundOn ? '✓' : '✕' }}
              </div>
            </button>
          </div>

          <!-- Toggle Narator -->
          <div class="flex items-center justify-between bg-purple-50 p-3.5 rounded-2xl border-2 border-purple-200">
            <span class="font-bold text-purple-900 text-base">🗣️ Suara Narator</span>
            <button 
              @click="handleToggleNarrator"
              :class="store.isNarratorOn ? 'bg-emerald-500' : 'bg-slate-300'"
              class="w-14 h-8 flex items-center rounded-full p-1 transition duration-300 shadow-inner cursor-pointer"
            >
              <div 
                :class="store.isNarratorOn ? 'translate-x-6' : 'translate-x-0'"
                class="bg-white w-6 h-6 rounded-full shadow-md transform transition duration-300 flex items-center justify-center text-xs font-bold"
              >
                {{ store.isNarratorOn ? '✓' : '✕' }}
              </div>
            </button>
          </div>

          <!-- Tombol Reset Data Game -->
          <div class="pt-2">
            <button 
              @click="handleResetData"
              class="w-full bg-rose-100 hover:bg-rose-200 text-rose-700 border-2 border-rose-300 font-bold py-2.5 rounded-2xl transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <span>🔄</span> Reset Semua Progres Game
            </button>
          </div>

        </div>

        <!-- Tombol Tutup / Selesai -->
        <button 
          @click="close"
          class="w-full mt-5 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-black text-xl py-3 rounded-2xl shadow-lg border-b-4 border-sky-700 active:scale-95 transition cursor-pointer"
        >
          SELESAI 👍
        </button>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore';
import { useAudio } from '../composables/useAudio';

const store = useGameStore();
const { playSoundEffect, toggleMusic } = useAudio();

const close = () => {
  playSoundEffect('click');
  store.closeSettings();
};

const handleToggleMusic = () => {
  playSoundEffect('click');
  toggleMusic();
};

const handleToggleSound = () => {
  store.toggleSound();
  playSoundEffect('click');
};

const handleToggleNarrator = () => {
  playSoundEffect('click');
  store.toggleNarrator();
};

const handleResetData = () => {
  playSoundEffect('click');
  const isConfirmed = window.confirm(
    'Apakah kamu yakin ingin mengulang dari awal? Semua Bintang & Level yang sudah terbuka akan direset!'
  );

  if (isConfirmed) {
    store.resetAllProgress();
    playSoundEffect('wrong'); // Efek suara pemberitahuan reset
    alert('Progres game berhasil direset ke Level 1! 🌟');
  }
};
</script>