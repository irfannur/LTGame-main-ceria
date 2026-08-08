<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 font-kid relative overflow-hidden">
    
    <!-- Card Utama Gate Token -->
    <div class="bg-white/90 backdrop-blur-md rounded-[2.5rem] border-8 border-amber-400 p-6 sm:p-8 max-w-md w-full text-center shadow-2xl z-10 animate-fade-in">
      
      <div class="text-6xl mb-3 animate-bounce">🔑</div>
      
      <h1 class="text-3xl font-black text-sky-600 mb-1">MASUKKAN TOKEN</h1>
      <p class="text-slate-600 text-sm font-bold mb-6">
        Minta token membuka permainan!
      </p>

      <!-- Input Form -->
      <form @submit.prevent="verifyToken" class="flex flex-col gap-4">
        <div class="relative">
          <input
            v-model="inputToken"
            type="text"
            placeholder="Ketik Token Di Sini..."
            class="w-full text-center font-black text-2xl tracking-wider py-3.5 px-4 rounded-2xl border-4 border-sky-300 focus:border-amber-400 focus:outline-none uppercase bg-sky-50/50 text-slate-800 placeholder-slate-400 shadow-inner"
            :disabled="isLoading"
            required
          />
        </div>

        <!-- Pesan Error -->
        <p v-if="errorMessage" class="text-rose-500 font-bold text-xs bg-rose-50 border border-rose-200 p-2 rounded-xl">
          ⚠️ {{ errorMessage }}
        </p>

        <!-- Tombol Submit -->
        <button
          type="submit"
          :disabled="isLoading || !inputToken.trim()"
          class="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-black text-xl py-4 rounded-2xl shadow-lg border-b-6 border-amber-600 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="isLoading" class="animate-spin text-2xl">🌀</span>
          <span>{{ isLoading ? 'MEMERIKSA...' : 'MASUK GAME 🚀' }}</span>
        </button>
      </form>

      <!-- Tombol Reset Token (Jika Ingin Ganti Akun) -->
      <button 
        v-if="store.isAuthorized" 
        @click="handleLogout"
        class="mt-4 text-xs font-bold text-slate-400 hover:text-slate-600 underline"
      >
        Ganti Token / Keluar ({{ store.studentName }})
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useShapeStore } from '../../stores/shape-matcher/gameStore';
// import { useAudio } from '../composables/useAudio'; // Opsional jika ada composable audio

const router = useRouter();
const store = useShapeStore();

const inputToken = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const verifyToken = async () => {
  const token = inputToken.value.trim();
  if (!token) return;

  isLoading.value = true;
  errorMessage.value = '';

  const isValid = await store.validateToken(token);

  isLoading.value = false;

  if (isValid) {
    // Arahkan ke Home terlebih dahulu setelah token berhasil terverifikasi
    router.push('/');
  } else {
    errorMessage.value = 'Token tidak valid atau tidak aktif. Periksa kembali!';
  }
};
</script>