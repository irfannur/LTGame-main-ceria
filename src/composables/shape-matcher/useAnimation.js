import confetti from 'canvas-confetti';

export function useAnimation() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#f59e0b', '#ec4899', '#10b981', '#a855f7']
    });
  };

  const triggerSmallSparkle = (x, y) => {
    const originX = x / window.innerWidth;
    const originY = y / window.innerHeight;
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { x: originX, y: originY },
      ticks: 100,
      colors: ['#fbbf24', '#f43f5e', '#38bdf8']
    });
  };

  return { triggerConfetti, triggerSmallSparkle };
}