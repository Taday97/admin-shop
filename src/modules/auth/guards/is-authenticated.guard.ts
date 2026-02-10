import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import { AuthStatus } from '../interfaces';
import { useAuthStore } from '../store/auth.store';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

   console.log("isAuthenticatedGuard");
  await authStore.checkAuthStatus();

  authStore.authStatus === AuthStatus.UnAuthenticated ? next({ name: 'login' }) : next();
};

export default isAuthenticatedGuard;