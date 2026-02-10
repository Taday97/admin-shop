<template>
  <FullScreenLoader v-if="authStore.isChecking"></FullScreenLoader>
  <!-- Loader Pago -->
  <FullScreenLoader
    v-else-if="orderShopStore.isProcessingPayment"
    message="Zahlung wird verarbeitet… Bitte warten"
  />
  <RouterView />
  <VueQueryDevtools />
</template>

<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/store/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';
import FullScreenLoader from './modules/common/components/FullScreenLoader.vue';
import { shopStore } from './modules/shop/store/shop.store';

const orderShopStore = shopStore();
const authStore = useAuthStore();
const router = useRouter(); //Navigation
const route = useRoute(); //Route wo ich bin, Info der Route

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authStore.checkAuthStatus();
      return;
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>
