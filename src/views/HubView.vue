<template>
  <div class="w-screen h-screen flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-sky-300 via-sky-200 to-amber-100 font-kid overflow-hidden relative select-none">
    
    <!-- Latar Belakang Dekoratif (Floating Elements) -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-12 left-10 text-4xl sm:text-6xl opacity-25 animate-pulse">✨</div>
      <div class="absolute bottom-20 left-12 text-3xl sm:text-5xl opacity-20 animate-bounce">🎈</div>
      <div class="absolute top-1/3 right-10 text-4xl sm:text-6xl opacity-25 animate-pulse delay-700">🌟</div>
      <div class="absolute bottom-16 right-16 text-3xl sm:text-5xl opacity-20 animate-bounce delay-300">🧸</div>
    </div>

    <!-- Header Dashboard -->
    <header class="w-full max-w-5xl flex items-center justify-between z-10 gap-2 sm:gap-3">
      <!-- Info Profile Email & Status -->
      <div class="bg-white/90 backdrop-blur-md px-3 sm:px-5 py-2 rounded-2xl border-4 border-sky-300 shadow-md flex items-center gap-2 max-w-[55%] sm:max-w-none">
        <span class="text-lg sm:text-xl">👤</span>
        <span class="font-black text-sky-800 text-xs sm:text-sm truncate">{{ authStore.email }}</span>
        <span v-if="authStore.isDemoAccount" class="bg-amber-400 text-amber-900 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-black border border-amber-500 shadow-sm shrink-0">
          DEMO MODE
        </span>
      </div>

      <!-- Action Buttons (Tombol Info & Logout) -->
      <div class="flex items-center gap-2">
        <!-- Tombol Info -->
        <button 
          @click="showInfoModal = true"
          class="bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-amber-950 px-3 sm:px-4 py-2 rounded-2xl border-b-4 border-amber-600 shadow-md font-black active:translate-y-0.5 transition cursor-pointer text-xs sm:text-sm flex items-center gap-1.5 uppercase tracking-wide"
        >
          <span>ℹ️</span>
          <span class="hidden sm:inline">Info Game</span>
        </button>

        <!-- Tombol Keluar -->
        <button 
          @click="handleLogout"
          class="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white px-3 sm:px-4 py-2 rounded-2xl border-b-4 border-rose-700 shadow-md font-black active:translate-y-0.5 transition cursor-pointer text-xs sm:text-sm flex items-center gap-1.5 uppercase tracking-wide"
        >
          <span>Keluar</span>
          <span>🚪</span>
        </button>
      </div>
    </header>

    <!-- Judul Hub -->
    <main class="w-full max-w-5xl flex flex-col items-center justify-center my-auto z-10">
      <div class="text-center mb-6 sm:mb-8">
        <div class="inline-block bg-amber-300/80 border-2 border-amber-400 text-amber-900 font-black text-xs sm:text-sm px-4 py-1 rounded-full mb-2 shadow-sm">
          ARENA BERMAIN & BELAJAR 🎯
        </div>
        <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-sky-600 drop-shadow-[0_4px_0_rgba(255,255,255,1)] tracking-wide">
          LANGKAH TUMBUH GAMES
        </h1>
        <p class="text-slate-600 font-bold text-xs sm:text-base mt-1">
          Pilih permainan seru favoritmu di bawah ini! 👇
        </p>
      </div>

      <!-- Cards Pilihan Game -->
      <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-2">
        
        <!-- Card Game 1: Shape Matcher -->
        <div 
          @click="navigateTo('/shape-matcher/play')"
          class="bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-3xl border-8 border-amber-400 shadow-[0_12px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_35px_rgba(251,191,36,0.3)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between text-center group relative overflow-hidden"
        >
          <div class="w-20 h-20 bg-amber-100 rounded-2xl border-4 border-amber-300 flex items-center justify-center text-4xl sm:text-5xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
            🔷
          </div>
          <div>
            <h3 class="text-xl sm:text-2xl font-black text-amber-500 mb-1">Shape Matcher</h3>
            <p class="text-xs font-bold text-slate-500 leading-snug">Cocokkan bentuk geometri dan tingkatkan ketelitianmu!</p>
          </div>
          <button class="mt-5 w-full bg-amber-400 group-hover:bg-amber-500 text-white font-black py-2.5 rounded-xl text-sm shadow-[0_4px_0_#d97706] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider">
            MAIN NOW 🚀
          </button>
        </div>

        <!-- Card Game 2: Color Pop -->
        <div 
          @click="navigateTo('/color-pop/play')"
          class="bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-3xl border-8 border-rose-400 shadow-[0_12px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_35px_rgba(244,63,94,0.3)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between text-center group relative overflow-hidden"
        >
          <div class="w-20 h-20 bg-rose-100 rounded-2xl border-4 border-rose-300 flex items-center justify-center text-4xl sm:text-5xl mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
            🎨
          </div>
          <div>
            <h3 class="text-xl sm:text-2xl font-black text-rose-500 mb-1">Color Pop</h3>
            <p class="text-xs font-bold text-slate-500 leading-snug">Mengenal berbagai warna-warni menarik dan ceria!</p>
          </div>
          <button class="mt-5 w-full bg-rose-400 group-hover:bg-rose-500 text-white font-black py-2.5 rounded-xl text-sm shadow-[0_4px_0_#e11d48] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider">
            MAIN NOW 🚀
          </button>
        </div>

        <!-- Card Game 3: Smart Transport -->
        <div 
          @click="navigateTo('/smart-transport/play')"
          class="bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-3xl border-8 border-emerald-400 shadow-[0_12px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_35px_rgba(16,185,129,0.3)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between text-center group relative overflow-hidden"
        >
          <div class="w-20 h-20 bg-emerald-100 rounded-2xl border-4 border-emerald-300 flex items-center justify-center text-4xl sm:text-5xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
            🚗
          </div>
          <div>
            <h3 class="text-xl sm:text-2xl font-black text-emerald-500 mb-1">Smart Transport</h3>
            <p class="text-xs font-bold text-slate-500 leading-snug">Belajar jenis kendaraan darat, laut, & transportasi udara!</p>
          </div>
          <button class="mt-5 w-full bg-emerald-400 group-hover:bg-emerald-500 text-white font-black py-2.5 rounded-xl text-sm shadow-[0_4px_0_#059669] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider">
            MAIN NOW 🚀
          </button>
        </div>

      </div>
    </main>

    <!-- Branding Footer / Copyright Studio -->
    <footer class="z-10 mt-2">
      <div class="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border-2 border-amber-300/80 px-4 py-1.5 rounded-full shadow-sm text-xs font-black text-slate-600 hover:bg-white transition-all cursor-default">
        <span>🌱</span>
        <span>Crafted by <strong class="text-amber-600">Langkah Tumbuh Studio</strong></span>
      </div>
    </footer>

    <!-- MODAL INFO PEMASARAN GAME -->
    <Teleport to="body">
      <div v-if="showInfoModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 font-kid select-none animate-fade-in">
        <div class="bg-white rounded-3xl border-8 border-amber-400 max-w-2xl w-full max-h-[85vh] shadow-2xl flex flex-col relative overflow-hidden">
          
          <!-- Header Modal -->
          <div class="bg-gradient-to-r from-amber-300 to-amber-400 p-4 sm:p-5 flex items-center justify-between border-b-4 border-amber-500 shrink-0">
            <div class="flex items-center gap-2">
              <span class="text-2xl sm:text-3xl">🎈</span>
              <h2 class="text-xl sm:text-2xl font-black text-amber-950 uppercase tracking-wide">Tentang "Langkah Tumbuh Studio"</h2>
            </div>
            <button 
              @click="showInfoModal = false"
              class="w-10 h-10 bg-white/80 hover:bg-white text-rose-600 rounded-2xl font-black text-xl border-2 border-amber-500 flex items-center justify-center shadow-sm active:scale-90 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <!-- Body Modal (Scrollable Content) -->
          <div class="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
            
            <!-- Headline Utama -->
            <div class="bg-sky-50 border-4 border-sky-300 p-4 rounded-2xl text-center">
              <h3 class="text-lg sm:text-xl font-black text-sky-600 mb-1">
                Ubah Screen Time Jadi Playtime Berkualitas! 🎈✨
              </h3>
              <p class="font-bold text-xs sm:text-sm text-sky-800">
                Game Edukasi Interaktif Bebas Iklan untuk Si Kecil (Usia 1–5 Tahun)
              </p>
            </div>

            <!-- Deskripsi Singkat -->
            <div>
              <h4 class="font-black text-amber-600 text-base sm:text-lg mb-1 flex items-center gap-1.5">
                <span>📌</span> Deskripsi
              </h4>
              <p class="font-medium text-slate-600 text-xs sm:text-sm">
                Bingung memilih media bermain yang aman dan bermanfaat untuk tumbuh kembang si Kecil? <strong>langkahTumbuh</strong> hadir sebagai platform 3-in-1 game interaktif yang dirancang khusus untuk melatih stimulasi otak, kemampuan motorik, dan fokus anak sejak dini dengan cara yang sangat menyenangkan!
              </p>
            </div>

            <!-- 3 Game Seru -->
            <div>
              <h4 class="font-black text-amber-600 text-base sm:text-lg mb-3 flex items-center gap-1.5">
                <span>🎮</span> 3 Game Seru & Manfaat Perkembangannya
              </h4>
              <div class="space-y-3">
                
                <div class="bg-rose-50 border-2 border-rose-300 p-3 rounded-2xl">
                  <div class="font-black text-rose-600 text-sm sm:text-base mb-0.5 flex items-center gap-1">
                    <span>🔴</span> ColorPop (Pecah Balon Warna)
                  </div>
                  <p class="text-xs sm:text-sm font-medium text-slate-600">
                    <strong>Manfaat:</strong> Mengasah motorik halus dan koordinasi mata-tangan saat mengetuk balon, serta mempercepat pengenalan warna dasar lewat respon visual dan audio instan.
                  </p>
                </div>

                <div class="bg-amber-50 border-2 border-amber-300 p-3 rounded-2xl">
                  <div class="font-black text-amber-600 text-sm sm:text-base mb-0.5 flex items-center gap-1">
                    <span>🧩</span> ShapeMatcher (Pasang Bentuk Geometri)
                  </div>
                  <p class="text-xs sm:text-sm font-medium text-slate-600">
                    <strong>Manfaat:</strong> Melatih kemampuan kognitif, spasial, dan pemecahan masalah (problem solving). Anak belajar menganalisis bentuk, ukuran, dan mencocokkan bayangan secara presisi.
                  </p>
                </div>

                <div class="bg-emerald-50 border-2 border-emerald-300 p-3 rounded-2xl">
                  <div class="font-black text-emerald-600 text-sm sm:text-base mb-0.5 flex items-center gap-1">
                    <span>🚗</span> Tebak Gambar Transportasi (10 Level Tantangan)
                  </div>
                  <p class="text-xs sm:text-sm font-medium text-slate-600">
                    <strong>Manfaat:</strong> Mengembangkan daya ingat (memori visual & auditori), memperluas kosakata, serta melatih logika kategorisasi (membedakan kendaraan darat, laut, dan udara beserta suaranya).
                  </p>
                </div>

              </div>
            </div>

            <!-- Mengapa Orang Tua Menyukai -->
            <div>
              <h4 class="font-black text-amber-600 text-base sm:text-lg mb-3 flex items-center gap-1.5">
                <span>🛡️</span> Mengapa Orang Tua Menyukai langkahTumbuh ?
              </h4>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-medium">
                <li class="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-start gap-2">
                  <span class="text-base shrink-0">🧠</span>
                  <span><strong>Stimulasi Sensorik Seimbang:</strong> Dilengkapi suara narator ramah anak dan efek audio asli tanpa over-stimulation.</span>
                </li>
                <li class="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-start gap-2">
                  <span class="text-base shrink-0">🚫</span>
                  <span><strong>100% Bebas Iklan & Aman:</strong> Tanpa pop-up iklan tidak pantas, salah klik, atau pembelian tersembunyi.</span>
                </li>
                <li class="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-start gap-2">
                  <span class="text-base shrink-0">🎯</span>
                  <span><strong>Bebas Frustrasi:</strong> Tanpa sistem "Game Over" mendorong anak berani mencoba & percaya diri.</span>
                </li>
                <li class="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-start gap-2">
                  <span class="text-base shrink-0">📱</span>
                  <span><strong>Praktis & Ringan:</strong> Cukup buka di browser HP, Tablet, atau Laptop tanpa perlu unduh aplikasi.</span>
                </li>
              </ul>
            </div>

            <!-- Call To Action Bottom -->
            <div class="bg-gradient-to-r from-emerald-400 to-teal-500 text-white p-4 rounded-2xl text-center shadow-md">
              <div class="font-black text-sm sm:text-base mb-1">🎁 Sekali Bayar untuk Akses Tanpa Batas!</div>
              <p class="text-xs sm:text-sm font-bold opacity-90">
                Dampingi langkah emas tumbuh kembang si Kecil hari ini.
              </p>
            </div>

          </div>

          <!-- Footer Modal -->
          <div class="p-3 sm:p-4 bg-slate-50 border-t-2 border-slate-200 text-center shrink-0">
            <button 
              @click="showInfoModal = false"
              class="w-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-2.5 rounded-2xl shadow-[0_4px_0_#d97706] active:shadow-none active:translate-y-1 transition cursor-pointer text-sm uppercase tracking-wider"
            >
              Tutup Info & Mulai Main 🚀
            </button>
          </div>

        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const showInfoModal = ref(false);

const navigateTo = (path) => {
  router.push(path);
};

const handleLogout = () => {
  authStore.logout();
  router.push('/access');
};
</script>