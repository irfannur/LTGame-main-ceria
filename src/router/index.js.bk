import { createRouter, createWebHistory } from 'vue-router';
import { useGameStore } from '../stores/gameStore';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/gate', 
      name: 'gate', 
      component: () => import('../views/GateView.vue') 
    },
    { 
      path: '/', 
      name: 'home', 
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true } 
    },
    { 
      path: '/levels', 
      name: 'levels', 
      component: () => import('../views/LevelSelectView.vue'),
      meta: { requiresAuth: true } 
    },
    { 
      path: '/play', 
      name: 'play', 
      component: () => import('../views/GameView.vue'),
      meta: { requiresAuth: true } 
    }
  ]
});

// Guard Pengaman Token
router.beforeEach((to, from, next) => {
  const store = useGameStore();

  // Jika halaman butuh token & user belum terverifikasi -> Pindah ke Gate
  if (to.meta.requiresAuth && !store.isAuthorized) {
    next({ name: 'gate' });
  } 
  // Jika user sudah terverifikasi dan mencoba ke halaman gate -> Langsung lempar ke Home
  else if (to.name === 'gate' && store.isAuthorized) {
    next({ name: 'home' });
  } 
  else {
    next();
  }
});

export default router;