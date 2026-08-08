<!-- InstructionBox.vue -->
<template>
  <div class="w-full max-w-md bg-white/95 border-4 border-sky-400 rounded-3xl p-4 shadow-xl text-center font-kid relative animate-fade-in">
    <!-- Bubble Pointer Arrow -->
    <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-sky-400"></div>
    
    <h2 class="text-1xl text-slate-500 font-extrabold mb-1 uppercase tracking-wider">Misi Kamu:</h2>
    <div class="text-2xl md:text-3xl font-black tracking-wide text-slate-800">
      Pecahkan balon warna 
      <span 
        class="inline-block px-3 py-1 rounded-2xl border-2 text-white drop-shadow-sm font-black mx-1 transform scale-105"
        :style="{ backgroundColor: store.colorMap[store.targetColor]?.hex, borderColor: 'rgba(0,0,0,0.1)' }"
      >
        {{ store.targetColorName }}
      </span>
    </div>

    <!-- Tombol Suara Ulang Narator Aktif Kembali -->
    <button 
      @click="speakMission"
      class="mt-3 bg-sky-100 hover:bg-sky-200 text-sky-600 rounded-full p-2 px-4 text-xs font-bold flex items-center gap-1.5 mx-auto transition active:scale-95 pointer-events-auto"
    >
      🔊 Dengar Suara Narator
    </button>
  </div>
</template>

<script setup>
import { watch, onMounted, ref } from 'vue';
import { useGameStore } from '../../stores/color-pop/gameStore';
import { useAudio } from '../../composables/color-pop/useAudio';

const store = useGameStore();
const { playNarrator } = useAudio();

// Menyimpan waktu terakhir narator berbunyi (dalam milidetik)
const lastSpokenTime = ref(0); 
// Atur batas jeda antar ucapan di sini (misal: 4000ms = 4 detik)
const COOLDOWN_DURATION = 15000; 

// Fungsi untuk membacakan teks kalimat misi lengkap dengan proteksi durasi
const speakMission = (force = false) => {
  if (!store.targetColorName) return;

  const currentTime = Date.now();
  
  // Jika tombol manual ditekan (force = true), langsung bunyikan.
  // Jika dipicu otomatis oleh pergantian level/warna, cek apakah sudah melewati durasi cooldown.
  if (force || (currentTime - lastSpokenTime.value > COOLDOWN_DURATION)) {
    playNarrator(`Pecahkan balon warna ${store.targetColorName}`);
    lastSpokenTime.value = currentTime; // Perbarui waktu terakhir berbunyi
  }
};

// Otomatis bersuara saat target warna berganti (misi baru), terlindungi oleh cooldown
// watch(() => store.targetColor, () => {
//   // Beri sedikit jeda mikro render, lalu jalankan pengecekan cooldown
//   setTimeout(() => {
//     speakMission(false); 
//   }, 100);
// });

// Bersuara sekali di awal saat halaman game pertama kali terbuka
// onMounted(() => {
//   setTimeout(() => {
//     speakMission(false);
//   }, 500); // Jeda awal 500ms agar lebih ramah saat game baru dimuat
// });
</script>