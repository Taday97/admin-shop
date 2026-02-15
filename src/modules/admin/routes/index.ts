import isAdminGuard from '@/modules/auth/guards/is-admin.guard';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import { type RouteRecordRaw } from 'vue-router';
import AdminLayout from '../layout/AdminLayout.vue';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  component:AdminLayout,
  children: [
    {
      path: '',
      name: 'dashboard',
      component: () => import('@/modules/admin/views/DashboardView.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/modules/admin/views/CategoriesView.vue'),
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/modules/admin/views/OrdersView.vue'),
    },
    {
      path: '/curses',
      name: 'curses',
      component: () => import('@/modules/admin/views/CursesView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/modules/admin/views/UsersView.vue'),
    },
  ],
};
