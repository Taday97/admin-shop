<template>
  <div class="flex items-center min-h-screen p-6 bg-gray-50">
    <div
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl bg-gray-800"
    >
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            v-if="isLogin"
            aria-hidden="true"
            class="object-cover w-full h-full block"
            src="../../../assets/img/login-office.jpeg"
            alt="Office"
          />
          <img
            v-if="!isLogin"
            aria-hidden="true"
            class="object-cover w-full h-full block"
            src="../../../assets/img/create-account-office.jpeg"
            alt="Office"
          />
        </div>
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div class="w-full">
            <RouterView></RouterView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';

const route = useRoute();
console.log(route.path);
const isLogin = computed(() => {
  return route.path.includes('/auth/login');
});
</script>
