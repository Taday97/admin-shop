<template>
  <div class="pt-5 min-h-screen bg-gray-100">
    <div class="space-y-6 px-4 md:px-6 lg:px-0 max-w-3xl mx-auto pb-5">
      <div
        v-if="!orders || orders.length == 0"
        class="flex flex-col items-center justify-center py-20 min-h-[400px] text-center"
      >
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
          Keine Bestellung verfügbar
        </h1>
        <p class="text-gray-500 mb-6">Sie haben noch keine Bestellungen getätigt.</p>
        <RouterLink to="/">
          <button
            class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Jetzt einkaufen
          </button>
        </RouterLink>
      </div>

      <h1
        v-show="!(!orders || orders.length == 0)"
        data-v-5cf00776=""
        class="text-center text-2xl font-bold"
      >
        Bestellungen
      </h1>
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
              <span class="text-[15px] font-semibold text-slate-600"
                >Bestellung Nr. {{ order.id }}</span
              >
            </div>
            <p class="text-slate-600 text-sm mt-3">Aufgegeben am {{ date(order.orderDate) }}</p>
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
      </div>
    </div>
    <ButtonPagination v-show="!!orders && orders!.length > 10" :has-more-data="!!orders && orders!.length < 10" :page="page">
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

const date = (datum: Date) => {
  const valueDate=new Date(datum.toString());
  const date=new Date(valueDate.getFullYear(),valueDate.getMonth(),valueDate.getDay())
  return date.toLocaleDateString('de-DE');
};
</script>
