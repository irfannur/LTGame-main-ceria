<template>
  <div 
    class="absolute cursor-pointer select-none touch-none will-change-transform"
    :style="{
      transform: `translate3d(${adjustedX}px, ${balloon.y}px, 0) scale(${scale})`,
      width: `${balloon.size}px`,
      height: `${balloon.size * 1.2}px`,
      transition: balloon.isWobblingWrong ? 'transform 0.1s ease-in-out' : 'none'
    }"
    @pointerdown="handleTap"
  >
    <!-- Tali Balon -->
    <svg class="absolute left-1/2 top-[98%] -translate-x-1/2" :width="10" :height="40">
      <path d="M5,0 Q8,15 2,25 T5,40" fill="none" stroke="#adb5bd" stroke-width="2" />
    </svg>

    <!-- Struktur Badan Balon Murni CSS -->
    <div 
      class="w-full h-full rounded-[50%_50%_50%_50%/_45%_45%_55%_55%] relative shadow-inner"
      :style="{ backgroundColor: config.colorMap[balloon.color].hex }"
      :class="[
        balloon.isWobblingWrong ? 'animate-shake' : '',
        balloon.isPopping ? 'animate-pop-out' : ''
      ]"
    >
      <!-- Efek Kilau Highlight Glossy -->
      <div class="absolute top-[10%] left-[15%] w-1/4 h-1/5 bg-white opacity-40 rounded-full"></div>

      <!-- Wajah Balon Lucu (Eyes & Smile) -->
      <div class="absolute inset-0 flex flex-col justify-center items-center pointer-events-none" v-if="!balloon.isPopping">
        <div class="flex gap-2 justify-center items-center mb-1">
          <!-- Mata Kiri -->
          <div class="w-3 h-3 bg-white rounded-full flex items-center justify-center relative">
            <div class="w-1.5 h-1.5 bg-black rounded-full absolute top-0.5 left-0.5"></div>
          </div>
          <!-- Mata Kanan -->
          <div class="w-3 h-3 bg-white rounded-full flex items-center justify-center relative">
            <div class="w-1.5 h-1.5 bg-black rounded-full absolute top-0.5 left-0.5"></div>
          </div>
        </div>
        <!-- Mulut Tersenyum -->
        <div class="w-4 h-2 border-b-2 border-black rounded-b-full"></div>
      </div>

      <!-- Simpul Bawah Balon -->
      <div 
        class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-3 h-2 clip-triangle"
        :style="{ borderBottomColor: config.colorMap[balloon.color].hex }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useGameStore } from '../../stores/color-pop/gameStore';

const props = defineProps({
  balloon: Object
});
const emit = defineEmits(['pop', 'wrong']);
const config = useGameStore();
const scale = ref(1);

// Efek Floating Wobble Natural Berdasarkan Waktu / Sinus
const adjustedX = computed(() => {
  if (props.balloon.isWobblingWrong || props.balloon.isPopping) return props.balloon.x;
  return props.balloon.x + Math.sin(props.balloon.wobblePhase) * 12;
});

const handleTap = () => {
  if (props.balloon.isPopping || props.balloon.isWobblingWrong) return;

  scale.value = 1.15; // Efek membesar sedikit seketika disentuh anak-anak
  
  if (props.balloon.color === config.targetColor) {
    props.balloon.isPopping = true;
    emit('pop', props.balloon.id);
  } else {
    props.balloon.isWobblingWrong = true;
    emit('wrong', props.balloon.id);
    // Kembalikan status getar salah setelah 400ms
    setTimeout(() => {
      props.balloon.isWobblingWrong = false;
      scale.value = 1;
    }, 400);
  }
};
</script>

<style scoped>
.clip-triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}
.animate-shake {
  animation: shake 0.1s linear infinite;
}
@keyframes popOut {
  0% { transform: scale(1.15); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.5; filter: blur(2px); }
  100% { transform: scale(0); opacity: 0; }
}
.animate-pop-out {
  animation: popOut 0.2s forwards ease-out;
}
</style>