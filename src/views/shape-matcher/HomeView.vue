<template>
  <div class="relative w-screen h-screen flex flex-col items-center justify-between p-6 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 font-kid">
    
    <!-- Tombol Pengaturan (z-index dinaikkan & ditambah cursor-pointer) -->
    <div class="absolute top-6 right-6 z-50">
      <button 
        @click.stop="openSettings" 
        type="button"
        class="p-3 bg-white/80 hover:bg-white rounded-full shadow-lg border-2 border-amber-400 active:scale-90 transition cursor-pointer select-none"
        title="Pengaturan"
      >
        <span class="text-2xl leading-none block">⚙️</span>
      </button>
    </div>

    <!-- Latar Awan Bergerak (diberi pointer-events-none agar tidak mengalangi klik) -->
    <div class="absolute top-10 left-0 text-6xl opacity-60 animate-cloud-slow pointer-events-none">☁️</div>
    <div class="absolute top-24 left-0 text-7xl opacity-40 animate-cloud-fast pointer-events-none">☁️</div>

    <!-- Header Judul Game -->
    <div class="text-center mt-8 z-10">
      <div class="inline-block bg-white/80 backdrop-blur-md border-4 border-amber-400 px-6 py-2 rounded-full shadow-lg mb-2">
        <span class="text-amber-500 font-black text-sm tracking-widest uppercase">Game Edukasi Anak</span>
      </div>
      <h1 class="text-5xl sm:text-7xl font-black text-sky-600 drop-shadow-md tracking-wider">
        Shape<span class="text-amber-400">Matcher</span>
      </h1>
      <p class="text-sky-800 font-bold text-lg sm:text-xl mt-1">Pasangkan Bentuk & Warna 🎨</p>
    </div>

    <!-- Maskot Utama -->
    <div class="flex flex-col items-center z-10">
      <Mascot />
    </div>

    <!-- Container Tombol Navigasi -->
    <div class="w-full max-w-xs flex flex-col items-center gap-3 mb-8 z-10">
      <!-- Tombol Utama -->
      <button 
        @click="startGame"
        class="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-black text-2xl py-4 rounded-3xl shadow-xl border-b-8 border-amber-600 active:scale-95 transition transform cursor-pointer"
      >
        MAIN SEKARANG 🚀
      </button>

      <!-- Tombol Keluar / Ganti Token -->
      <button
        @click="handleLogout"
        class="text-xs font-bold text-slate-600 hover:text-slate-800 underline bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-300/60 transition cursor-pointer"
      >
        🔑 Keluar / Ganti Token
      </button>
    </div>

    <!-- Modal Pengaturan -->
    <SettingsModal />

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useShapeStore } from '../../stores/shape-matcher/gameStore.js';
import Mascot from '../components/Mascot.vue';
import SettingsModal from '../components/SettingsModal.vue';
import { useAudio } from '../../composables/useAudio.js';

const router = useRouter();
const store = useShapeStore();
const { playSoundEffect, playMusic } = useAudio();

const startGame = () => {
  stopMusic();
  playSoundEffect('click');
  playMusic();
  
  if (!store.isAuthorized) {
    router.push('/gate');
    return;
  }

  router.push('/levels');
};

const handleLogout = () => {
  playSoundEffect('click');

  const isConfirmed = window.confirm('Apakah kamu yakin ingin keluar dan mengganti token?');
  if (isConfirmed) {
    store.logout();
    router.push('/gate');
  }
};

const openSettings = () => {
  playSoundEffect('click');
  store.toggleSettings();
};
</script>