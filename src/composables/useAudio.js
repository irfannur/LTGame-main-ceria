import { useGameStore } from '../stores/gameStore';

// Singleton Instance agar audio tidak terduplikasi/double
let bgMusicAudio = null;
let successAudio = null;

export function useAudio() {
  const store = useGameStore();

  const playSoundEffect = (type) => {
    if (!store.isSoundOn) return;

    try {
      // Jika jawaban benar: Putar success.mp3 DAN nada synth simultan
      if (type === 'correct') {
        if (!successAudio) {
          successAudio = new Audio('/audio/success.mp3');
          successAudio.volume = 0.6;
        }
        successAudio.currentTime = 0;
        successAudio.play().catch((err) => {
          console.warn('Gagal memutar success.mp3:', err);
        });

        // Nada synth "Hebat" (C5 -> E5 -> G5)
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.35);

        osc.start();
        osc.stop(ctx.currentTime + 0.35);

        return;
      }

      // Synth Efek Suara Lainnya
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'pop' || type === 'click') {
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'celebration' || type === 'magic') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      console.warn('Audio Context Error:', e);
    }
  };

  const playNarrator = (text) => {
    if (!store.isNarratorOn) return;

    if (typeof window.responsiveVoice !== 'undefined') {
      if (window.responsiveVoice.isPlaying()) {
        window.responsiveVoice.cancel();
      }
      window.responsiveVoice.speak(text, 'Indonesian Female', {
        rate: 0.85,
        pitch: 1.15,
        volume: 1
      });
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.85;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playMusic = () => {
    // Jika musik dimatikan di pengaturan, hentikan penuh
    if (!store.isMusicOn) {
      stopMusic();
      return;
    }

    if (!bgMusicAudio) {
      bgMusicAudio = new Audio('/audio/bg-music.mp3');
      bgMusicAudio.loop = true;
      bgMusicAudio.volume = 0.3;
    }

    // Cegah double play
    if (bgMusicAudio.paused) {
      bgMusicAudio.play().catch((error) => {
        console.warn('Autoplay terhalang browser:', error);
      });
    }
  };

  const stopMusic = () => {
    if (bgMusicAudio) {
      bgMusicAudio.pause();
      bgMusicAudio.currentTime = 0;
    }
  };

  const toggleMusic = () => {
    store.toggleMusic();
    if (store.isMusicOn) {
      playMusic();
    } else {
      stopMusic();
    }
  };

  return { playSoundEffect, playNarrator, playMusic, stopMusic, toggleMusic };
}