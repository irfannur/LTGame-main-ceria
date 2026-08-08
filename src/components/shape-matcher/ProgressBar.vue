<template>
  <div class="w-full max-w-xs sm:max-w-md bg-white/70 backdrop-blur-sm p-2 rounded-full border-2 border-sky-300 shadow-inner">
    <div class="flex justify-between text-xs font-bold text-sky-800 mb-1 px-2">
      <span>Progres Level {{ store.currentLevel.id }}</span>
      <span>{{ store.matchedShapeIds.length }} / {{ store.currentLevel.shapes.length }}</span>
    </div>
    <div class="w-full bg-slate-200 h-4 rounded-full overflow-hidden border border-slate-300">
      <div 
        class="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-500 rounded-full"
        :style="{ width: `${progressPercentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useShapeStore } from '../../stores/shape-matcher/gameStore';

const store = useShapeStore();

const progressPercentage = computed(() => {
  const total = store.currentLevel.shapes.length;
  if (!total) return 0;
  return (store.matchedShapeIds.length / total) * 100;
});
</script>