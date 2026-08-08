<!-- src/components/DemoUpgradeModal.vue -->
<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 font-kid">
      <div class="bg-white rounded-[2.5rem] border-4 border-amber-400 p-6 max-w-sm w-full text-center relative shadow-2xl animate-bounce-short">
        
        <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl shadow-inner border-2 border-amber-300">
          🔒
        </div>

        <h3 class="text-2xl font-black text-amber-600 mb-2 tracking-wide">
          LEVEL TERKUNCI!
        </h3>

        <p class="text-slate-600 text-sm font-bold leading-relaxed mb-5">
          Saat ini Anda menggunakan <span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-black">Versi Demo</span> (Hanya Level 1).
          <br/><br/>
          Ingin membuka **semua level**, warna lengkap, dan fitur penuh untuk Si Kecil? 🎈
        </p>

        <a 
          :href="purchaseUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="block w-full bg-gradient-to-r from-emerald-400 to-green-500 hover:brightness-105 text-white font-black text-lg py-3.5 rounded-2xl shadow-lg border-b-4 border-green-700 active:scale-95 transition mb-3"
        >
          🛒 Beli Akses Penuh Sekarang
        </a>

        <button 
          @click="$emit('close')" 
          class="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-2 rounded-xl text-xs transition"
        >
          Nanti Saja
        </button>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  purchaseUrl: {
    type: String,
    default: 'https://wa.me/6281234567890?text=Saya%20ingin%20membeli%20akses%20full%20ColorPop'
  }
});

defineEmits(['close']);
</script>