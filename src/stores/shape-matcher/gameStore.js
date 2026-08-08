import { defineStore } from 'pinia';
import { useAuthStore } from '../authStore'; // Import Auth Store Central
import levelsData from '../../data/shape-matcher/levels.json'; // Sesuaikan lokasi levels.json jika ada penyesuaian folder

export const useShapeStore = defineStore('shapeMatcher', {
  state: () => ({
    levels: levelsData,
    currentLevelIndex: 0,
    completedLevels: JSON.parse(localStorage.getItem('sm_completed') || '[]'),
    totalStars: parseInt(localStorage.getItem('sm_stars') || '0', 10),

    // Audio & Mascot State
    isMusicOn: JSON.parse(localStorage.getItem('sm_music') ?? 'true'),
    isSoundOn: JSON.parse(localStorage.getItem('sm_sound') ?? 'true'),
    isNarratorOn: JSON.parse(localStorage.getItem('sm_narrator') ?? 'true'),
    matchedShapeIds: [],
    mascotMessage: 'Halo! Selamat datang di Shape Matcher!',
    isLevelCompleted: false,

    // State Modal Pengaturan
    isSettingsOpen: false
  }),

  getters: {
    // 1. Ambil status Demo langsung dari Auth Store Central
    isDemoAccount: () => {
      const authStore = useAuthStore();
      return authStore.isDemoAccount;
    },

    // 2. Ambil token/auth status jika diperlukan
    isAuthorized: () => {
      const authStore = useAuthStore();
      return authStore.isAuthorized;
    },

    currentLevel: (state) => state.levels[state.currentLevelIndex] || state.levels[0],
    isGameFullyCompleted: (state) => state.completedLevels.length >= state.levels.length,
    starsEarnedInCurrentLevel: (state) => {
      return state.matchedShapeIds.length * 3;
    }
  },

  actions: {
    selectLevel(id) {
      // Pembatasan Level khusus Mode Demo
      if (this.isDemoAccount && id > 1) {
        this.mascotMessage = 'Akses Terbatas! Silakan beli token resmi untuk membuka semua level.';
        return false;
      }

      const index = this.levels.findIndex(l => l.id === id);
      if (index !== -1) {
        this.currentLevelIndex = index;
        this.resetLevelState();
        return true;
      }
      return false;
    },

    resetLevelState() {
      this.matchedShapeIds = [];
      this.isLevelCompleted = false;
      this.mascotMessage = `Ayo pasangkan bentuk di level ${this.currentLevel.id}!`;
    },

    markShapeMatched(shapeId) {
      if (!this.matchedShapeIds.includes(shapeId)) {
        this.matchedShapeIds.push(shapeId);
        this.totalStars += 3;
        this.saveToStorage();

        if (this.matchedShapeIds.length === this.currentLevel.shapes.length) {
          this.isLevelCompleted = true;
          if (!this.completedLevels.includes(this.currentLevel.id)) {
            this.completedLevels.push(this.currentLevel.id);
            this.saveToStorage();
          }

          if (this.isDemoAccount) {
            this.mascotMessage = 'Hebat! Kamu telah menyelesaikan Level Demo. Beli token penuh untuk lanjut!';
          } else {
            this.mascotMessage = 'Hore! Kamu berhasil menyelesaikan level ini! 🌟';
          }
        } else {
          this.mascotMessage = 'Hebat! Lanjutkan bentuk berikutnya!';
        }
      }
    },

    nextLevel() {
      if (this.isDemoAccount) {
        this.mascotMessage = 'Silakan beli token resmi untuk membuka level selanjutnya!';
        return;
      }

      if (this.currentLevelIndex < this.levels.length - 1) {
        this.currentLevelIndex++;
        this.resetLevelState();
      }
    },

    resetAllProgress() {
      this.completedLevels = [];
      this.totalStars = 0;
      this.currentLevelIndex = 0;
      this.resetLevelState();
      localStorage.removeItem('sm_completed');
      localStorage.removeItem('sm_stars');
    },

    toggleMusic() {
      this.isMusicOn = !this.isMusicOn;
      localStorage.setItem('sm_music', JSON.stringify(this.isMusicOn));
    },

    toggleSound() {
      this.isSoundOn = !this.isSoundOn;
      localStorage.setItem('sm_sound', JSON.stringify(this.isSoundOn));
    },

    toggleNarrator() {
      this.isNarratorOn = !this.isNarratorOn;
      localStorage.setItem('sm_narrator', JSON.stringify(this.isNarratorOn));
    },

    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    },

    closeSettings() {
      this.isSettingsOpen = false;
    },

    setMascotMessage(msg) {
      this.mascotMessage = msg;
    },

    saveToStorage() {
      localStorage.setItem('sm_completed', JSON.stringify(this.completedLevels));
      localStorage.setItem('sm_stars', this.totalStars.toString());
    }
  }
});