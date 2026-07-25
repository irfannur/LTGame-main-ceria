import { defineStore } from 'pinia';
import levelsData from '../data/levels.json';

export const useGameStore = defineStore('game', {
  state: () => ({
    levels: levelsData,
    currentLevelIndex: 0,
    completedLevels: JSON.parse(localStorage.getItem('sm_completed') || '[]'),
    totalStars: parseInt(localStorage.getItem('sm_stars') || '0', 10),

    // Auth & Token State (Menggunakan penamaan standar game sebelumnya)
    token: localStorage.getItem('tp_token') || localStorage.getItem('sm_token') || '',
    isTokenValidated: !!(localStorage.getItem('tp_token') || localStorage.getItem('sm_token')),
    appsScriptUrl: import.meta.env.VITE_API_URL || '',

    // Audio & Mascot State
    isMusicOn: JSON.parse(localStorage.getItem('sm_music') ?? 'true'),
    isSoundOn: JSON.parse(localStorage.getItem('sm_sound') ?? 'true'),
    isNarratorOn: JSON.parse(localStorage.getItem('sm_narrator') ?? 'true'),
    matchedShapeIds: [],
    mascotMessage: 'Halo! Masukkan token untuk mulai bermain!',
    isLevelCompleted: false,

    // State Modal Pengaturan
    isSettingsOpen: false
  }),

  getters: {
    // Getter pengaman untuk router / vue view (memastikan token terverifikasi)
    isAuthorized: (state) => state.isTokenValidated && !!state.token,
    
    currentLevel: (state) => state.levels[state.currentLevelIndex] || state.levels[0],
    isGameFullyCompleted: (state) => state.completedLevels.length >= state.levels.length,
    starsEarnedInCurrentLevel: (state) => {
      return state.matchedShapeIds.length * 3;
    }
  },

  actions: {
    // Action Validasi Token (Mekanisme JSONP disesuaikan dengan Apps Script Lama)
    async validateToken(inputToken) {
      if (!inputToken) return false;

      // Bypass langsung jika token DEMO2026
      if (inputToken === "DEMO2026") {
        this.setAuth(inputToken);
        return true;
      }

      return new Promise((resolve) => {
        const callbackName = 'jsonp_callback_' + Math.random().toString(36).substring(2, 11);

        window[callbackName] = (data) => {
          document.body.removeChild(script);
          delete window[callbackName];

          // Cek kelayakan dari Apps Script Lama (hanya butuh data.isValid === true)
          if (data && data.isValid) {
            this.setAuth(inputToken);
            resolve(true);
          } else {
            resolve(false);
          }
        };

        const script = document.createElement('script');
        const sheetName = import.meta.env.VITE_SHEET_NAME || '';

        // Request ke Google Apps Script lama menggunakan JSONP
        script.src = `${this.appsScriptUrl}?token=${encodeURIComponent(inputToken)}&sheetName=${encodeURIComponent(sheetName)}&callback=${callbackName}`;
        
        script.onerror = () => {
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
          delete window[callbackName];
          resolve(false);
        };

        document.body.appendChild(script);
      });
    },

    setAuth(inputToken) {
      this.token = inputToken;
      this.isTokenValidated = true;
      localStorage.setItem('sm_token', inputToken);
      localStorage.setItem('tp_token', inputToken);
    },

    logout() {
      this.token = '';
      this.isTokenValidated = false;
      localStorage.removeItem('sm_token');
      localStorage.removeItem('tp_token');
    },

    selectLevel(id) {
      const index = this.levels.findIndex(l => l.id === id);
      if (index !== -1) {
        this.currentLevelIndex = index;
        this.resetLevelState();
      }
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
          this.mascotMessage = 'Hore! Kamu berhasil menyelesaikan level ini! 🌟';
        } else {
          this.mascotMessage = 'Hebat! Lanjutkan bentuk berikutnya!';
        }
      }
    },

    nextLevel() {
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

    // Action Tambahan untuk Modal Pengaturan
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