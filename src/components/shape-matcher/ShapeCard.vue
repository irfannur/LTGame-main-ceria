<template>
  <div
    ref="cardRef"
    @mousedown="handleStart"
    @touchstart.prevent="handleStart"
    class="relative select-none touch-none flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform"
    :class="[
      isMatched ? 'opacity-0 pointer-events-none' : '',
      isShaking ? 'animate-bounce' : ''
    ]"
    :style="cardStyle"
  >
    <!-- Opsi Visual: Emoji Teks / Gambar Lokal / Gambar Remote -->
    <div class="flex flex-col items-center justify-center p-2">
      <img 
        v-if="isImageUrl(shape.display)" 
        :src="shape.display" 
        :alt="shape.label"
        class="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-md" 
      />
      <span 
        v-else 
        class="text-6xl sm:text-7xl filter drop-shadow-md transform transition-transform hover:scale-110"
        :style="{ transform: `rotate(${shape.rotation || 0}deg)` }"
      >
        {{ shape.display }}
      </span>
      <span v-if="shape.label" class="mt-1 text-xs font-black text-slate-700 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
        {{ shape.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  shape: {
    type: Object,
    required: true
  },
  isMatched: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['drag-start']);
const cardRef = ref(null);
const isShaking = ref(false);

const handleStart = (e) => {
  if (props.isMatched) return;
  const rect = cardRef.value.getBoundingClientRect();
  emit('drag-start', {
    event: e,
    shape: props.shape,
    rect
  });
};

const isImageUrl = (val) => {
  if (!val) return false;
  return (
    val.startsWith('http://') ||
    val.startsWith('https://') ||
    val.startsWith('/') ||
    /\.(png|jpe?g|svg|webp)$/i.test(val)
  );
};

const cardStyle = computed(() => {
  let scale = 'scale(1)';
  if (props.shape.size === 'small') scale = 'scale(0.8)';
  if (props.shape.size === 'large') scale = 'scale(1.2)';

  return {
    transform: `${scale}`
  };
});
</script>