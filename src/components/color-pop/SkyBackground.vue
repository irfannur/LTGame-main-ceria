<!-- src/components/SkyBackground.vue -->
<template>
  <div class="fixed inset-0 overflow-hidden bg-gradient-to-b from-sky-200 to-sky-100 z-0 select-none pointer-events-none">
    <!-- Sun dipindah ke kiri agar tidak tertutup StarCounter di kanan atas -->
    <Sun class="absolute top-28 left-6" />
    
    <Cloud :delay="0" :top="12" :speed="25" />
    <Cloud :delay="6" :top="25" :speed="35" />
    <Cloud :delay="3" :top="38" :speed="20" />
    
    <!-- z-index rumput diturunkan ke z-20 agar balon muncul dari belakang rumput dan tidak menutupi modal -->
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-500 to-green-400 border-t-4 border-green-300 z-20">
      <div class="absolute top-1 left-4 flex gap-10 opacity-70">
        <span class="text-2xl">🌸</span><span class="text-xl">🌼</span><span class="text-2xl">🌸</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sun from './Sun.vue';
import Cloud from './Cloud.vue';
</script>