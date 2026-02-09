import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { checkAuthAction, loginAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';
import { registerAction } from '../actions/register.action';

export const useAuthStore = defineStore('auth', () => {
  //Authenticated, unAuthenticated, Checking
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', '')); // Erstellt eine reaktive Variable 'token', die automatisch mit localStorage synchronisiert wird

  const login = async (email: string, password: string) => {
    try {
      const loginResp = await loginAction(email, password);
      if (!loginResp.ok) {
        logout();
        return false;
      }

      user.value = loginResp.user;
      token.value = loginResp.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.log(error);

      return logout();
    }
  };
  const register = async (name: string, email: string, password: string) => {
    try {
      const registerResp = await registerAction(name, email, password);
      if (!registerResp.ok) {
        logout();
        return { ok: false, message: registerResp.message };
      }

      user.value = registerResp.user;
      token.value = registerResp.token;
      authStatus.value = AuthStatus.Authenticated;
      return { ok: true, message: 'Der Benutzer wurde erfolgreich erstellt' };
    } catch (error) {
      console.log(error);

      return { ok: false, message: '' };
    }
  };
  const logout = () => {
    localStorage.removeItem('token')

    authStatus.value = AuthStatus.UnAuthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResponse = await checkAuthAction();
      if (!statusResponse.ok) {
        logout();
        return false;
      }
      authStatus.value = AuthStatus.Authenticated;
      user.value = statusResponse.user;
      token.value = statusResponse.token;
      return true;
    } catch (err) {
      logout();
      return false;
    }
  };

  //Die sieht man in Pinia
  return {
    user,
    token,
    authStatus,
    //Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isAdmin: computed(() => {
    return  user.value?.roles.includes('admin') ?? false;
    }),
    userName: computed(() => user.value?.name),

    //Actions
    logout,
    login,
    register,
    checkAuthStatus,
    
  };
});
