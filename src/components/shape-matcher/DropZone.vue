<template>
  <div
    ref="targetRef"
    class="relative flex flex-col items-center justify-center p-3 rounded-3xl border-4 border-dashed transition-all duration-300"
    :class="[
      isMatched 
        ? 'border-emerald-400 bg-emerald-100/80 scale-105 shadow-lg' 
        : 'border-slate-400/60 bg-slate-200/50 hover:border-sky-400'
    ]"
    :style="zoneStyle"
  >
    <!-- Jika Sudah Terpasang -->
    <template v-if="isMatched">
      <span class="text-6xl sm:text-7xl animate-pulse">
        {{ matchedShapeData?.display || '✨' }}
      </span>
      <span class="text-xs font-black text-emerald-800 bg-white/90 px-2 py-0.5 rounded-full mt-1">
        Sempurna!
      </span>
    </template>

    <!-- Bayangan Siluet (Target) -->
    <template v-else>
      <div class="filter brightness-0 opacity-25">
        <span class="text-6xl sm:text-7xl block" :style="{ transform: `rotate(${target.rotation || 0}deg)` }">
          {{ getTargetEmoji(target.type) }}
        </span>
      </div>
      <span class="mt-1 text-xs font-bold text-slate-500">
        {{ target.label }}
      </span>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  target: {
    type: Object,
    required: true
  },
  isMatched: {
    type: Boolean,
    default: false
  },
  matchedShapeData: {
    type: Object,
    default: null
  }
});

const targetRef = ref(null);

const getTargetEmoji = (type) => {
  const map = {
    circle: '🔴',
    square: '🟦',
    triangle: '🔺',
    star: '⭐',
    heart: '🩷',
    oval: '🟣',
    rhombus: '🔷',
    pentagon: '⬟',
    hexagon: '⬢',
    rectangle: '🟧'
  };
  return map[type] || '❓';
};

const zoneStyle = computed(() => {
  let scale = 'scale(1)';
  if (props.target.size === 'small') scale = 'scale(0.85)';
  if (props.target.size === 'large') scale = 'scale(1.15)';

  return {
    transform: scale
  };
});

defineExpose({ targetRef });
</script>