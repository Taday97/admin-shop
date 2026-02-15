import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAdminStore = defineStore('product', () => {
  const isSideMenuOpen = ref(false);

  const toggleSideMenu = () => {
    console.log('toggleSideMenu ' + isSideMenuOpen.value);
    isSideMenuOpen.value = !isSideMenuOpen.value;
  };
  const closeSideMenu = () => {
    isSideMenuOpen.value = false;
  };
  return {
    isSideMenuOpen,
    toggleSideMenu,
    closeSideMenu
  };
});
