<template>
  <body>
    <div class="min-h-screen bg-gray-100 p-5">
      <h1 class="mb-10 text-center text-2xl font-bold">Warenkorbartikel</h1>
      <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div class="rounded-lg md:w-2/3">
          <CartItem
            v-for="productItem in productStore.productsCart"
            :key="productItem.product.id"
            :product-item="productItem"
          ></CartItem>
        </div>
        <!-- Sub total -->
        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Zwischensumme</p>
            <p class="text-gray-700">{{ productStore.totalPrice.toFixed(2) }} €</p>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Gesamt</p>
            <p class="text-lg font-bold">{{ (productStore.totalPrice).toFixed(2) }} €</p>
          </div>

          <div class="flex justify-between">
            <p class="text-lg font-bold"></p>
            <div class="">
              <p class="mb-1 text-lg font-bold"></p>
              <p class="text-sm text-gray-700">inklusive MwSt.</p>
            </div>
          </div>
          <RouterLink to="/checkout" custom v-slot="{ navigate, href }">
            <button
              @click="navigate"
              class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Zur Kasse
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
<script lang="ts" setup>
import CartItem from '../components/CartItem.vue';
import { useProductStore } from '@/modules/products/store/products.store';

const productStore = useProductStore();
</script>
