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
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/gameStore';
import Header from '../components/Header.vue';
import GameBoard from '../components/GameBoard.vue';
import ResultModal from '../components/ResultModal.vue';
import SettingsModal from '../components/SettingsModal.vue';
import { useAudio } from '../composables/useAudio';

const router = useRouter();
const store = useGameStore();
const { playSoundEffect } = useAudio();

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
</script>