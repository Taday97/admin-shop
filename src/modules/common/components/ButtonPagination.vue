<template>
    <div class="flex justify-center py-10 bg-gray-100 space-x-3">
        <button :disabled="page===1" @click="$router.push({ query: { page: page - 1 } })"
            class="flex items-center hover:bg-blue-600 transition-all space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-700 disabled:bg-gray-300">
            <span>Previous</span>
            <ArrowLeftIcon></ArrowLeftIcon>
        </button>

        <button :disabled="hasMoreData" @click="$router.push({ query: { page: page + 1 } })"
            class="flex items-center hover:bg-blue-700 transition-all space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-700 disabled:bg-gray-300">
            <span>Next</span>
            <ArrowRightIcon></ArrowRightIcon>
        </button>
    </div>

</template>

<script setup lang="ts">
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';

interface Prop {
    page: number;
    hasMoreData: boolean;
}
defineProps<Prop>()
</script>