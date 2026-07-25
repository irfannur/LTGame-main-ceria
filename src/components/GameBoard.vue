<template>
  <div class="relative w-full h-full flex flex-col justify-between p-4 overflow-hidden">
    <!-- Header Progres & Maskot -->
    <div class="w-full flex items-center justify-between z-10 gap-2">
      <ProgressBar />
      <Mascot />
    </div>

    <!-- Area Bermain Utama -->
    <div class="flex-1 w-full flex flex-col md:flex-row items-center justify-around gap-6 my-2 z-10">
      
      <!-- SISI KIRI: Pilihan Bentuk yang Ditarik -->
      <div class="flex flex-wrap justify-center items-center gap-4 bg-white/40 backdrop-blur-md p-4 rounded-3xl border-2 border-white shadow-md max-w-sm sm:max-w-md">
        <ShapeCard
          v-for="shape in level.shapes"
          :key="shape.id"
          :shape="shape"
          :isMatched="store.matchedShapeIds.includes(shape.id)"
          @drag-start="handleDragStart"
        />
      </div>

      <!-- SISI KANAN: Target Bayangan / Silhouette Zone -->
      <div class="flex flex-wrap justify-center items-center gap-4 bg-white/60 backdrop-blur-md p-4 rounded-3xl border-2 border-sky-200 shadow-md max-w-sm sm:max-w-md">
        <DropZone
          v-for="target in level.targets"
          :key="target.id"
          :ref="(el) => setTargetRef(target.id, el)"
          :target="target"
          :isMatched="isTargetMatched(target.id)"
          :matchedShapeData="getMatchedShapeData(target.id)"
        />
      </div>
    </div>

    <!-- ELEMEN TERAPUNG SAAT DRAGGING (GHOST ELEMENT) -->
    <div
      v-if="activeDragShape"
      class="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 filter drop-shadow-2xl scale-125 transition-transform"
      :style="{ left: `${dragPosition.x}px`, top: `${dragPosition.y}px` }"
    >
      <span class="text-7xl block">
        {{ activeDragShape.display }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../stores/gameStore';
import { useAudio } from '../composables/useAudio';
import { useSnap } from '../composables/useSnap';
import { useAnimation } from '../composables/useAnimation';
import ProgressBar from './ProgressBar.vue';
import Mascot from './Mascot.vue';
import ShapeCard from './ShapeCard.vue';
import DropZone from './DropZone.vue';

const props = defineProps({
  level: {
    type: Object,
    required: true
  }
});

const store = useGameStore();
const { playSoundEffect, playNarrator } = useAudio();
const { isSnapValid } = useSnap(60); // Distance threshold 60px
const { triggerSmallSparkle, triggerConfetti } = useAnimation();

const activeDragShape = ref(null);
const dragPosition = ref({ x: 0, y: 0 });
const targetRefs = ref({});

const setTargetRef = (id, el) => {
  if (el) targetRefs.value[id] = el;
};

const handleDragStart = ({ event, shape }) => {
  activeDragShape.value = shape;
  playSoundEffect('pop');

  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const clientY = event.touches ? event.touches[0].clientY : event.clientY;
  dragPosition.value = { x: clientX, y: clientY };

  window.addEventListener('mousemove', handlePointerMove);
  window.addEventListener('touchmove', handlePointerMove, { passive: false });
  window.addEventListener('mouseup', handlePointerEnd);
  window.addEventListener('touchend', handlePointerEnd);
};

const handlePointerMove = (e) => {
  if (!activeDragShape.value) return;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  dragPosition.value = { x: clientX, y: clientY };
};

const handlePointerEnd = (e) => {
  if (!activeDragShape.value) return;

  const currentShape = activeDragShape.value;
  const targetId = currentShape.targetId;
  const targetComponent = targetRefs.value[targetId];

  let matched = false;

  if (targetComponent && targetComponent.$el) {
    const rect = targetComponent.$el.getBoundingClientRect();
    const targetCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    if (isSnapValid(dragPosition.value, targetCenter)) {
      matched = true;
      store.markShapeMatched(currentShape.id);
      playSoundEffect('correct');
      triggerSmallSparkle(targetCenter.x, targetCenter.y);

      if (store.isLevelCompleted) {
        playSoundEffect('celebration');
        triggerConfetti();
        playNarrator('Luar biasa! Kamu berhasil menyelesaikannya!');
      } else {
        playNarrator('Hebat!');
      }
    }
  }

  if (!matched) {
    playSoundEffect('wrong');
    store.setMascotMessage('Coba pasangkan lagi ya!');
  }

  activeDragShape.value = null;
  window.removeEventListener('mousemove', handlePointerMove);
  window.removeEventListener('touchmove', handlePointerMove);
  window.removeEventListener('mouseup', handlePointerEnd);
  window.removeEventListener('touchend', handlePointerEnd);
};

const isTargetMatched = (targetId) => {
  const shape = props.level.shapes.find(s => s.targetId === targetId);
  return shape ? store.matchedShapeIds.includes(shape.id) : false;
};

const getMatchedShapeData = (targetId) => {
  return props.level.shapes.find(s => s.targetId === targetId) || null;
};

onMounted(() => {
  playNarrator(props.level.description || 'Pasangkan bentuk yang cocok!');
});
</script>