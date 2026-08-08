<template>
  <div class="h-dvh w-full relative flex flex-col justify-between p-6 overflow-hidden font-kid select-none">
    <AnimatedBackground type="sky" />

    <!-- Bar Atas -->
    <div class="flex justify-between items-center z-10">
      <div class="bg-white/90 rounded-full px-4 py-2 border-2 border-sky-200 shadow-sm text-sm font-black text-slate-700">
        ⭐ Total Bintang: <span class="text-amber-500">{{ store.totalStars }}</span>
      </div>
      <button 
        @click="showParentsModal = true" 
        class="bg-purple-500 text-white px-4 py-2 text-xs font-black rounded-full border-b-4 border-purple-700 active:scale-95 transition"
      >
        👨‍👩‍👧 Orang Tua
      </button>
    </div>

    <!-- Judul & Maskot Tengah -->
    <div class="flex flex-col items-center justify-center flex-1 z-10 gap-3">
      <div class="text-center animate-float">
        <h1 class="text-5xl md:text-6xl font-black text-sky-500 drop-shadow-[0_4px_0_rgba(0,0,0,0.1)]">
          Transportasi<span class="text-amber-400 block md:inline md:ml-2">Pintar</span>
        </h1>
        <p class="text-xs font-black text-slate-500 tracking-widest uppercase mt-2">Belajar Kendaraan Sambil Bermain</p>
      </div>

      <div class="text-8xl my-4 animate-bounce-slow">🚀</div>

      <div class="w-full max-w-xs flex flex-col gap-3">
        <button 
          @click="startGame"
          class="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-black text-2xl py-4 rounded-3xl border-b-8 border-emerald-600 shadow-xl active:scale-95 transition"
        >
          MAIN SEKARANG 🚗
        </button>
        <button 
          @click="router.push('/levels')"
          class="w-full bg-white text-sky-500 font-black text-lg py-3 rounded-2xl border-4 border-sky-300 shadow-sm active:scale-95 transition"
        >
          PILIH LEVEL 🗺️
        </button>
      </div>
    </div>

    <!-- Bar Pengaturan Bawah -->
    <div class="flex justify-center z-10 mb-2">
      <button 
        @click="isSettingsOpen = true" 
        class="bg-white text-slate-700 border-4 border-sky-300 rounded-2xl p-2.5 shadow-md active:scale-90 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>

    <!-- Modal Validasi Gerbang Orang Tua -->
    <div v-if="showParentsModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-[2rem] border-4 border-purple-400 p-6 max-w-xs w-full text-center shadow-2xl">
        <h3 class="text-xl font-black text-purple-600 mb-2">Area Orang Tua</h3>
        <p class="text-slate-500 text-xs mb-4">Hitung Matematika untuk Melanjutkan:</p>
        <div class="text-xl font-black text-slate-700 bg-slate-100 py-2.5 rounded-xl mb-4">5 + 3 = ?</div>
        <input v-model="parentAnswer" type="number" class="w-full text-center p-2.5 border-2 rounded-xl mb-4 font-bold focus:outline-none" placeholder="Jawaban..." />
        
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <button @click="verifyParent('logout')" class="flex-1 bg-red-500 text-white py-2 rounded-xl font-bold text-xs border-b-2 border-red-700 active:scale-95 transition">Keluar Akun</button>
            <button @click="verifyParent('reset')" class="flex-1 bg-amber-500 text-white py-2 rounded-xl font-bold text-xs border-b-2 border-amber-700 active:scale-95 transition">Reset Data</button>
          </div>
          <button @click="showParentsModal = false; parentAnswer = ''" class="w-full bg-slate-200 text-slate-600 py-2 rounded-xl font-bold text-sm">Batal</button>
        </div>
      </div>
    </div>

    <SettingsModal :isOpen="isSettingsOpen" @close="isSettingsOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../../stores/smart-transport/gameStore';
import { useAudio } from '../../composables/smart-transport/useAudio';
import AnimatedBackground from '../../components/smart-transport/AnimatedBackground.vue';
import SettingsModal from '../../components/smart-transport/SettingsModal.vue';

const store = useGameStore();
const router = useRouter();
const { playSound, startMusic, stopMusic } = useAudio();

const isSettingsOpen = ref(false);
const showParentsModal = ref(false);
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
      store.logout();
      window.location.reload();
    } else if (action === 'reset') {
      store.resetAllProgress();
      alert('Semua kemajuan bermain berhasil diulang dari level awal!');
    }
  } else {
    alert('Jawaban salah! Akses khusus ayah dan ibu.');
  }
};

watch(() => store.isMusicOn, (ready) => {
  ready ? startMusic() : stopMusic();
});

onMounted(() => {
  startMusic();
});
</script>