import { ref } from 'vue';

export function useDrag() {
  const isDragging = ref(false);
  const dragPosition = ref({ x: 0, y: 0 });
  const startPosition = ref({ x: 0, y: 0 });

  const startDrag = (event, initialX = 0, initialY = 0) => {
    isDragging.value = true;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    startPosition.value = { x: initialX, y: initialY };
    dragPosition.value = { x: clientX, y: clientY };
  };

  const onDragMove = (event) => {
    if (!isDragging.value) return;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    dragPosition.value = { x: clientX, y: clientY };
  };

  const stopDrag = () => {
    isDragging.value = false;
  };

  return {
    isDragging,
    dragPosition,
    startPosition,
    startDrag,
    onDragMove,
    stopDrag
  };
}