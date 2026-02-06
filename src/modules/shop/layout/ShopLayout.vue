<script setup lang="ts">
import CustomFooter from '../components/CustomFooter.vue';
import TopMenu from '../components/TopMenu.vue';
import HomeView from '../views/HomeView.vue';

</script>

<template>
    <!-- component -->
    <!-- Create By Joker Banny -->

    <!-- Header Navbar -->
    <TopMenu></TopMenu>

    <!-- Tab Menu and Product List -->
    <RouterView></RouterView>

    <!-- Custom Footer -->
    <CustomFooter></CustomFooter>


</template>