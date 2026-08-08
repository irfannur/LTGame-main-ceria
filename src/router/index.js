import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

// Common Views
import TokenAccessView from '@/views/TokenAccessView.vue';
import HubView from '@/views/HubView.vue';

// Game Views
import ShapeLevels from '@/views/shape-matcher/LevelSelectView.vue';
import ShapeGame from '@/views/shape-matcher/GameView.vue';
import ColorGame from '@/views/color-pop/GameView.vue';
import ColorLevels from '@/views/color-pop/LevelSelectView.vue';
import TransportGame from '@/views/smart-transport/GameView.vue';
import TransportLevels from '@/views/smart-transport/LevelSelect.vue';

const routes = [
  { path: '/access', name: 'TokenAccess', component: TokenAccessView, meta: { requiresAuth: false } },
  { path: '/', name: 'Hub', component: HubView, meta: { requiresAuth: true } },

  // --- GAME 1: Shape Matcher ---
  { path: '/shape-matcher/levels', name: 'ShapeLevels', component: ShapeLevels, meta: { requiresAuth: true } },
  { path: '/shape-matcher/play', name: 'ShapeGame', component: ShapeGame, meta: { requiresAuth: true } },

  // --- GAME 2: Color Pop ---
  { path: '/color-pop/levels', name: 'ColorLevels', component: ColorLevels, meta: { requiresAuth: true } },
  { path: '/color-pop/play', name: 'ColorGame', component: ColorGame, meta: { requiresAuth: true } },

  // --- GAME 3: Smart Transport ---
  { path: '/smart-transport/levels', name: 'TransportLevels', component: TransportLevels, meta: { requiresAuth: true } },
  { path: '/smart-transport/play', name: 'TransportGame', component: TransportGame, meta: { requiresAuth: true } },

  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Proteksi Akses Token
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthorized) {
    next('/access'); // Belum login token -> lempar ke login
  } else if (to.path === '/access' && authStore.isAuthorized) {
    next('/'); // Sudah login token -> lempar ke Hub Dashboard
  } else {
    next();
  }
});

export default router;