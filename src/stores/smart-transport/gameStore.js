import { defineStore } from 'pinia';
import { useAuthStore } from '../authStore'; // Integrasi dengan Auth Store Central
import levelsData from '../../data/smart-transport/levels.json';

export const useGameStore = defineStore('smartTransportGame', {
  state: () => {
    // Helper fungsi pembaca boolean localStorage yang aman
    const getStorageBool = (key, defaultValue = true) => {
      const item = localStorage.getItem(key);
      if (item === null || item === undefined) return defaultValue;
      return item === 'true';
    };

    return {
      // Kontrol Modal Pembelian versi Demo
      showBuyModal: false,
      buyUrl: 'https://tokomu.com/beli-colorpop',

      // Game Settings (Menggunakan parsing boolean yang aman)
      isMusicOn: getStorageBool('tp_music', true),
      isSoundOn: getStorageBool('tp_sound', true),
      isNarratorOn: getStorageBool('tp_narrator', true), // Wajib default TRUE

      // Progress Tracker
      currentLevelId: parseInt(localStorage.getItem('tp_current_level') || '1'),
      highestLevelUnlocked: parseInt(localStorage.getItem('tp_highest_level') || '1'),
      totalStars: parseInt(localStorage.getItem('tp_total_stars') || '0'),
      completedList: JSON.parse(localStorage.getItem('tp_completed_list') || '[]'),

      // Gameplay Live State
      isLevelCleared: false,
      starsEarned: 0,
      wrongCount: 0,

      // Static Data
      levels: levelsData
    };
  },

  getters: {
    // Membaca status Mode Demo dari Auth Store Terpusat
    isDemo: () => {
      const authStore = useAuthStore();
      return authStore.isDemoAccount;
    },

    isAuthorized: () => {
      const authStore = useAuthStore();
      return authStore.isAuthorized;
    },

    currentLevel: (state) => state.levels.find(l => l.id === state.currentLevelId) || state.levels[0],
    
    isGameFullyCompleted: (state) => state.completedList.length >= state.levels.length,
    
    progressPercentage: (state) => {
      if (state.levels.length === 0) return 0;
      return Math.min(100, Math.round((state.completedList.length / state.levels.length) * 100));
    }
  },

  actions: {
    triggerBuyModal() {
      this.showBuyModal = true;
    },

    registerCorrectHit() {
      this.isLevelCleared = true;
      
      let finalStars = 3;
      if (this.wrongCount === 1) finalStars = 2;
      else if (this.wrongCount > 1) finalStars = 1;

      this.starsEarned = finalStars;
      this.totalStars += finalStars;
      localStorage.setItem('tp_total_stars', this.totalStars.toString());

      if (!this.completedList.includes(this.currentLevelId)) {
        this.completedList.push(this.currentLevelId);
        localStorage.setItem('tp_completed_list', JSON.stringify(this.completedList));
      }

      if (this.highestLevelUnlocked < this.levels.length) {
        this.highestLevelUnlocked = Math.min(this.levels.length, this.completedList.length + 1);
        localStorage.setItem('tp_highest_level', this.highestLevelUnlocked.toString());
      }
    },

    setRandomNextLevel() {
      this.isLevelCleared = false;
      this.wrongCount = 0;

      if (this.isDemo) {
        this.currentLevelId = 1;
        this.triggerBuyModal();
        return;
      }

      const remaining = this.levels.filter(l => !this.completedList.includes(l.id));

      if (remaining.length > 0) {
        const randomIndex = Math.floor(Math.random() * remaining.length);
        this.currentLevelId = remaining[randomIndex].id;
      } else {
        this.completedList = [];
        localStorage.setItem('tp_completed_list', JSON.stringify([]));
        const randomIndex = Math.floor(Math.random() * this.levels.length);
        this.currentLevelId = this.levels[randomIndex].id;
      }
      localStorage.setItem('tp_current_level', this.currentLevelId.toString());
    },

    registerWrongHit() {
      this.wrongCount++;
    },

    setLevel(levelId) {
      if (this.isDemo && levelId > 1) {
        this.triggerBuyModal();
        return false;
      }
      this.currentLevelId = levelId;
      this.isLevelCleared = false;
      this.wrongCount = 0;
      localStorage.setItem('tp_current_level', this.currentLevelId.toString());
      return true;
    },

    resetAllProgress() {
      this.currentLevelId = 1;
      this.highestLevelUnlocked = 1;
      this.totalStars = 0;
      this.completedList = [];
      localStorage.setItem('tp_highest_level', '1');
      localStorage.setItem('tp_current_level', '1');
      localStorage.setItem('tp_total_stars', '0');
      localStorage.setItem('tp_completed_list', JSON.stringify([]));
      this.isLevelCleared = false;
      this.wrongCount = 0;
    },

    toggleMusic() {
      this.isMusicOn = !this.isMusicOn;
      localStorage.setItem('tp_music', this.isMusicOn ? 'true' : 'false');
    },
    toggleSound() {
      this.isSoundOn = !this.isSoundOn;
      localStorage.setItem('tp_sound', this.isSoundOn ? 'true' : 'false');
    },
    toggleNarrator() {
      this.isNarratorOn = !this.isNarratorOn;
      localStorage.setItem('tp_narrator', this.isNarratorOn ? 'true' : 'false');
    }
  }
});