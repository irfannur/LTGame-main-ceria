<!-- src/components/ResultModal.vue -->
<template>
  <!-- 1. Teleport untuk Modal Kemenangan (ResultModal) -->
  <Teleport to="body">
    <div class="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-kid">
      <div class="bg-white border-8 border-yellow-400 rounded-[2.5rem] w-full max-w-sm p-6 text-center shadow-2xl transform scale-100 transition-all">
        
        <!-- Trofi Atas -->
        <div class="text-6xl mb-2 animate-bounce">🏆</div>
        
        <h2 class="text-3xl font-black text-yellow-500 tracking-wide mb-1">HEBAT!</h2>
        <p class="text-slate-600 font-bold mb-4">Kamu Menyelesaikan Level {{ store.currentLevelId }}</p>
        
        <!-- Bintang Rating Dinamis -->
        <div class="flex justify-center gap-3 text-5xl mb-6">
          <span :class="stars >= 1 ? 'opacity-100 scale-110 drop-shadow-md' : 'opacity-30'">⭐</span>
          <span :class="stars >= 2 ? 'opacity-100 scale-120 drop-shadow-md' : 'opacity-30'">⭐</span>
          <span :class="stars === 3 ? 'opacity-100 scale-110 drop-shadow-md' : 'opacity-30'">⭐</span>
        </div>

        <!-- Detail Pencapaian -->
        <div class="bg-slate-50 rounded-2xl p-3 border border-slate-100 mb-6 flex justify-around text-sm font-bold">
          <div>
            <span class="text-green-500 block">Benar</span>
            <span class="text-slate-800 text-lg font-black">{{ store.correctCount }}🎈</span>
          </div>
          <div class="w-[1px] bg-slate-200"></div>
          <div>
            <span class="text-amber-500 block">Salah Ketuk</span>
            <span class="text-slate-800 text-lg font-black">{{ store.wrongCount }}❌</span>
          </div>
        </div>

        <!-- Tombol Aksi Ukuran Besar -->
        <div class="flex flex-col gap-3">
          <button 
            v-if="!store.isLastLevel"
            @click="handleNextLevelClick"
            class="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl py-3.5 text-xl font-black shadow-md border-b-4 border-emerald-600 active:transform active:scale-95 transition"
          >
            Level Selanjutnya ▶
          </button>
          <button 
            v-else
            @click="emit('home')"
            class="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-2xl py-3.5 text-xl font-black shadow-md border-b-4 border-indigo-600"
          >
            🎉 Tamat! Ke Beranda
          </button>
          
          <div class="flex gap-2">
            <button @click="emit('replay')" class="flex-1 bg-amber-400 text-white border-b-4 border-amber-600 rounded-xl py-2 font-black text-sm">Main Lagi</button>
            <button @click="emit('change-level')" class="flex-1 bg-sky-400 text-white border-b-4 border-sky-600 rounded-xl py-2 font-black text-sm">Pilih Level</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- 2. Modal Upgrade DEMO (Di luar Teleport utama agar z-index [9999] bekerja independen) -->
  <DemoUpgradeModal 
    :isOpen="showDemoModal" 
    @close="showDemoModal = false" 
    purchaseUrl="https://wa.me/6281234567890?text=Saya%20ingin%20membeli%20akses%20full%20ColorPop"
  />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useGameStore } from '../../stores/color-pop/gameStore';
import confetti from 'canvas-confetti';
import DemoUpgradeModal from './DemoUpgradeModal.vue';

const store = useGameStore();
const emit = defineEmits(['next-level', 'replay', 'change-level', 'home']);

const showDemoModal = ref(false);

const stars = computed(() => {
  if (store.wrongCount === 0) return 3;
  if (store.wrongCount <= 2) return 2;
  return 1;
});

// Pengecekan klik level selanjutnya
const handleNextLevelClick = () => {
  if (store.isDemo) {
    showDemoModal.value = true;
  } else {
    emit('next-level');
  }
};

onMounted(() => {
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.1, y: 0.8 },
      zIndex: 10000 
    });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.9, y: 0.8 },
      zIndex: 10000 
    });
  }, 150);
});
</script>