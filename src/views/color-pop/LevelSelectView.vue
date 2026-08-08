<template>
  <div class="h-dvh w-full relative p-6 font-kid flex flex-col overflow-hidden">
    <SkyBackground />

    <div class="flex items-center gap-4 mb-6 z-10 flex-shrink-0">
      <button @click="router.push('/')" class="bg-white rounded-full p-2 shadow border font-bold text-lg active:scale-90 transition">↩ Beranda</button>
      <h1 class="text-3xl font-black text-slate-800 tracking-wide">Pilih Map Level</h1>
    </div>

    <!-- Kotak Grid Level -->
    <div class="overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 z-10 flex-1 content-start">
      <button 
        v-for="lvl in store.levels" 
        :key="lvl.id"
        @click="selectLevel(lvl.id)"
        class="aspect-square bg-white border-4 rounded-[2rem] p-4 flex flex-col justify-between items-center transition relative shadow-md"
        :class="[
          isUnlocked(lvl.id)
            ? 'border-yellow-400 hover:scale-105 cursor-pointer' 
            : 'border-slate-300 bg-slate-100/80 opacity-60 cursor-not-allowed'
        ]"
      >
        <!-- Penanda Kunci -->
        <div v-if="!isUnlocked(lvl.id)" class="text-3xl absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 rounded-[1.8rem]">
          🔒
          <span v-if="store.isDemo" class="text-[9px] bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full font-black uppercase mt-1">
            Demo
          </span>
        </div>

        <div class="text-xs font-bold text-slate-400 uppercase">Level</div>
        <div class="text-4xl font-black text-yellow-600" v-if="isUnlocked(lvl.id)">{{ lvl.id }}</div>
        <div class="text-4xl font-black text-slate-400" v-else>{{ lvl.id }}</div>
        
        <!-- Badge Nama Warna Singkat di Level Itu -->
        <div class="text-[10px] text-center font-extrabold truncate w-full text-slate-500 bg-slate-100 px-1 py-0.5 rounded-md">
          {{ lvl.theme }}
        </div>
      </button>
    </div>

    <!-- Modal Pembelian untuk Pengguna DEMO -->
    <DemoUpgradeModal 
      :isOpen="showDemoModal" 
      @close="showDemoModal = false" 
      purchaseUrl="https://wa.me/6281234567890?text=Saya%20ingin%20membeli%20akses%20full%20ColorPop"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../../stores/color-pop/gameStore';
import { useAudio } from '../../composables/color-pop/useAudio';
import SkyBackground from '../../components/color-pop/SkyBackground.vue';
import DemoUpgradeModal from '../../components/color-pop/DemoUpgradeModal.vue';

const store = useGameStore();
const router = useRouter();
const { playSound } = useAudio();

const showDemoModal = ref(false);

const isUnlocked = (levelId) => {
  if (store.isDemo) {
    return levelId === 1;
  }
  return levelId <= store.highestLevelUnlocked;
};

const selectLevel = (id) => {
  if (isUnlocked(id)) {
    playSound('click');
    store.setLevel(id);
    router.push('/color-pop/play');
  } else {
    playSound('wrong');
    if (store.isDemo) {
      showDemoModal.value = true;
    }
  }
};
</script>