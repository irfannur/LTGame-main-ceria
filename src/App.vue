<template>
  <div class="w-screen h-screen overflow-hidden select-none touch-none">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useGameStore } from './stores/gameStore';

const store = useGameStore();

onMounted(() => {
  store.resetLevelState();
});
</script>