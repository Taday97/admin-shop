
import { adminRoutes } from '@/modules/admin/routes';
import AuthLayout from '@/modules/auth/layouts/AuthLayout.vue';
import { authRoutes } from '@/modules/auth/routes';
import ShopLayout from '@/modules/shop/layout/ShopLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/modules/shop/views/HomeView.vue'),
        },
      ],
    },
    // Auth Routers
    authRoutes,
    // Admin Routers
    adminRoutes

   
  ],
});

export default router;
