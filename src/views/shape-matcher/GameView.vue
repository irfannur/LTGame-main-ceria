<template>
  <div class="w-screen h-screen flex flex-col bg-gradient-to-b from-sky-200 to-sky-100 font-kid overflow-hidden relative">
    <Header 
      @open-menu="goLevelSelect"
      @open-settings="openSettings"
    />

    <!-- Game Board Canvas -->
    <main class="flex-1 w-full h-full relative overflow-hidden">
      <GameBoard :level="store.currentLevel" />
    </main>

    <!-- Modal Hasil Level -->
    <ResultModal 
      v-if="store.isLevelCompleted"
      @next="handleNextLevel"
      @menu="goLevelSelect"
      @reset="handleReset"
    />

    <!-- Modal Pengaturan (Menggunakan state dari Pinia Store) -->
    <SettingsModal />
  </div>
</template>

<script setup>
import { onUnmounted, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useShapeStore } from '../../stores/shape-matcher/gameStore.js';
import Header from '../../components/shape-matcher/Header.vue';
import GameBoard from '../../components/shape-matcher/GameBoard.vue';
import ResultModal from '../../components/shape-matcher/ResultModal.vue';
import SettingsModal from '../../components/shape-matcher/SettingsModal.vue';
import { useAudio } from '../../composables/shape-matcher/useAudio.js';

const router = useRouter();
const store = useShapeStore();
const { playSoundEffect, stopMusic, playMusic } = useAudio();

const goLevelSelect = () => {
  playSoundEffect('click');
  router.push('/levels');
};

const handleNextLevel = () => {
  playSoundEffect('click');
  if (store.isGameFullyCompleted) {
    store.selectLevel(1);
  } else {
    store.nextLevel();
  }
};

const handleReset = () => {
  playSoundEffect('click');
  store.selectLevel(1);
};

const openSettings = () => {
  playSoundEffect('click');
  store.toggleSettings();
};

onMounted(() => {
  playMusic();
});

onUnmounted(() => {
  stopMusic();
});
</script>