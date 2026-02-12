<template>
  <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
    <div class="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 overflow-hidden rounded-lg">
      <img
        :src="productItem.product.images[0]"
        :alt="productItem.product.name"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
      <div class=" sm:mt-0">
        <h2 class="text-lg font-bold text-gray-900">{{ productItem.product.name }}</h2>
        <p class="mt-1 text-xs text-gray-700">{{ productItem.product.description }}</p>
      </div>
      <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
        <div class="flex items-center border-gray-100">
          <span
            @click="quantityInput > 1 && quantityInput--"
            class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
          >
            -
          </span>
          <input
            type="text"
            v-model.number="quantityInput"
            @blur="validateQuantity"
            @keypress="
              (e) => {
                if (!/[0-9]/.test(e.key)) e.preventDefault();
              }
            "
            class="h-8 w-8 border bg-white text-center text-xs outline-none"
          />
          <span
            max="10000"
            @click="quantityInput++"
            class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
          >
            +
          </span>
        </div>
        <div class="flex items-center space-x-4">
          <p class="text-sm">{{ productItem.product.price }} €</p>
          <svg
            @click="removeToCart"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ProductItem } from '@/modules/products/interfaces/product.interface';
import { useProductStore } from '@/modules/products/store/products.store';
import { ref, watch } from 'vue';
const productStore = useProductStore();
const props = defineProps<{ productItem: ProductItem }>();
const removeToCart = async () => {
  console.log('sdfdg');
  productStore.removeToCart(props.productItem.product);
};

// ref local para el input
const quantityInput = ref(props.productItem.quantity === 0 ? 1 : props.productItem.quantity);

// validación: nunca vacío, mínimo 1
const validateQuantity = () => {
  if (!quantityInput.value || quantityInput.value < 1) {
    quantityInput.value = 1;
  }
};

// sincronizar cambios al prop si quieres actualizar el estado del padre
watch(quantityInput, (val) => {
  props.productItem.quantity = val;
});
</script>
