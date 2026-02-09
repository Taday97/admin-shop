<template>
  <article
    class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
  >
    <a href="#">
      <div class="relative flex items-end overflow-hidden rounded-xl h-[230px] w-full">
        <img class="h-full w-full object-cover" :src="product.images[0]" :alt="product.name" />
      </div>

      <div class="mt-1 p-2">
        <h2 class="text-slate-700 h-[50px]">{{ product.name }}</h2>

        <div class="mt-3 flex items-end justify-between">
          <p class="text-lg font-bold text-blue-500">${{ product.price }}</p>

          <div
            class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            <button @click="addToCart" class="text-sm">In den Warenkorb</button>
          </div>
        </div>
      </div>
    </a>
  </article>
</template>
<script lang="ts" setup>
//lang zeigt TypeScript und setup braucht nicht mehr export defaults, vue macht das automatich
import { ref } from 'vue';
import type { Product } from '../interfaces/product.interface';
import { useProductStore } from '../store/products.store';
import { useToast } from 'vue-toastification';
const toast = useToast();
const productStore = useProductStore();

interface Props {
  product: Product;
}
const props = defineProps<Props>(); //damit TypeScript weiß, was man erwartet, und das die daten validiert wird

const addToCart = async () => {
  console.log('sdfdg');
  productStore.addToCart(props.product);
  toast.success('Artikel erfolgreich zum Warenkorb hinzugefügt!')

};
</script>
