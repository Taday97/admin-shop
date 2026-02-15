import { useAuthStore } from '../../auth/store/auth.store';
<template>
  <!-- Header Navbar -->

  <header class="sticky top-0 z-50 border-b border-gray-300 bg-white min-h-[70px] tracking-wide">
    <div class="px-4 py-3 w-full flex items-center justify-between max-w-screen-xl mx-auto">
      <div
        class="flex flex-wrap items-center justify-between sm:px-10 gap-4 w-full max-w-screen-xl mx-auto"
      >
        <RouterLink to="/" class="max-sm:hidden">
          <!-- Logo como imagen -->
          <div class="flex flex-col leading-tight">
            <span
              class="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"
            >
              SkillBridge
            </span>
            <span class="text-xs sm:text-sm text-gray-500">
              IT-Weiterbildung & digitale Kompetenzen
            </span>
          </div>
        </RouterLink>
        <RouterLink to="/" class="hidden max-sm:block">
          <!-- Logo como imagen -->
          <div class="flex flex-col leading-tight">
            <span
              class="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"
            >
              SkillBridge
            </span>
            <span class="text-xs sm:text-sm text-gray-500">
              IT-Weiterbildung & digitale Kompetenzen
            </span>
          </div>
        </RouterLink>

        <div
          @click="isMenuOpen = false"
          :class="['lg:flex lg:flex-1 lg:justify-end', isMenuOpen ? 'block' : 'hidden']"
          class="lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            @click="toggleMenu()"
            class="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>

          <ul
            class="lg:flex lg:mr-10 lg:justify-end lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50"
          >
            <li class="mb-6 hidden max-lg:block">
              <RouterLink to="/">
                <!-- Logo como imagen -->
                <div class="flex flex-col leading-tight">
                  <span
                    class="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"
                  >
                    SkillBridge
                  </span>
                  <span class="text-xs sm:text-sm text-gray-500">
                    IT-Weiterbildung & digitale Kompetenzen
                  </span>
                </div>
              </RouterLink>
            </li>

            <li class="lg:ml-4 max-lg:border-b max-lg:border-gray-300 max-lg:py-3">
              <RouterLink
                v-if="authStore.isAuthenticated"
                :class="{
                  'bg-indigo-100 text-indigo-700': $route.path === '/orders',
                  'text-gray-600 hover:bg-indigo-100 hover:text-indigo-700':
                    $route.path !== '/orders',
                }"
                to="/orders"
                class="block px-4 py-2 rounded-lg text-gray-600 text-[15px] font-semibold transition-all duration-200 ease-in-out hover:bg-indigo-100 hover:text-indigo-700"
              >
                Bestellungen
              </RouterLink>
            </li>

            <li class="lg:ml-4 max-lg:border-b max-lg:border-gray-300 max-lg:py-3">
              <RouterLink
                v-if="authStore.isAuthenticated && authStore.isAdmin"
                to="/admin"
                class="block px-4 py-2 rounded-lg text-gray-600 text-[15px] font-semibold transition-all duration-200 ease-in-out hover:bg-indigo-100 hover:text-indigo-700"
              >
                Administrator
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="flex items-center space-x-8 max-lg:ml-auto">
          <span class="relative">
            <span class="flex items-center space-x-3">
              <!-- Icono + contador -->
              <RouterLink to="/cart">
                <div class="relative" style="width: 24px; height: 24px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <path
                        d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0-4 0m11 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"
                      />
                      <path d="M17 17H6V3H4" />
                      <path d="m6 5l14 1l-1 7H6" />
                    </g>
                  </svg>

                  <!-- contador -->
                  <div
                    class="absolute inline-flex items-center justify-center w-6 h-6 text-[10px] font-normal text-white bg-red-500 border-2 border-white rounded-full -top-3 -right-3"
                  >
                    {{ productStore.quantityCard }}
                  </div>
                </div>
              </RouterLink>

              <!-- Total price -->
              <p class="text-sm font-semibold text-orange-500 whitespace-nowrap">
                {{ productStore.totalPrice }} €
              </p>
            </span>
          </span>
          <RouterLink to="auth/login" v-if="!authStore.isAuthenticated" title="Anmeldung">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
              >
                <path d="M23.992 6H6v36h18" />
                <path d="m25 33l-9-9l9-9m17 8.992H16" />
              </g>
            </svg>
          </RouterLink>
          <button @click="authStore.logout()" v-if="authStore.isAuthenticated" title="Abmeldung">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
              />
            </svg>
          </button>
          <RouterLink to="auth/register" v-if="!authStore.isAuthenticated" title="Register">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4"
              />
            </svg>
          </RouterLink>
          <button @click="toggleMenu" class="lg:hidden cursor-pointer">
            <svg class="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/modules/auth/store/auth.store';
import { useProductStore } from '@/modules/products/store/products.store';
import { ref } from 'vue';

const authStore = useAuthStore();
const productStore = useProductStore();
console.log(productStore.totalPrice);

var isMenuOpen = ref(false); //.getElementById('toggleOpen');
var toggleClose = ref(false); //.getElementById('toggleClose');
var collapseMenu = ref(false); //document.getElementById('collapseMenu');

const toggleMenu = () => {
  console.log('sdsgdf');
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
