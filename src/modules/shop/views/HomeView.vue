<template>
  <div class="min-h-screen bg-gray-100 py-16">
    <section class="mt-12 sm:mt-6 lg:mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 my-10">
        <!-- Text Section -->
        <div class="sm:text-center lg:text-left max-w-xl">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            <span class="block xl:inline">Praxisnahe IT-Kurse</span>
            <span class="block text-indigo-600 xl:inline"> für deine berufliche Zukunft</span>
          </h1>

          <p class="mt-4 text-gray-600 sm:mt-6 sm:text-lg md:text-xl">
            SkillBridge bietet moderne IT-Weiterbildungen in Programmierung, Webentwicklung,
            künstlicher Intelligenz und Unternehmens-IT – live, flexibel und mit persönlichem
            Feedback.
          </p>

          <!-- Buttons -->
          <div
            class="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start"
          >
            <a
              href="#courses"
              class="px-8 py-4 md:px-10 md:py-5 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Kurse entdecken
            </a>

            <a
              href="#abo"
              class="px-8 py-4 md:px-10 md:py-5 text-lg font-semibold text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 transition ease-in-out duration-300"
            >
              Abos ansehen
            </a>
          </div>
        </div>

        <!-- Image Section -->
        <div class="lg:w-1/2 w-full">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="SkillBridge IT Kurse"
            class="w-full h-56 sm:h-72 md:h-96 lg:h-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>

    <!-- Title -->

    <div v-if="!produts" class="pt-50">
      <h1 class="text-center h-[500x]">Loading Products</h1>
      <p>Wait a moment, please!</p>
    </div>

    <!-- Product List -->
    <ProductList v-else :products="produts"></ProductList>
    <ButtonPagination :has-more-data="!!produts && produts.length < 10" :page="page">
    </ButtonPagination>
  </div>
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
