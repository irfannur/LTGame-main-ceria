<template>
  <div class="min-h-screen w-full bg-sky-100 flex flex-col items-center justify-center p-4 font-kid relative overflow-hidden">
    <!-- Background Hiasan -->
    <SkyBackground />

    <div class="w-full max-w-md bg-white/90 backdrop-blur-md rounded-[2.5rem] border-8 border-sky-400 p-6 md:p-8 text-center shadow-2xl relative z-10">
      <div class="text-6xl mb-2">🔑</div>
      <h1 class="text-3xl font-black text-sky-600 tracking-wide mb-1">ColorPop Gate</h1>
      <p class="text-slate-500 font-bold text-sm mb-6">Masukkan Kode Token Berlangganan Anda Untuk Bermain</p>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div>
          <input 
            v-model="tokenInput"
            type="password" 
            placeholder="Contoh: CP-XXXX-XXXX" 
            class="w-full text-center px-4 py-3 text-lg border-4 border-slate-200 rounded-2xl focus:outline-none focus:border-sky-400 transition font-mono uppercase font-bold text-slate-700"
            :disabled="isLoading"
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm font-bold animate-pulse">
          ❌ {{ errorMessage }}
        </p>

        <button 
          type="submit"
          class="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white font-black text-xl py-3.5 rounded-2xl shadow-lg border-b-4 border-blue-600 active:scale-95 transition flex items-center justify-center gap-2"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="animate-spin text-xl">⏳</span>
          {{ isLoading ? 'Memverifikasi...' : 'Masuk Game 🚀' }}
        </button>
      </form>

      <div class="mt-6 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-400">
        Hubungi pengembang untuk mendapatkan token resmi jika Anda membeli aplikasi ini.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../../stores/color-pop/gameStore';
import SkyBackground from '../../components/color-pop/SkyBackground.vue';

const tokenInput = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const store = useGameStore();
const router = useRouter();

const handleSubmit = async () => {
  if (!tokenInput.value.trim()) {
    errorMessage.value = "Token tidak boleh kosong!";
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  
  const isValid = await store.validateToken(tokenInput.value.trim().toUpperCase());
  isLoading.value = false;

  if (isValid) {
    router.push({ name: 'Home' });
  } else {
    errorMessage.value = "Token salah atau sudah kadaluarsa!";
  }
};
</script>