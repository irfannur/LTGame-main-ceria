import { useGameStore } from '../../stores/color-pop/gameStore';

let bgMusicSource = null;
let bgMusicGainNode = null; 
let audioContext = null;
const audioBuffers = {};

// Helper untuk mengambil/membuat AudioContext hanya saat dibutuhkan
function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

// Pre-warm dan tambahkan listener voiceschanged di level modul
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

export function useAudio() {
  const store = useGameStore();

  const loadSound = async (name, url) => {
    try {
      const ctx = getAudioContext();
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      const arrayBuffer = await response.arrayBuffer();
      audioBuffers[name] = await ctx.decodeAudioData(arrayBuffer);
    } catch (e) {
      console.error(`Gagal memuat audio: ${name} (${url})`, e);
    }
  };

  const ensureAudioActive = async () => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    return ctx;
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

      bgMusicGainNode = ctx.createGain();
      bgMusicGainNode.gain.setValueAtTime(1.0, ctx.currentTime); 

      bgMusicSource = ctx.createBufferSource();
      bgMusicSource.buffer = audioBuffers['bg-music'];
      bgMusicSource.loop = true;

      bgMusicSource.connect(bgMusicGainNode);
      bgMusicGainNode.connect(ctx.destination);
      
      bgMusicSource.start(0);
    } catch (e) {
      console.warn('Gagal memutar musik:', e);
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
      { name: 'bg-music', url: '/audio/color-pop/bg-music.mp3' },
      { name: 'click', url: '/audio/color-pop/click.mp3' },
      { name: 'pop', url: '/audio/color-pop/pop.mp3' },
      { name: 'success', url: '/audio/color-pop/success.mp3' },
      { name: 'wrong', url: '/audio/color-pop/wrong.mp3' }
    ];
    await Promise.all(assets.map(asset => loadSound(asset.name, asset.url)));
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  };

  const colorTranslation = {
    'red': 'merah',
    'blue': 'biru',
    'yellow': 'kuning',
    'green': 'hijau',
    'purple': 'ungu',
    'orange': 'oranye',
    'pink': 'merah muda',
    'brown': 'cokelat',
    'black': 'hitam',
    'white': 'putih'
  };

  const playNarrator = async (text) => {
    if (!store.isNarratorOn || !('speechSynthesis' in window)) return;

    try {
      const ctx = await ensureAudioActive();

      // Paksa reset status jika sintetis sedang macet/berjalan
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      let cleanedText = text.trim().toLowerCase();
      if (colorTranslation[cleanedText]) {
        cleanedText = `Pecahkan balon warna ${colorTranslation[cleanedText]}`;
      } else {
        Object.keys(colorTranslation).forEach((engColor) => {
          if (cleanedText.includes(engColor)) {
            cleanedText = cleanedText.replace(engColor, colorTranslation[engColor]);
          }
        });
      }

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      utterance.pitch = 1.15;

      utterance.onstart = () => {
        if (bgMusicGainNode && ctx) {
          bgMusicGainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
        }
      };

      utterance.onend = () => {
        if (bgMusicGainNode && ctx) {
          bgMusicGainNode.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.3);
        }
      };

      utterance.onerror = () => {
        if (bgMusicGainNode && ctx) {
          bgMusicGainNode.gain.setValueAtTime(1.0, ctx.currentTime);
        }
      };

      // Pilih suara Bahasa Indonesia jika ada
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.includes('id') || v.lang.startsWith('id'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      // Berikan sedikit delay 50ms setelah cancel() agar browser siap memutar
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 50);

    } catch (err) {
      console.error('Gagal memutar narator Color Pop:', err);
    }
  };

  return { initAllSounds, playSound, startMusic, stopMusic, playNarrator };
}