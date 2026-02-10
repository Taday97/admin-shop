<template>
  <div class="min-h-screen bg-gray-100 py-16">
    <h1 class="mb-10 mt-5 text-center text-2xl font-bold">Kasse</h1>
    <div class="px-4 md:px-6 lg:px-0 flex flex-col md:flex-row gap-8 justify-center">
      <!-- Left: Order Summary -->
      <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
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
            <h6 class="font-semibold text-gray-600">{{ productItem.product.name }}</h6>
            <p class="text-gray-400">x {{ productItem.quantity }}</p>
          </div>
          <div class="ml-4 text-right">
            <span class="font-semibold text-gray-600 text-xl">
              {{ productItem.product.price * productItem.quantity }} €</span
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
          <div class="flex justify-between pt-3 border-t border-gray-200 text-xl font-semibold">
            <span class="text-gray-600">Gesamt</span>
            <div class="text-right">
              <span class="text-gray-400 text-sm mr-1">EUR</span>
              <span>{{ productStore.totalPrice.toFixed(2) }} €</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Payment & Billing -->
      <div class="px-3 md:w-5/12">
        <div
          class="w-full mx-auto border border-gray-200 p-3 text-gray-800 font-light mb-6 rounded-lg bg-white md:p-8 shadow-md"
        >
          <!-- Kontakt Info -->
          <div class="w-full flex items-center">
            <div class="px-3">
              <span class="text-gray-600 font-semibold">Kontakt</span>
            </div>
            <div class="flex-grow px-5 pl-3">
              <span class="text-gray-600">Scott Windon</span>
            </div>
          </div>

          <!-- Adresse Form -->
          <div class="w-full p-3 border-b border-gray-200">
            <div>
              <label class="block text-gray-700 text-sm font-medium mt-2" for="name">Name</label>
              <input
                id="name"
                v-model="contactForm.name"
                placeholder="Name eingeben"
                class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              />

              <label class="block text-gray-700 text-sm font-medium mt-2" for="address"
                >Adresse</label
              >
              <input
                id="address"
                v-model="contactForm.address"
                placeholder="Adresse eingeben"
                class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              />

              <div class="flex">
                <div class="flex-grow w-1/4 pr-2">
                  <label class="block text-gray-700 text-sm font-medium mt-2" for="plz">PLZ</label>
                  <input
                    id="plz"
                    v-model="contactForm.plz"
                    placeholder="PLZ"
                    class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div class="flex-grow">
                  <label class="block text-gray-700 text-sm font-medium mt-2" for="city"
                    >Stadt</label
                  >
                  <input
                    id="city"
                    v-model="contactForm.city"
                    placeholder="Stadt eingeben"
                    class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Zahlungsinformationen -->
        <div
          class="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6 p-6 md:p-8 shadow-md"
        >
          <form>
            <h3 class="text-xl font-semibold text-slate-900">Payment Details</h3>
            <div class="mb-5">
              <label for="type1" class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-indigo-500"
                  name="type"
                  id="type1"
                  checked
                />
                <img src="../../../assets/payment_methods.webp" class="h-6 ml-3" />
              </label>
            </div>
            <div class="grid gap-6 mt-6">
              <div>
                <label class="block text-sm text-slate-500 font-medium mb-2"
                  >Card Holder Name</label
                >
                <input
                  type="text"
                  placeholder="John Doe"
                  class="px-4 py-2.5 bg-transparent text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-0"
                />
              </div>
              <div>
                <label class="block text-sm text-slate-500 font-medium mb-2">Card Number</label>
                <div
                  class="flex bg-transparent border border-gray-300 rounded-md focus-within:border-purple-500 overflow-hidden"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 ml-3" viewBox="0 0 32 20">
                    <circle cx="10" cy="10" r="10" fill="#f93232" data-original="#f93232" />
                    <path
                      fill="#fed049"
                      d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                      class="hovered-path"
                      data-original="#fed049"
                    />
                  </svg>
                  <input
                    type="number"
                    placeholder="xxxx xxxx xxxx"
                    class="px-4 py-2.5 bg-transparent text-slate-900 w-full text-sm outline-0"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-slate-500 font-medium mb-2">Expiry Date</label>
                  <input
                    type="number"
                    placeholder="08/27"
                    class="px-4 py-2.5 bg-transparent text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-0"
                  />
                </div>
                <div>
                  <label class="block text-sm text-slate-500 font-medium mb-2">CVV</label>
                  <input
                    type="number"
                    placeholder="XXX"
                    class="px-4 py-2.5 bg-transparent text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-0"
                  />
                </div>
              </div>
            </div>
          </form>

          <div class="w-full p-3">
            <label for="type2" class="flex items-center cursor-pointer">
              <input
                type="radio"
                class="form-radio h-5 w-5 text-indigo-500"
                name="type"
                id="type2"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                width="80"
                class="ml-3"
              />
            </label>
          </div>
        </div>

        <div>
          <button
            @click="onPayment"
            class="block w-full max-w-xs mx-auto bg-indigo-700 hover:bg-indigo-500 focus:bg-indigo-500 text-white rounded-lg px-3 py-2 font-semibold"
          >
            <i class="mdi mdi-lock-outline mr-1"></i> JETZT BEZAHLEN
          </button>
        </div>
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
import { reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { shopStore } from '../store/shop.store';
import type { ContactInfo, PaymentInfo } from '../interfaces/order.interface';
import { useRouter } from 'vue-router';
import type { ProductItem } from '@/modules/products/interfaces/product.interface';
import { useLocalStorage } from '@vueuse/core';

const productStore = useProductStore();
const router = useRouter();
const orderShopStore = shopStore();
const toast = useToast();
const loading = ref(false);

const contactForm = reactive({
  name: '',
  address: '',
  plz: '',
  city: '',
} as ContactInfo);
const pymentForm = reactive({
  type: 'card',
  cardName: '',
  cardNumber: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: '',
} as PaymentInfo);

const onPayment = async () => {
  console.log(contactForm);
  console.log(pymentForm);
  const productsItems = productStore.productsCart.map((item) => {
    return { productId: item.product.id, quantity: item.quantity };
  });
  const { ok, message } = await orderShopStore.createOrderPayment(
    productsItems,
    contactForm,
    pymentForm,
  );

  if (ok) {
    console.log('sddfgdfg');
    localStorage.setItem('productsCart', ''); //Warenkorb aufräumen
    await orderShopStore.processFakePayment(); //Bezalung Simulieren
    toast.success(message);
    window.location.href = '/';
    return;
  }
  toast.error(message);
  console.log(ok);
};
</script>
