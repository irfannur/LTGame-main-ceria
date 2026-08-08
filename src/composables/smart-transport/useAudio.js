import { useGameStore } from '../../stores/smart-transport/gameStore';

let bgMusicSource = null;
let bgMusicGainNode = null;
let audioContext = null;
const audioBuffers = {};

// Helper untuk mengambil/membuat AudioContext hanya saat dibutuhkan (Lazy Loading)
function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

// Pre-warm dan daftarkan event listener voiceschanged di level modul
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

export function useAudio() {
  const store = useGameStore();

  const ensureAudioActive = async () => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    return ctx;
  };

  const loadSound = async (name, url) => {
    try {
      const ctx = getAudioContext();
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      const arrayBuffer = await response.arrayBuffer();
      audioBuffers[name] = await ctx.decodeAudioData(arrayBuffer);
    } catch (e) {
      console.error(`Gagal memuat audio smart-transport: ${name} (${url})`, e);
    }
  };

  const playSound = async (name) => {
    if (!store.isSoundOn || !audioBuffers[name]) return;
    
    try {
      const ctx = await ensureAudioActive();
      const source = ctx.createBufferSource();
      source.buffer = audioBuffers[name];
      source.connect(ctx.destination);
      source.start(0);
    } catch (e) {
      console.warn('Gagal memutar sound effect:', e);
    }
  };

  const startMusic = async () => {
    if (!store.isMusicOn || bgMusicSource) return;
    if (!audioBuffers['bg-music']) return;

    try {
      const ctx = await ensureAudioActive();

      // Hentikan sisa instance musik lama jika ada
      stopMusic();

      bgMusicGainNode = ctx.createGain();
      bgMusicGainNode.gain.setValueAtTime(0.5, ctx.currentTime);

      bgMusicSource = ctx.createBufferSource();
      bgMusicSource.buffer = audioBuffers['bg-music'];
      bgMusicSource.loop = true;

      bgMusicSource.connect(bgMusicGainNode);
      bgMusicGainNode.connect(ctx.destination);
      bgMusicSource.start(0);
    } catch (e) {
      console.warn('Gagal memutar bg-music:', e);
    }
  };

  const stopMusic = () => {
    if (bgMusicSource) {
      try {
        bgMusicSource.stop(0);
        bgMusicSource.disconnect();
      } catch (e) {}
      bgMusicSource = null;
      bgMusicGainNode = null;
    }
  };

  const initAllSounds = async () => {
    const assets = [
      { name: 'bg-music', url: '/audio/smart-transport/bg-music.mp3' },
      { name: 'click', url: '/audio/smart-transport/click.mp3' },
      { name: 'pop', url: '/audio/smart-transport/pop.mp3' },
      { name: 'success', url: '/audio/smart-transport/success.mp3' },
      { name: 'wrong', url: '/audio/smart-transport/wrong.mp3' }
    ];
    await Promise.all(assets.map(asset => loadSound(asset.name, asset.url)));

    // Pre-warm daftar suara browser
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  };

  const playNarrator = async (text) => {
    // 1. Cek sakelar narator dan dukungan browser
    if (!store.isNarratorOn || !('speechSynthesis' in window)) return;

    try {
      const ctx = await ensureAudioActive();

      // 2. Paksa reset status jika sintetis sedang macet/berjalan
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // 3. Buat objek Utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.85; // Kecepatan bicara ramah anak
      utterance.pitch = 1.1;  // Nada suara ramah

      // 4. Ducking Effect (mengecilkan volume musik saat narator bicara)
      utterance.onstart = () => {
        if (bgMusicGainNode && ctx) {
          bgMusicGainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
        }
      };

      utterance.onend = () => {
        if (bgMusicGainNode && ctx) {
          bgMusicGainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.3);
        }
      };

      utterance.onerror = () => {
        if (bgMusicGainNode && ctx) {
          bgMusicGainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        }
      };

      // 5. Cari dan prioritaskan suara Bahasa Indonesia
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.includes('id') || v.lang.startsWith('id'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      // 6. Jalankan narator dengan jeda 50ms agar cancel() tuntas
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 50);

    } catch (err) {
      console.error('Gagal memutar narator Smart Transport:', err);
    }
  };

  return { initAllSounds, playSound, startMusic, stopMusic, playNarrator };
}