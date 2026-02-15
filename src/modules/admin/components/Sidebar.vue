<template>
  <!-- Desktop sidebar -->
  <aside class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <div class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
        <span
          class="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"
        >
          SkillBridge
        </span>
      </div>
      <ul class="mt-6">
        <li class="relative px-6 py-3" v-for="item in listMenu" :key="item.routeTo">
          <span
            class="absolute inset-y-0 left-0 w-1 rounded-tr-lg rounded-br-lg"
            :class="{
              'bg-purple-600': $route.path === item.routeTo,
            }"
            aria-hidden="true"
          ></span>
          <RouterLink
            :to="item.routeTo"
            class="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
          >
            <span v-html="item.icon"></span>
            <span class="ml-4">{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
  <!-- Mobile sidebar -->
  <!-- Backdrop -->
  <div
    v-show="adminStore.isSideMenuOpen"
    class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    style="display: none"
  ></div>
  <aside
    class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
    v-show="adminStore.isSideMenuOpen"
    @click="adminStore.closeSideMenu()"
    style="display: none"
  >
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <div class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
        <span
          class="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"
        >
          SkillBridge
        </span>
      </div>
      <ul class="mt-6">
        <li class="relative px-6 py-3" v-for="item in listMenu">
          <span
            class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
            aria-hidden="true"
          ></span>
          <RouterLink
            :to="item.routeTo"
            class="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
          >
            <span v-html="item.icon"></span>
            <span class="ml-4">{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script lang="ts" setup>
import { useAdminStore } from '../store/admin.store';

const adminStore = useAdminStore();

const listMenu = [
  {
    routeTo: '/admin',
    icon: `<svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>`,
    name: 'Dashboard',
  },
  {
    routeTo: '/curses',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9zm6.82 6L12 12.72L5.18 9L12 5.28zM17 16l-5 2.72L7 16v-3.73L12 15l5-2.73z"/></svg>`,
    name: 'Produkte (Kurse)',
  },
  {
    routeTo: '/categories',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M20 4H4v1.5h16zm-2 9h-3c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2m.5 5c0 .3-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5zM4 9.5h9V8H4zM9 13H6c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2m.5 5c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5z"/></svg>`,
    name: 'Kategorien',
  },
  {
    routeTo: '/orders',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5.586 4.586C5 5.172 5 6.114 5 8v9c0 1.886 0 2.828.586 3.414S7.114 21 9 21h6c1.886 0 2.828 0 3.414-.586S19 18.886 19 17V8c0-1.886 0-2.828-.586-3.414S16.886 4 15 4H9c-1.886 0-2.828 0-3.414.586M9 8a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z" clip-rule="evenodd"/></svg>`,
    name: 'Bestellungen',
  },
  {
    routeTo: '/users',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.07 10.41a5 5 0 0 0 0-5.82A3.4 3.4 0 0 1 15 4a3.5 3.5 0 0 1 0 7a3.4 3.4 0 0 1-1.93-.59M5.5 7.5A3.5 3.5 0 1 1 9 11a3.5 3.5 0 0 1-3.5-3.5m2 0A1.5 1.5 0 1 0 9 6a1.5 1.5 0 0 0-1.5 1.5M16 17v2H2v-2s0-4 7-4s7 4 7 4m-2 0c-.14-.78-1.33-2-5-2s-4.93 1.31-5 2m11.95-4A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4Z"/></svg>`,
    name: 'Benutzer',
  },
];
</script>
