<template>
  <button
    @click="$emit('select')"
    :disabled="isCleared"
    class="relative group flex flex-col items-center justify-center p-4 bg-white/90 backdrop-blur-md rounded-3xl border-4 border-sky-300 hover:border-amber-400 active:scale-95 transition-all shadow-xl min-w-[140px] md:min-w-[160px]"
  >
    <!-- 1. Tampilan Siluet / Bayangan -->
    <div v-if="isSilhouette" class="filter brightness-0 opacity-80 transition-all">
      <img 
        v-if="isImageUrl(choice.emoji)" 
        :src="choice.emoji" 
        :alt="choice.label" 
        class="w-20 h-20 md:w-24 md:h-24 object-contain"
      />
      <span v-else class="text-6xl md:text-7xl select-none block">
        {{ choice.emoji }}
      </span>
    </div>

    <!-- 2. Tampilan Normal (Gambar Lokal / URL / Emoji) -->
    <div v-else class="flex flex-col items-center gap-2">
      <!-- Jika bernilai URL Gambar atau Path Lokal (/img/...) -->
      <img 
        v-if="isImageUrl(choice.emoji)" 
        :src="choice.emoji" 
        :alt="choice.label" 
        class="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
      />
      <!-- Jika bernilai Emoji Biasa -->
      <span v-else class="text-6xl md:text-7xl select-none group-hover:scale-110 transition-transform">
        {{ choice.emoji }}
      </span>

      <!-- Label Nama Kendaraan -->
      <span class="text-base md:text-lg font-black text-slate-700 tracking-wide text-center">
        {{ choice.label }}
      </span>
    </div>
  </button>
</template>

<script setup>
defineProps({
  choice: {
    type: Object,
    required: true
  },
  isSilhouette: {
    type: Boolean,
    default: false
  },
  isCleared: {
    type: Boolean,
    default: false
  }
});

defineEmits(['select']);

// Fungsi deteksi: mengecek URL luar, path lokal (/img/..), maupun ekstensi file gambar
const isImageUrl = (val) => {
  if (!val) return false;
  return (
    val.startsWith('http://') || 
    val.startsWith('https://') || 
    val.startsWith('/img/') || 
    val.startsWith('/') || 
    /\.(png|jpe?g|svg|webp|gif)$/i.test(val)
  );
};
</script>