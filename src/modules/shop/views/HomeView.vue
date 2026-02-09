<template>
  <!-- Title -->

  <div v-if="!produts" class="pt-50">
    <h1 class="text-center h-[500x]">Loading Products</h1>
    <p>Wait a moment, please!</p>
  </div>

  <!-- Product List -->
   
  <ProductList v-else :products="produts"></ProductList>
  <ButtonPagination :has-more-data="!!produts && produts.length < 10" :page="page">
  </ButtonPagination>
</template>

<script lang="ts" setup>
import { getProductsActions } from '@/modules/products/actions';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import ProductList from '../../products/components/ProductList.vue';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { useRoute } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';

const route = useRoute();
const page = ref(Number(route.query.page || 1));
const queryClient = useQueryClient();
console.log({ page });

const { data: produts = [], isLoading } = useQuery({
  queryKey: ['products', { page: page }], //cache for products page 1, in andere anruft,  benutz man das gleiche, dann macht mann keine anruft zu Api sondern nimmt die value von diese Cache
  queryFn: () => getProductsActions(page.value),
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
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsActions(page.value + 1),
  });
});
</script>
