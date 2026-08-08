<template>
  <div class="h-dvh w-full bg-gradient-to-b from-sky-300 to-sky-100 flex flex-col justify-center items-center p-6 font-kid relative">
    <div class="absolute top-10 w-24 h-24 bg-white/40 rounded-full blur-md animate-pulse"></div>
    
    <div class="bg-white/95 border-4 border-sky-400 rounded-[2.5rem] p-6 w-full max-w-sm text-center shadow-2xl z-10">
      <div class="text-5xl mb-2">🎈</div>
      <h1 class="text-3xl font-black text-sky-500 drop-shadow-sm tracking-wide">TRANSPORTASI PINTAR</h1>
      <p class="text-xs font-extrabold text-slate-400 uppercase tracking-widest mt-1 mb-6">Akses Kode Masuk</p>
      
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <input 
          v-model="inputToken" 
          type="password" 
          maxlength="20"
          placeholder="Masukkan Token Anda..." 
          :disabled="isLoading"
          class="w-full text-center p-3 border-4 border-slate-200 rounded-2xl font-black text-lg focus:outline-none focus:border-sky-400 transition"
        />
        
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-black text-xl py-3.5 rounded-2xl border-b-4 border-emerald-600 shadow-md active:scale-95 transition flex justify-center items-center"
        >
          <span v-if="isLoading" class="animate-spin text-xl">⏳</span>
          <span v-else>Masuk Game ✈️</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/gameStore';

const store = useGameStore();
const router = useRouter();
const inputToken = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  if (!inputToken.value.trim()) return;
  isLoading.value = true;
  const success = await store.validateToken(inputToken.value.trim());
  isLoading.value = false;
  
  if (success) {
    router.push('/');
  } else {
    alert('Token salah atau periksa koneksi internet Anda!');
  }
};
</script>