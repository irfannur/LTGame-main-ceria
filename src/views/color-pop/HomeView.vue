<template>
  <div class="h-dvh w-full relative flex flex-col justify-between p-6 overflow-hidden flex-shrink-0 font-kid">
    <SkyBackground />

    <!-- Bar Atas - Informasi Profile Ringkas / Orang Tua -->
    <div class="flex justify-between items-center z-10">
      <div class="bg-white/80 rounded-full px-4 py-1.5 text-sm font-black text-slate-700 border-2 border-slate-100 flex items-center gap-1.5">
        ✨ Total Bintang: <span class="text-amber-500 font-extrabold">{{ store.totalStars }}</span>
      </div>
      
      <button 
        @click="showParentsModal = true"
        class="bg-purple-500 hover:bg-purple-600 text-white border-b-4 border-purple-700 rounded-full px-4 py-2 text-xs font-black transition active:scale-95"
      >
        👨‍👩‍👧 Orang Tua
      </button>
    </div>

    <!-- Konten Tengah - Judul & Hero Animasi -->
    <div class="text-center flex flex-col items-center justify-center flex-1 z-10 gap-2">
      <!-- Judul Logo Unik Animasi -->
      <div class="relative mb-4">
        <h1 class="text-5xl md:text-7xl font-black text-sky-500 drop-shadow-[0_4px_0_rgba(0,0,0,0.1)] tracking-wide">
          Color<span class="text-red-400">P</span><span class="text-yellow-400">o</span><span class="text-green-400">p</span>
        </h1>
        <p class="text-sm md:text-base font-extrabold text-slate-500 uppercase tracking-widest mt-1">Pecahkan Balon Warna</p>
      </div>

      <!-- Maskot Balon Berayun Dekorasi -->
      <div class="w-24 h-28 bg-balloon-purple rounded-[50%_50%_50%_50%/_45%_45%_55%_55%] relative shadow-inner animate-bounce mb-6">
        <div class="absolute top-[10%] left-[15%] w-6 h-4 bg-white opacity-40 rounded-full"></div>
        <div class="absolute inset-0 flex flex-col justify-center items-center">
          <div class="flex gap-2 mb-1"><div class="w-2 h-2 bg-white rounded-full"></div><div class="w-2 h-2 bg-white rounded-full"></div></div>
          <div class="w-3 h-1.5 border-b-2 border-black rounded-b-full"></div>
        </div>
      </div>

      <!-- Navigasi Tombol Utama Berukuran Besar (Mudah Di-tap Jari Anak) -->
      <div class="w-full max-w-xs flex flex-col gap-4">
        <button 
          @click="startGame"
          class="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-2xl font-black py-4 rounded-3xl shadow-xl border-b-8 border-emerald-600 hover:brightness-105 active:scale-95 transition"
        >
          MULAI BERMAIN 🎈
        </button>
        
        <button 
          @click="router.push('/levels')"
          class="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white text-xl font-black py-3 rounded-2xl shadow-md border-b-4 border-blue-600 active:scale-95 transition"
        >
          PILIH LEVEL
        </button>
      </div>
    </div>

    <!-- Bar Bawah - Pengaturan Menggunakan Tombol Cog -->
    <div class="flex justify-center z-10 flex-shrink-0 mb-2">
      <button 
        @click="isSettingsOpen = true" 
        class="bg-white hover:bg-slate-50 text-slate-700 border-4 border-sky-300 rounded-2xl p-2.5 shadow-md transition active:scale-90 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>

    <!-- Gerbang Verifikasi Sederhana Khusus Orang Tua -->
    <div v-if="showParentsModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-[2rem] border-4 border-purple-400 p-6 max-w-xs w-full text-center">
        <h3 class="text-xl font-black text-purple-600 mb-2">Area Orang Tua</h3>
        <p class="text-slate-500 text-xs mb-4">Silakan jawab untuk melanjutkan:</p>
        <div class="text-lg font-black text-slate-700 bg-slate-100 py-2 rounded-xl mb-4">Berapakah 5 + 3 = ?</div>
        <input v-model="parentAnswer" type="number" class="w-full text-center p-2 border-2 rounded-xl mb-4 font-bold" placeholder="Jawaban" />
        
        <!-- Pilihan Aksi Utama -->
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <button @click="verifyParent('logout')" class="flex-1 bg-red-500 text-white py-2 rounded-xl font-bold text-xs border-b-2 border-red-700 active:scale-95 transition">
              Keluar Akun
            </button>
            <button @click="verifyParent('reset')" class="flex-1 bg-amber-500 text-white py-2 rounded-xl font-bold text-xs border-b-2 border-amber-700 active:scale-95 transition">
              Reset Progres
            </button>
          </div>
          <button @click="showParentsModal = false" class="w-full bg-slate-200 text-slate-600 py-2 rounded-xl font-bold text-sm">
            Batal
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Pengaturan Global Suara -->
    <SettingsModal :isOpen="isSettingsOpen" @close="isSettingsOpen = false" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../../stores/color-pop/gameStore';
import { useAudio } from '../../composables/color-pop/useAudio';
import SkyBackground from '../../components/color-pop/SkyBackground.vue';
import SettingsModal from '../../components/color-pop/SettingsModal.vue'; // Impor Modal

const store = useGameStore();
const router = useRouter();
const { playSound, startMusic, stopMusic } = useAudio();

const showParentsModal = ref(false);
const isSettingsOpen = ref(false); // State pemicu modal pengaturan
const parentAnswer = ref('');

const startGame = () => {
  playSound('click');
  store.setLevel(store.currentLevelId);
  router.push('/game');
};

const verifyParent = (action) => {
  if (parseInt(parentAnswer.value) === 8) {
    showParentsModal.value = false;
    parentAnswer.value = '';

    if (action === 'logout') {
      if (confirm("Apakah Anda ingin mereset semua progres permainan anak dan KELUAR dari akun?")) {
        store.logout();
        store.resetAllProgress();
        window.location.reload();
      }
    } else if (action === 'reset') {
      if (confirm("Apakah Anda yakin ingin RESET skor, bintang, dan level kembali ke awal tanpa keluar akun?")) {
        store.resetAllProgress();
      }
    }
  } else {
    alert("Salah! Ini khusus untuk Orang Tua.");
  }
};

watch(() => store.isMusicOn, (musicReady) => {
  if (musicReady) {
    stopMusic();
    startMusic();
  } else {
    stopMusic();
  }
});
</script>