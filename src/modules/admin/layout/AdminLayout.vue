<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Windmill Dashboard</title>
  </head>
  <body>
    <div
      class="flex h-screen bg-gray-50 dark:bg-gray-900"
      :class="{ 'overflow-hidden': isSideMenuOpen }"
    >
      <!-- Sidebar -->
      <Sidebar></Sidebar>

      <div class="flex flex-col flex-1 w-full">
        <!-- Header -->
        <Header></Header>
        <main class="h-full overflow-y-auto">
          <RouterView></RouterView>
        </main>
      </div>
    </div>
  </body>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import { RouterView } from 'vue-router';

const isSideMenuOpen = ref(false);

watch(isSideMenuOpen,(val)=>{
   console.log("watch new "+val)
})
</script>
