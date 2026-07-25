<template>
  <div class="flex flex-col items-center cursor-pointer group" @click="handleClick">
    <SpeechBubble :text="store.mascotMessage" class="mb-2" />
    <div class="text-6xl sm:text-7xl group-hover:scale-110 active:scale-95 transition-transform animate-float select-none filter drop-shadow-md">
      🐥
    </div>
  </div>
</template>

<script setup>
import SpeechBubble from './SpeechBubble.vue';
import { useGameStore } from '../stores/gameStore';
import { useAudio } from '../composables/useAudio';

const store = useGameStore();
const { playNarrator, playSoundEffect } = useAudio();

const handleClick = () => {
  playSoundEffect('pop');
  playNarrator(store.mascotMessage);
};
</script>