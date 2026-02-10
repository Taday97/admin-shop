<template>
  <div class="w-full">
    <h1 class="text-2xl font-semibold mb-4">Einloggen</h1>
    <form @submit.prevent="onLogin">
      <!-- Username Input -->
      <div class="mb-4">
        <label for="email" class="block text-gray-600">Email</label>
        <input
          v-model="myForm.email"
          ref="emailInputRef"
          type="text"
          id="email"
          name="email"
          placeholder="E-Mail-Adresse"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>
      <!-- Password Input -->
      <div class="mb-4">
        <label for="password" class="block text-gray-600">Passwort</label>
        <div class="relative">
          <input
            ref="passwordInputRef"
            v-model="myForm.password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            name="password"
            placeholder="Passwort eingeben"
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autocomplete="off"
          />

          <!-- Ojo -->
          <button
            type="button"
            @click="togglePassword"
            class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
          >
            <!-- geofnete Auge -->
            <svg
              v-if="!showPassword"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
             -1.274 4.057-5.064 7-9.542 7
             -4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>

            <!-- geschlosene Auge -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19
             c-4.478 0-8.268-2.943-9.543-7
             a9.97 9.97 0 012.042-3.368M6.223 6.223
             A9.956 9.956 0 0112 5
             c4.478 0 8.268 2.943 9.543 7
             a9.973 9.973 0 01-4.132 5.411M15 12
             a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3l18 18"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- Remember Me Checkbox -->
      <div class="mb-4 flex items-center">
        <input
          v-model="myForm.rememberMe"
          type="checkbox"
          id="remember"
          name="remember"
          class="text-blue-500"
        />
        <label for="remember" class="text-gray-600 ml-2">Angemeldet bleiben</label>
      </div>
      <!-- Forgot Password Link -->
      <div class="mb-6 text-blue-500">
        <a href="#" class="hover:underline">Passwort vergessen?</a>
      </div>
      <!-- Login Button -->
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Anmelden
      </button>
    </form>
    <!-- Sign up  Link -->
    <div class="mt-6 text-blue-500 text-center">
      <RouterLink :to="{ name: 'register' }" class="hover:underline">Hier registrieren</RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, watchEffect } from 'vue';
import { useAuthStore } from '../store/auth.store';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);
const toast = useToast();

const myForm = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

const onLogin = async () => {
  if (myForm.email === '') {
    return emailInputRef.value?.focus();
  }
  if (myForm.password.length < 3) {
    return passwordInputRef.value?.focus();
  }
  if (myForm.rememberMe) {
    localStorage.setItem('email', myForm.email);
  } else {
    localStorage.removeItem('email');
  }

  const ok = await authStore.login(myForm.email, myForm.password);

  if (ok) {
    return;
  }
  toast.error('Benutzername oder Passwort ist falsch');
  console.log(ok);
};

watchEffect(() => {
  const email = localStorage.getItem('email');
  if (email) {
    myForm.email = email;
    myForm.rememberMe = true;
  }
});

const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>
