<template>
  <div class="min-h-screen bg-gray-100 py-16">
    <h1 class="mb-10 mt-5 text-center text-2xl font-bold">Kasse</h1>
    <div
      class="container mx-auto px-4 md:px-6 lg:px-0 flex flex-col md:flex-row gap-8 justify-center"
    >
      <!-- Left: Order Summary -->
      <div class="flex-1 max-w-3xl rounded-lg bg-white p-6 md:p-8 shadow-md">
        <!-- Item -->
        <div
          v-for="productItem in productStore.productsCart"
          :key="productItem.product.id"
          :product-item="productItem"
          class="flex items-center mb-6 border-b border-gray-200 pb-6"
        >
          <div
            class="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 flex-shrink-0"
          >
            <img
              :src="productItem.product.images[0]"
              :alt="productItem.product.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1 ml-4">
            <h6 class="font-semibold uppercase text-gray-600">{{productItem.product.name}}</h6>
            <p class="text-gray-400">x {{productItem.quantity}}</p>
          </div>
          <div class="ml-4 text-right">
            <span class="font-semibold text-gray-600 text-xl"> {{productItem.product.price*productItem.quantity}} €</span
            >
          </div>
        </div>

        <!-- Summary -->
        <div class="text-gray-800 space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Zwischensumme</span>
            <span class="font-semibold">{{ productStore.totalPrice.toFixed(2) }} €</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Steuern (GST)</span>
            <span class="font-semibold">19.09 €</span>
          </div>
           <div class="flex justify-between">
            <span class="text-gray-600">Versand</span>
            <span class="font-semibold">4.99 €</span>
          </div>
          <div class="flex justify-between pt-3 border-t border-gray-200 text-xl font-semibold">
            <span class="text-gray-600">Gesamt</span>
            <div class="text-right">
              <span class="text-gray-400 text-sm mr-1">EUR</span>
              <span>{{ (productStore.totalPrice + 4.99).toFixed(2) }} €</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Payment & Billing -->
      <div class="md:w-1/3 rounded-lg bg-white p-6 shadow-md flex flex-col gap-6">
        <!-- Contact & Billing -->
        <div class="border border-gray-200 rounded-lg p-4 space-y-4">
          <div class="flex">
            <span class="w-32 text-gray-600 font-semibold">Contact</span>
            <span>Scott Windon</span>
          </div>
          <div class="flex">
            <span class="w-32 text-gray-600 font-semibold">Billing Address</span>
            <span>123 George Street, Sydney, NSW 2000 Australia</span>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="border border-gray-200 rounded-lg p-4 space-y-4">
          <!-- Credit Card -->
          <div>
            <label class="flex items-center cursor-pointer mb-4">
              <input type="radio" name="payment" class="form-radio h-5 w-5 text-indigo-500" />
              <img src="../../../assets/payment_methods.webp" class="h-10 ml-3" />
            </label>

            <div class="space-y-3">
              <input
                type="text"
                placeholder="Name on card"
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Card number"
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
              />

              <div class="flex gap-2">
                <select
                  class="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                >
                  <option>01 - January</option>
                  <option>02 - February</option>
                  <!-- ... -->
                </select>
                <select
                  class="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                >
                  <option>2026</option>
                  <option>2027</option>
                  <!-- ... -->
                </select>
                <input
                  type="text"
                  placeholder="000"
                  class="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <!-- PayPal -->
          <div>
            <label class="flex items-center cursor-pointer">
              <input type="radio" name="payment" class="form-radio h-5 w-5 text-indigo-500" />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                width="80"
                class="ml-3"
              />
            </label>
          </div>
        </div>

        <!-- Pay Button -->
        <button
          class="w-full bg-indigo-500 hover:bg-indigo-700 text-white rounded-lg px-4 py-3 font-semibold"
        >
          PAY NOW
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css');
</style>
<style>
/*
module.exports = {
    plugins: [require('@tailwindcss/forms'),]
};
*/
.form-radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-shrink: 0;
  border-radius: 100%;
  border-width: 2px;
}

.form-radio:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
  border-color: transparent;
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

@media not print {
  .form-radio::-ms-check {
    border-width: 1px;
    color: transparent;
    background: inherit;
    border-color: inherit;
    border-radius: inherit;
  }
}

.form-radio:focus {
  outline: none;
}

.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e");
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  background-repeat: no-repeat;
  padding-top: 0.5rem;
  padding-right: 2.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
}

.form-select::-ms-expand {
  color: #a0aec0;
  border: none;
}

@media not print {
  .form-select::-ms-expand {
    display: none;
  }
}

@media print and (-ms-high-contrast: active), print and (-ms-high-contrast: none) {
  .form-select {
    padding-right: 0.75rem;
  }
}
</style>
<script lang="ts" setup>
import { useProductStore } from '@/modules/products/store/products.store';

const productStore = useProductStore();
</script>
