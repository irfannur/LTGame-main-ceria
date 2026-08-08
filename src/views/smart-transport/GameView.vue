<template>
  <div class="h-dvh w-full relative overflow-hidden select-none touch-none font-kid">
    <AnimatedBackground :type="level.background" />

    <!-- Top UI Container Layer -->
    <div class="absolute top-4 inset-x-4 flex flex-col gap-3 z-30 pointer-events-none">
      <div class="flex justify-between items-center w-full pointer-events-auto">
        <div class="flex flex-col gap-1 max-w-[60%]">
          <div class="bg-white/95 border-2 border-sky-300 px-3 py-1 rounded-2xl text-xs font-black text-slate-700 shadow-sm truncate">
            🎲 AKURASI MAIN: {{ store.completedList.length }} / 20 LEVEL
          </div>
          <!-- Pengaturan Progress Lompat Sesuai Getter Store -->
          <ProgressBar :progress="store.progressPercentage" />
        </div>

        <div class="flex items-center gap-2">
          <button @click="openSettings" class="bg-white text-slate-700 w-8 h-8 rounded-xl border-b-4 border-slate-300 shadow-sm flex items-center justify-center text-sm">⚙️</button>
          <button @click="exitGame" class="bg-red-400 text-white px-3 py-1.5 text-xs font-black rounded-xl border-b-4 border-red-600 shadow-sm">Keluar ↩</button>
        </div>
      </div>

      <div class="flex justify-center w-full pointer-events-auto mt-1">
        <div @click="triggerInstructionAudio" class="bg-white/95 border-4 border-amber-300 rounded-2xl py-2 px-4 shadow-md max-w-sm w-full text-center flex items-center justify-center gap-3 cursor-pointer">
          <span class="text-2xl animate-pulse">🗣️</span>
          <p class="text-xs md:text-sm font-black text-slate-700 leading-tight">{{ level.instruction }}</p>
        </div>
      </div>
    </div>

    <!-- Pilihan Jawaban Engine -->
    <div class="absolute inset-0 flex items-center justify-center p-6 z-20">
      <Transition name="slide-fade" mode="out-in">
        <div :key="level.id" class="w-full max-w-xl flex flex-wrap justify-center gap-4 mt-24">
          <ChoiceCard 
            v-for="choice in level.choices" 
            :key="choice.id"
            :choice="choice"
            :isSilhouette="level.type === 'silhouette' && !store.isLevelCleared"
            :isCleared="store.isLevelCleared"
            @select="handleAnswer(choice)"
          />
        </div>
      </Transition>
    </div>

    <div v-if="store.isLevelCleared" class="absolute inset-0 z-25 flex flex-col justify-center items-center pointer-events-none bg-white/20 backdrop-blur-[1px]">
      <div class="bg-emerald-400 text-white font-black text-2xl py-3 px-8 rounded-full border-b-8 border-emerald-600 shadow-2xl animate-bounce">
        {{ level.onomatope }} MANTAP! 🎉
      </div>
    </div>

    <!-- Modal Hasil Engine Interaksi -->
    <ResultModal 
      v-if="store.isLevelCleared" 
      @next="handleNextLevel"
      @menu="router.push('/smart-transport/levels')"
      @home="handleFinishGame"
    />

    <SettingsModal :isOpen="isSettingsOpen" @close="isSettingsOpen = false" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../../stores/smart-transport/gameStore';
import { useAudio } from '../../composables/smart-transport/useAudio';
import confetti from 'canvas-confetti';

import AnimatedBackground from '../../components/smart-transport/AnimatedBackground.vue';
import ProgressBar from '../../components/smart-transport/ProgressBar.vue';
import ChoiceCard from '../../components/smart-transport/ChoiceCard.vue';
import ResultModal from '../../components/smart-transport/ResultModal.vue';
import SettingsModal from '../../components/smart-transport/SettingsModal.vue';

const store = useGameStore();
const router = useRouter();

// Destruktur fungsi audio termasuk initAllSounds
const { initAllSounds, playSound, startMusic, stopMusic, playNarrator } = useAudio();

const isSettingsOpen = ref(false);
const level = computed(() => store.currentLevel);

const triggerInstructionAudio = () => {
  if (!store.isLevelCleared) {
    playNarrator(level.value.instruction);
  }
};

const triggerConfetti = () => {
  confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.8 } });
  confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.8 } });
};

const handleAnswer = (choice) => {
  // Panggil startMusic saat interaksi pertama jika audio context sempat ter-suspend oleh browser
  startMusic();

  if (choice.isCorrect) {
    playSound('pop');
    store.registerCorrectHit();
    triggerConfetti();
    setTimeout(() => { playSound('success'); }, 450);
  } else {
    playSound('wrong');
    store.registerWrongHit();
    triggerInstructionAudio();
    if ('vibrate' in navigator) navigator.vibrate(100);
  }
};

const handleNextLevel = () => {
  if (!store.isGameFullyCompleted) {
    store.setRandomNextLevel();
    setTimeout(() => { triggerInstructionAudio(); }, 600);
  }
};

const openSettings = () => {
  playSound('click');
  isSettingsOpen.value = true;
};

const handleFinishGame = () => {
  playSound('click');
  router.push('/');
};

const exitGame = () => {
  playSound('click');
  router.push('/');
};

watch(() => store.isMusicOn, (ready) => {
  ready ? startMusic() : stopMusic();
});

onMounted(async () => {
  // 1. Preload dan Decode seluruh buffer file audio terlebih dahulu
  await initAllSounds();

  // 2. Bersihkan instance musik yang tersisa dan mulai musik baru
  stopMusic();
  startMusic();

  // 3. Putar narasi instruksi awal
  setTimeout(() => { triggerInstructionAudio(); }, 800);
});

onUnmounted(() => {
  stopMusic();
});
</script>