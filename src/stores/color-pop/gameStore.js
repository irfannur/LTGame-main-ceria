import { defineStore } from 'pinia';
import { useAuthStore } from '../authStore'; // Integrasi dengan Auth Store Central
import levelsData from '../../data/color-pop/levels.json';

export const useGameStore = defineStore('colorPopGame', {
  state: () => ({
    // Game Settings
    isMusicOn: JSON.parse(localStorage.getItem('cp_music') ?? 'true'),
    isSoundOn: JSON.parse(localStorage.getItem('cp_sound') ?? 'true'),
    isNarratorOn: JSON.parse(localStorage.getItem('cp_narrator') ?? 'true'),

    // Gameplay Progress Tracker
    currentLevelId: parseInt(localStorage.getItem('cp_highest_level') || '1'),
    highestLevelUnlocked: parseInt(localStorage.getItem('cp_highest_level') || '1'),
    totalStars: parseInt(localStorage.getItem('cp_total_stars') || '0'),
    highestScore: parseInt(localStorage.getItem('cp_highest_score') || '0'),

    // Live Match State
    score: 0,
    comboCount: 0,
    correctCount: 0,
    wrongCount: 0,
    starsEarned: 0,
    isGameOver: false,
    isLevelCleared: false,
    targetColor: '',

    // Static Assets
    levels: levelsData,
    colorMap: {
      red: { name: 'MERAH', hex: '#ff6b6b' },
      blue: { name: 'BIRU', hex: '#4dadf7' },
      yellow: { name: 'KUNING', hex: '#ffd43b' },
      green: { name: 'HIJAU', hex: '#51cf66' },
      purple: { name: 'UNGU', hex: '#b197fc' },
      orange: { name: 'ORANYE', hex: '#ff922b' },
      pink: { name: 'MERAH MUDA', hex: '#faa2c1' },
      brown: { name: 'COKELAT', hex: '#a1887f' },
      black: { name: 'HITAM', hex: '#495057' },
      white: { name: 'PUTIH', hex: '#f8f9fa' }
    }
  }),

  getters: {
    currentLevel: (state) => state.levels.find(l => l.id === state.currentLevelId) || state.levels[0],
    targetColorName: (state) => state.colorMap[state.targetColor]?.name || '',
    isLastLevel: (state) => state.currentLevelId === state.levels.length,
    
    // 1. Membaca status Mode Demo langsung dari Auth Store Terpusat
    isDemo: () => {
      const authStore = useAuthStore();
      return authStore.isDemoAccount;
    },

    // 2. Membaca status Auth Token jika dibutuhkan
    isAuthorized: () => {
      const authStore = useAuthStore();
      return authStore.isAuthorized;
    }
  },

  actions: {
    resetAllProgress() {
      this.currentLevelId = 1;
      this.highestLevelUnlocked = 1;
      this.totalStars = 0;
      this.highestScore = 0;

      localStorage.setItem('cp_highest_level', '1');
      localStorage.setItem('cp_total_stars', '0');
      localStorage.setItem('cp_highest_score', '0');

      this.initLevel();
    },

    toggleMusic() {
      this.isMusicOn = !this.isMusicOn;
      localStorage.setItem('cp_music', this.isMusicOn);
    },

    toggleSound() {
      this.isSoundOn = !this.isSoundOn;
      localStorage.setItem('cp_sound', this.isSoundOn);
    },

    toggleNarrator() {
      this.isNarratorOn = !this.isNarratorOn;
      localStorage.setItem('cp_narrator', this.isNarratorOn);
    },

    initLevel() {
      this.score = 0;
      this.comboCount = 0;
      this.correctCount = 0;
      this.wrongCount = 0;
      this.starsEarned = 0;
      this.isGameOver = false;
      this.isLevelCleared = false;
      this.pickRandomTargetColor();
    },

    pickRandomTargetColor() {
      const availableColors = this.currentLevel.colors;
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      this.targetColor = availableColors[randomIndex];
    },

    registerCorrectHit() {
      this.correctCount++;
      this.comboCount++;

      const comboBonus = Math.floor(this.comboCount / 5) * 5;
      this.score += 10 + comboBonus;

      if (this.score >= this.currentLevel.targetScore) {
        this.clearLevel();
      } else {
        this.pickRandomTargetColor();
      }
    },

    registerWrongHit() {
      this.wrongCount++;
      this.comboCount = 0;
    },

    clearLevel() {
      this.isLevelCleared = true;
      
      let finalStars = 1;
      if (this.wrongCount === 0) finalStars = 3;
      else if (this.wrongCount <= 2) finalStars = 2;

      this.starsEarned = finalStars;
      this.totalStars += finalStars;
      
      localStorage.setItem('cp_total_stars', this.totalStars.toString());

      if (this.score > this.highestScore) {
        this.highestScore = this.score;
        localStorage.setItem('cp_highest_score', this.highestScore);
      }

      if (!this.isLastLevel) {
        const nextLevel = this.currentLevelId + 1;
        if (nextLevel > this.highestLevelUnlocked) {
          this.highestLevelUnlocked = nextLevel;
          localStorage.setItem('cp_highest_level', nextLevel.toString());
        }
      }
    },

    setLevel(levelId) {
      // Proteksi level demo: Kunci level > 1 jika user menggunakan token DEMO2026
      if (this.isDemo && levelId > 1) return false;

      if (levelId <= this.highestLevelUnlocked) {
        this.currentLevelId = levelId;
        this.initLevel();
        return true;
      }
      return false;
    }
  }
});