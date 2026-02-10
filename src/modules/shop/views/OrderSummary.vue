<template>
  <div class="min-h-screen bg-gray-100 py-16">
    <h1 class="mb-10 mt-5 text-center text-2xl font-bold">Bestellungen</h1>
    <div class="space-y-6 px-4 md:px-6 lg:px-0 max-w-3xl mx-auto">
      <!-- Card Bestelung -->
      <div
        v-for="order in orders"
        :key="order.id"
        :product="order"
        class="bg-white rounded-xl border border-gray-300 overflow-hidden p-6"
      >
        <div class="flex flex-wrap justify-between gap-6">
          <div class="max-w-96">
            <div class="flex items-center gap-4">
              <span class="text-[15px] font-semibold text-slate-600">Bestellung Nr. {{ order.id }}</span>
            
            </div>
            <p class="text-slate-600 text-sm mt-3">Aufgegeben am {{ order.orderDate }}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-semibold text-slate-900">
              {{ order.items.reduce((acc, item) => acc + item.price, 0) }} €
            </p>
            <p class="text-slate-600 text-sm mt-2">{{ order.items.length }} items</p>
          </div>
        </div>

        <hr class="border-gray-300 my-6" />

        <div class="flex flex-wrap items-center gap-8">
          <div
            v-for="item in order.items"
            :key="item.id"
            :product="item"
            class="flex items-center gap-4"
          >
            <div class="w-16 h-16 bg-gray-100 p-1 rounded-md overflow-hidden">
              <img
                :src="getProductImageAction(item.product.images[0]!)"
                :alt="item.product.name"
                class="w-full h-full object-cover"
              /> 
            </div>
            <div>
              <p class="text-[15px] font-medium text-slate-900">{{ item.product.name }}</p>
              <p class="text-xs text-slate-600 mt-1">Qty: {{ item.quantity }}</p>
            </div>
          </div>
        </div>

<!--         <div class="mt-8 flex flex-wrap gap-4">
          <button
            class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-slate-900 font-medium cursor-pointer hover:bg-gray-50 transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 511.999 511.999">
              <path
                d="M508.745 246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818 239.784 3.249 246.035a16.896 16.896 0 0 0 0 19.923c4.569 6.257 113.557 153.206 252.748 153.206s248.174-146.95 252.748-153.201a16.875 16.875 0 0 0 0-19.922zM255.997 385.406c-102.529 0-191.33-97.533-217.617-129.418 26.253-31.913 114.868-129.395 217.617-129.395 102.524 0 191.319 97.516 217.617 129.418-26.253 31.912-114.868 129.395-217.617 129.395z"
                data-original="#000000"
              />
              <path
                d="M255.997 154.725c-55.842 0-101.275 45.433-101.275 101.275s45.433 101.275 101.275 101.275S357.272 311.842 357.272 256s-45.433-101.275-101.275-101.275zm0 168.791c-37.23 0-67.516-30.287-67.516-67.516s30.287-67.516 67.516-67.516 67.516 30.287 67.516 67.516-30.286 67.516-67.516 67.516z"
                data-original="#000000"
              />
            </svg>
            View Details
          </button>
        </div> -->
      </div>
    </div>
    <ButtonPagination :has-more-data="!!orders && orders.length < 10" :page="page">
    </ButtonPagination>
  </div>
</template>
<script lang="ts" setup>
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { useRoute } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';
import { getOrdersActions } from '../actions/get-orders.actions';
import { getProductImageAction } from '@/modules/products/actions';

const route = useRoute();
const page = ref(Number(route.query.page || 1));
const queryClient = useQueryClient();
console.log({ page });

const { data: orders = [], isLoading } = useQuery({
  queryKey: ['orders', { page: page }], //cache for products page 1, in andere anruft,  benutz man das gleiche, dann macht mann keine anruft zu Api sondern nimmt die value von diese Cache
  queryFn: () => getOrdersActions(page.value),
});

watch(
  () => route.query.page,
  (newPage) => {
    page.value = Number(newPage || 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
);
watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['orders', { page: page.value + 1 }],
    queryFn: () => getOrdersActions(page.value + 1),
  });
});
</script>
