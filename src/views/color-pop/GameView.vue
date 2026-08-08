<template>
  <div class="h-screen w-full relative overflow-hidden select-none touch-none">
    <SkyBackground />

    <!-- Lapisan UI Kontrol Atas & Instruksi -->
    <div class="absolute top-3 left-3 right-3 flex flex-col gap-3 z-30 pointer-events-none">
      
      <div class="flex justify-between items-start w-full gap-2 pointer-events-auto">
        <div class="flex flex-col gap-1.5 max-w-[50%]">
          <ScoreBoard />
          <div class="text-[10px] md:text-xs font-black bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-slate-600 truncate shadow-sm">
            📍 Level {{ store.currentLevelId }}: {{ store.currentLevel.theme }}
          </div>
        </div>

        <div class="flex flex-col items-end gap-1.5">
          <StarCounter />
          
          <!-- Kelompok Tombol Navigasi & Kontrol -->
          <div class="flex items-center gap-1.5">
            <!-- Tombol Beranda / Home -->
            <button 
              @click="goHome" 
              title="Beranda"
              class="bg-sky-500 text-white rounded-xl font-black p-1.5 border-b-4 border-sky-700 active:scale-95 transition shadow-sm flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>

            <!-- Tombol Pilih Level -->
            <button 
              @click="goLevels" 
              title="Daftar Level"
              class="bg-amber-400 text-amber-950 rounded-xl font-black p-1.5 border-b-4 border-amber-600 active:scale-95 transition shadow-sm flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>

            <!-- Tombol Pengaturan -->
            <button 
              @click="openSettings" 
              title="Pengaturan"
              class="bg-white text-slate-700 rounded-xl font-black p-1.5 border-b-4 border-slate-300 active:scale-95 transition shadow-sm flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            <!-- Tombol Keluar -->
            <button 
              @click="exitGame" 
              class="bg-red-400 text-white rounded-xl font-black py-1.5 px-2.5 text-xs border-b-4 border-red-600 active:scale-95 transition shadow-sm"
            >
              Keluar ↩
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-center w-full pointer-events-auto">
        <InstructionBox @replay-voice="triggerInstructionAudio" class="w-full max-w-sm" />
      </div>

    </div>

    <!-- Game Canvas -->
    <div class="absolute inset-0 z-15 overflow-hidden pointer-events-none">
      <Balloon 
        v-for="balloon in balloons" 
        :key="balloon.id" 
        :balloon="balloon"
        class="pointer-events-auto"
        @pop="onBalloonPop"
        @wrong="onBalloonWrong"
      />
    </div>

    <!-- Modal Level Cleared -->
    <ResultModal 
      v-if="store.isLevelCleared" 
      @next-level="handleNextLevel"
      @replay="handleReplay"
      @change-level="goLevels"
      @home="goHome"
    />

    <!-- Modal Pengaturan Suara -->
    <SettingsModal :isOpen="isSettingsOpen" @close="isSettingsOpen = false" />

    <!-- Modal Upgrade Pembelian Mode Demo -->
    <DemoUpgradeModal 
      :isOpen="showDemoModal" 
      @close="showDemoModal = false" 
      purchaseUrl="https://wa.me/6281234567890?text=Saya%20ingin%20membeli%20akses%20full%20ColorPop"
    />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, toRefs, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../../stores/color-pop/gameStore';
import { useBalloons } from '../../composables/color-pop/useBalloons';
import { useAudio } from '../../composables/color-pop/useAudio';
import SkyBackground from '../../components/color-pop/SkyBackground.vue';
import Balloon from '../../components/color-pop/Balloon.vue';
import ScoreBoard from '../../components/color-pop/ScoreBoard.vue';
import StarCounter from '../../components/color-pop/StarCounter.vue';
import InstructionBox from '../../components/color-pop/InstructionBox.vue';
import ResultModal from '../../components/color-pop/ResultModal.vue';
import SettingsModal from '../../components/color-pop/SettingsModal.vue';
import DemoUpgradeModal from '../../components/color-pop/DemoUpgradeModal.vue';

const store = useGameStore();
const router = useRouter();
const { currentLevel } = toRefs(store);

const { balloons, spawnBalloon, updateBalloons } = useBalloons(currentLevel, store.colorMap);
const { initAllSounds, playSound, startMusic, stopMusic, playNarrator } = useAudio();

const isSettingsOpen = ref(false);
const showDemoModal = ref(false);

let gameLoopId = null;
let spawnIntervalId = null;
let instructionIntervalId = null;
let lastTime = performance.now();

const triggerInstructionAudio = () => {
  if (store.targetColor && !store.isLevelCleared) {
    playNarrator(store.targetColor);
  }
};

const runGameLoop = (now) => {
  if (store.isLevelCleared) return;
  const deltaTime = (now - lastTime) / 1000;
  lastTime = now;
  updateBalloons(deltaTime);
  gameLoopId = requestAnimationFrame(runGameLoop);
};

const startSpawnerAndTimers = () => {
  spawnIntervalId = setInterval(() => {
    if (!store.isLevelCleared && balloons.value.length < store.currentLevel.maxBalloons) {
      spawnBalloon();
    }
  }, store.currentLevel.spawnInterval);

  instructionIntervalId = setInterval(() => {
    triggerInstructionAudio();
  }, 7000);
};

const onBalloonPop = (id) => {
  startMusic();
  playSound('pop');
  store.registerCorrectHit();
};

const onBalloonWrong = (id) => {
  startMusic();
  playSound('wrong');
  store.registerWrongHit();
  triggerInstructionAudio();
};

const handleNextLevel = () => {
  if (store.isDemo) {
    showDemoModal.value = true;
    return;
  }

  store.setLevel(store.currentLevelId + 1);
  resetGameEnvironment();
};

const handleReplay = () => {
  store.setLevel(store.currentLevelId);
  resetGameEnvironment();
};

const resetGameEnvironment = () => {
  balloons.value = [];
  clearInterval(spawnIntervalId);
  clearInterval(instructionIntervalId);
  cancelAnimationFrame(gameLoopId);
  
  lastTime = performance.now();
  startSpawnerAndTimers();
  gameLoopId = requestAnimationFrame(runGameLoop);
  setTimeout(() => { triggerInstructionAudio(); }, 600);
};

const openSettings = () => {
  playSound('click');
  isSettingsOpen.value = true;
};

// Navigasi ke Halaman Daftar Level Color-Pop
const goLevels = () => {
  playSound('click');
  router.push('/color-pop/levels'); // Sesuaikan rute daftar level jika berbeda (misal: '/color-pop/select-level')
};

// Navigasi Kembali ke Home Utama / Portal
const goHome = () => {
  playSound('click');
  router.push('/');
};

const exitGame = () => {
  goHome();
};

watch(() => store.isLevelCleared, (isCleared) => {
  if (isCleared) {
    clearInterval(spawnIntervalId);
    clearInterval(instructionIntervalId);
    cancelAnimationFrame(gameLoopId);
    playSound('success');
  }
});

onMounted(async () => {
  store.initLevel();
  await initAllSounds();
  
  stopMusic();
  startMusic();
  lastTime = performance.now();
  gameLoopId = requestAnimationFrame(runGameLoop);
  startSpawnerAndTimers();
  setTimeout(() => { triggerInstructionAudio(); }, 600);
});

onUnmounted(() => {
  clearInterval(spawnIntervalId);
  clearInterval(instructionIntervalId);
  cancelAnimationFrame(gameLoopId);
  stopMusic();
});

watch(() => store.isMusicOn, (musicReady) => {
  if (musicReady) {
    startMusic();
  } else {
    stopMusic();
  }
});
</script>