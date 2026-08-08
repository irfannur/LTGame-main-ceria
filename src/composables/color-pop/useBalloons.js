import { ref } from 'vue';

export function useBalloons(currentLevel, colorMap) {
  const balloons = ref([]);
  let currentId = 0;

  // Algoritma pengecekan overlap agar balon tidak menumpuk saat spawn baru
  const checkOverlap = (newX, size) => {
    return balloons.value.some(b => {
      const distance = Math.abs(b.x - newX);
      return distance < (size + b.size) * 0.6; // Toleransi kedekatan 60%
    });
  };

  const spawnBalloon = () => {
    if (balloons.value.length >= currentLevel.value.maxBalloons) return;

    const size = Math.floor(Math.random() * 25) + 65; // Ukuran bervariasi antara 65px - 90px
    const colors = currentLevel.value.colors;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    let x = Math.floor(Math.random() * (window.innerWidth - size - 40)) + 20;
    
    // Retry posisi jika terdeteksi tabrakan horizontal
    let attempts = 0;
    while (checkOverlap(x, size) && attempts < 5) {
      x = Math.floor(Math.random() * (window.innerWidth - size - 40)) + 20;
      attempts++;
    }

    // Variasi kecepatan minor pada setiap balon individual
    const speedModifier = Math.random() * (currentLevel.value.speedMax - currentLevel.value.speedMin) + currentLevel.value.speedMin;
    
    balloons.value.push({
      id: ++currentId,
      color,
      size,
      x,
      y: window.innerHeight + size, // Mulai dari dasar luar layar bawah
      speed: speedModifier,
      wobbleSpeed: Math.random() * 2 + 1,
      wobblePhase: Math.random() * Math.PI * 2,
      isPopping: false,
      isWobblingWrong: false
    });
  };

  const updateBalloons = (deltaTime) => {
    // Kurangi balon yang keluar batas layar atas secara otomatis
    balloons.value = balloons.value.filter(b => {
      if (b.isPopping) return true; // Biarkan animasi pop selesai
      b.y -= b.speed * deltaTime * 60; // Normalisasi fps dengan deltaTime sekitar 60Hz
      b.wobblePhase += b.wobbleSpeed * deltaTime;
      return b.y > -b.size * 2;
    });
  };

  return { balloons, spawnBalloon, updateBalloons };
}