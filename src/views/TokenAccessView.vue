<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-300 via-sky-200 to-amber-100 font-kid overflow-hidden relative select-none">
    
    <!-- Latar Belakang Dekoratif (Floating Elements) -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-10 left-10 text-4xl sm:text-6xl opacity-30 animate-pulse">⭐</div>
      <div class="absolute bottom-12 left-1/4 text-3xl sm:text-5xl opacity-20 animate-bounce">🎨</div>
      <div class="absolute top-1/4 right-10 text-4xl sm:text-6xl opacity-30 animate-pulse delay-500">🚀</div>
      <div class="absolute bottom-10 right-1/4 text-3xl sm:text-5xl opacity-20 animate-bounce delay-300">🎮</div>
    </div>

    <!-- Container Card Login / Token -->
    <div class="bg-white/95 backdrop-blur-md rounded-3xl border-8 border-amber-400 p-6 sm:p-8 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-center transform hover:scale-[1.01] transition-all duration-300 relative z-10">
      
      <!-- Badge Header Icon -->
      <div class="inline-flex items-center justify-center bg-amber-100 border-4 border-amber-400 rounded-full w-20 h-20 mb-3 shadow-inner transform -rotate-3 hover:rotate-6 transition-transform">
        <span class="text-4xl animate-bounce">🔑</span>
      </div>
      
      <h1 class="text-3xl sm:text-4xl font-black text-sky-600 mb-1 drop-shadow-sm tracking-wide">
        SELAMAT DATANG!
      </h1>
      <p class="text-slate-500 font-bold text-xs sm:text-sm mb-6 leading-relaxed">
        Masukkan email & password kamu untuk membuka semua permainan seru! 🎮
      </p>

      <!-- Form Input Email & Password -->
      <form @submit.prevent="handleSubmitToken" class="space-y-4">
        <div class="space-y-3">
          <!-- Input Email -->
          <div class="relative">
            <input 
              v-model="inputEmail"
              type="email"
              placeholder="Email"
              class="w-full text-center text-base sm:text-lg font-bold bg-sky-50/80 border-4 border-sky-300 focus:border-amber-400 focus:bg-white text-sky-900 rounded-2xl py-3 px-4 outline-none transition-all placeholder:text-slate-400 placeholder:font-bold shadow-inner"
              :disabled="isLoading"
            />
          </div>

          <!-- Input Password + Toggle Show Password -->
          <div class="relative">
            <input 
              v-model="inputToken"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="w-full text-center text-base sm:text-lg font-black tracking-wider uppercase bg-sky-50/80 border-4 border-sky-300 focus:border-amber-400 focus:bg-white text-sky-900 rounded-2xl py-3 px-10 outline-none transition-all placeholder:text-slate-400 placeholder:font-bold placeholder:normal-case shadow-inner"
              :disabled="isLoading"
            />
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-600 font-bold text-sm p-1 transition"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <!-- Pesan Error / Notifikasi -->
        <transition name="fade">
          <div v-if="errorMessage" class="bg-rose-100 border-2 border-rose-300 text-rose-700 text-xs sm:text-sm font-bold p-3 rounded-xl animate-shake shadow-sm">
            {{ errorMessage }}
          </div>
        </transition>

        <!-- Tombol Masuk -->
        <button 
          type="submit"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xl py-3.5 rounded-2xl shadow-[0_6px_0_#047857] active:shadow-none active:translate-y-1 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
        >
          <span v-if="isLoading" class="inline-flex items-center gap-2">
            Mengecek Akses... <span class="animate-spin">⏳</span>
          </span>
          <span v-else class="inline-flex items-center gap-2">
            MASUK & MAIN! 🚀
          </span>
        </button>
      </form>

      <!-- Informasi Token Demo / Beli Token -->
      <div class="mt-6 pt-4 border-t-2 border-dashed border-slate-200 text-xs text-slate-500 font-bold space-y-2">
        <p class="flex items-center justify-center gap-1">
          Coba gratis akun demo: 
          <button @click="useDemoToken" class="text-amber-600 hover:text-amber-700 underline font-black cursor-pointer transition">
            Klik di sini 🎁
          </button>
        </p>
        <p>
          Belum punya akses? 
          <a :href="authStore.buyTokenUrl" target="_blank" rel="noopener noreferrer" class="text-sky-600 hover:text-sky-700 underline font-black transition">
            Beli Token Resmi 🛒
          </a>
        </p>
      </div>

    </div>

    <!-- Branding Footer / Copyright Studio -->
    <div class="mt-6 z-10">
      <div class="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border-2 border-amber-300/80 px-4 py-1.5 rounded-full shadow-sm text-xs font-black text-slate-600 hover:bg-white transition-all cursor-default">
        <span>🌱</span>
        <span>Crafted by <strong class="text-amber-600">Langkah Tumbuh Studio</strong></span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const inputEmail = ref('');
const inputToken = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const handleSubmitToken = async () => {
  if (!inputEmail.value.trim() || !inputToken.value.trim()) {
    errorMessage.value = 'Mohon isi email dan password secara lengkap ya! 😊';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const isValid = await authStore.validateToken(inputToken.value, inputEmail.value);

    if (isValid) {
      router.push('/');
    } else {
      errorMessage.value = 'Email atau Password tidak cocok/aktif! Silakan periksa kembali. ❌';
    }
  } catch (err) {
    errorMessage.value = 'Terjadi kesalahan saat memeriksa akses. Coba lagi nanti.';
  } finally {
    isLoading.value = false;
  }
};

const useDemoToken = () => {
  inputEmail.value = 'demo@mail.com';
  inputToken.value = 'DEMO2026';
  handleSubmitToken();
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>