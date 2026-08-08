<!-- src/components/ScoreBoard.vue -->
<template>
  <div class="bg-white/90 border-4 border-yellow-400 rounded-2xl p-3 shadow-md flex items-center gap-4 select-none font-kid min-w-[140px] w-1">
    <!-- Kolom Skor -->
    <div class="flex flex-col items-center flex-1">
      <span class="text-xs text-slate-500 font-black tracking-wider uppercase">Skor</span>
      <div class="flex items-baseline gap-0.5">
        <!-- Skor Saat Ini -->
        <span class="text-3xl font-black text-amber-500">{{ store.score }}</span>
        <!-- Pembatas / Target Skor -->
        <span class="text-sm font-bold text-slate-400">/ {{ store.currentLevel?.targetScore || 10 }}</span>
      </div>
    </div>

    <!-- Garis Pembatas Vertikal -->
    <!-- <div class="w-0.5 h-8 bg-slate-250 rounded-full"></div> -->

    <!-- Kolom Combo -->
    <!-- <div class="flex flex-col items-center flex-1">
      <span class="text-xs text-slate-500 font-black tracking-wider uppercase">Combo</span>
      <span class="text-2xl font-black text-rose-500">{{ store.combo }}x</span>
    </div> -->
  </div>
</template>

<script setup>
import { useGameStore } from '../../stores/color-pop/gameStore';
const store = useGameStore();
</script>