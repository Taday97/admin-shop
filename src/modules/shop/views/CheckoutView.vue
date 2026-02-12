<template>
  <div class="min-h-screen bg-gray-100">
    <h1 class="mb-10 pt-5 text-center text-2xl font-bold">Kasse</h1>
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
        <form @submit.prevent="onSubmit">
          <!-- Adresse Form -->
          <div
            class="w-full mx-auto border border-gray-200 p-3 text-gray-800 font-light mb-6 rounded-lg bg-white md:p-8 shadow-md"
          >
            <h3 class="text-xl font-semibold text-slate-900">Angaben zur Lieferung</h3>
            <div class="w-full p-3 border-b border-gray-200">
              <div>
                <label class="block text-gray-700 text-sm font-medium mt-2" for="name">Name</label>
                <input
                  id="name"
                  v-model="name"
                  placeholder="Name eingeben"
                  class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <span class="text-red-500 text-sm">{{ errors.name }}</span>

                <label class="block text-gray-700 text-sm font-medium mt-2" for="address"
                  >Adresse</label
                >
                <input
                  id="address"
                  v-model="address"
                  placeholder="Adresse eingeben"
                  class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <span class="text-red-500 text-sm">{{ errors.address }}</span>

                <div class="flex">
                  <div class="flex-grow w-1/4 pr-2">
                    <label class="block text-gray-700 text-sm font-medium mt-2" for="plz"
                      >PLZ</label
                    >
                    <input
                      id="plz"
                      v-model="plz"
                      placeholder="PLZ"
                      class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <span class="text-red-500 text-sm">{{ errors.plz }}</span>
                  </div>
                  <div class="flex-grow">
                    <label class="block text-gray-700 text-sm font-medium mt-2" for="city"
                      >Stadt</label
                    >
                    <input
                      id="city"
                      v-model="city"
                      placeholder="Stadt eingeben"
                      class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <span class="text-red-500 text-sm">{{ errors.city }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Zahlungsinformationen -->
          <div
            class="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6 p-6 md:p-8 shadow-md"
          >
            <h3 class="text-xl font-semibold text-slate-900">Zahlungsdetails</h3>

            <div class="flex flex-wrap gap-y-6 gap-x-12 mt-4 mb-8">
              <div class="flex items-center">
                <input
                  type="radio"
                  name="pay"
                  class="w-5 h-5 cursor-pointer"
                  id="card"
                  value="card"
                  v-model="type"
                />
                <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                  <img src="https://readymadeui.com/images/visa.webp" class="w-12" />
                  <img src="https://readymadeui.com/images/american-express.webp" class="w-12" />
                  <img src="https://readymadeui.com/images/master.webp" class="w-12" />
                </label>
              </div>

              <div class="flex items-center">
                <input
                  type="radio"
                  name="pay"
                  class="w-5 h-5 cursor-pointer"
                  id="paypal"
                  value="paypal"
                  v-model="type"
                />
                <label for="paypal" class="ml-4 flex gap-2 cursor-pointer">
                  <img src="https://readymadeui.com/images/paypal.webp" class="w-20" />
                </label>
              </div>
              <span class="text-red-500 text-sm">{{ errors.type }}</span>
            </div>

            <div v-if="type === 'card'" class="grid gap-6 mt-6">
              <div>
                <label class="block text-sm text-slate-500 font-medium mb-2"
                  >Name des Karteninhabers</label
                >
                <input
                  type="text"
                  v-model="cardName"
                  placeholder="Max Mustermann"
                  class="px-4 py-2.5 bg-transparent text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-0"
                />
                <span class="text-red-500 text-sm">{{ errors.cardName }}</span>
              </div>

              <div>
                <label class="block text-sm text-slate-500 font-medium mb-2">Kartennummer</label>
                <input
                  v-model="cardNumber"
                  type="number"
                  placeholder="xxxx xxxx xxxx"
                  class="px-4 py-2.5 bg-transparent text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-0"
                />
                <span class="text-red-500 text-sm">{{ errors.cardNumber }}</span>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-slate-500 font-medium mb-2">Ablaufdatum</label>
                  <input
                    type="text"
                    placeholder="08/2027"
                    inputmode="numeric"
                    maxlength="7"
                    v-model="expiryInput"
                    class="px-4 py-2.5 bg-transparent text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-0"
                  />
                  <span class="text-red-500 text-sm">{{
                    errors.expiryMonth || errors.expiryYear
                  }}</span>
                </div>

                <div>
                  <label class="block text-sm text-slate-500 font-medium mb-2"
                    >Sicherheitscode (CVV)</label
                  >
                  <input
                    v-model="cvv"
                    type="number"
                    placeholder="XXX"
                    class="px-4 py-2.5 bg-transparent text-slate-900 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-0"
                  />
                  <span class="text-red-500 text-sm">{{ errors.cvv }}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="block w-full max-w-xs mx-auto bg-indigo-700 hover:bg-indigo-500 focus:bg-indigo-500 text-white rounded-lg px-3 py-2 font-semibold mt-6"
            >
              <i class="mdi mdi-lock-outline mr-1"></i> JETZT BEZAHLEN
            </button>
          </div>
        </form>
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
import { computed, reactive, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { shopStore } from '../store/shop.store';
import type { ContactInfo, PaymentInfo } from '../interfaces/order.interface';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Name ist erforderlich'),
  address: yup.string().required('Adresse ist erforderlich'),
  plz: yup
    .string()
    .required('PLZ ist erforderlich')
    .matches(/^\d{5}$/, 'PLZ muss 5-stellig sein'),
  city: yup.string().required('Stadt ist erforderlich'),

  // Pago con tarjeta
  type: yup.string().required('Bitte wählen Sie die Zahlungsart'),
  cardName: yup.string().when('type', {
    is: 'card',
    then: (schema) => schema.required('Name des Karteninhabers ist erforderlich'),
  }),
  cardNumber: yup.string().when('type', {
    is: 'card',
    then: (schema) =>
      schema
        .required('Kartennummer ist erforderlich')
        .matches(/^\d{16}$/, 'Kartennummer muss 16 Ziffern haben'),
  }),
  expiryMonth: yup.string().when('type', {
    is: 'card',
    then: (schema) =>
      schema.required('Monat erforderlich').matches(/^(0[1-9]|1[0-2])$/, 'Ungültiger Monat'),
  }),
  expiryYear: yup.string().when('type', {
    is: 'card',
    then: (schema) => schema.required('Jahr erforderlich').matches(/^\d{4}$/, 'Ungültiges Jahr'),
  }),
  cvv: yup.string().when('type', {
    is: 'card',
    then: (schema) =>
      schema.required('CVV erforderlich').matches(/^\d{3}$/, 'CVV muss 3 Ziffern haben'),
  }),
});
const { handleSubmit, errors, values } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    address: '',
    plz: '',
    city: '',
    type: '',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  },
});
const { value: name } = useField<string>('name');
const { value: address } = useField<string>('address');
const { value: plz } = useField<string>('plz');
const { value: city } = useField<string>('city');
const { value: type } = useField<string>('type');
const { value: cardName } = useField<string>('cardName');
const { value: cardNumber } = useField<string>('cardNumber');
const { value: cvv } = useField<string>('cvv');

const productStore = useProductStore();
const orderShopStore = shopStore();
const toast = useToast();

const { value: expiryMonth } = useField<string>('expiryMonth');
const { value: expiryYear } = useField<string>('expiryYear');

const expiryInput = ref(''); // lo que ve el usuario

watch(
  () => expiryInput.value,
  (val, oldVal) => {
    const clean = val.replace(/\D/g, '');

    expiryMonth.value = clean.slice(0, 2);
    expiryYear.value = clean.slice(2, 6);

    if (clean.length <= 2) {
      expiryInput.value = clean;
    } else if (clean.length <= 6) {
      expiryInput.value = `${clean.slice(0, 2)}/${clean.slice(2)}`;
    } else {
      expiryInput.value = `${clean.slice(0, 2)}/${clean.slice(2, 6)}`;
    }
  },
);

console.log('sdfsdf');
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
const onSubmit = handleSubmit(async () => {
  contactForm.name = name.value;
  contactForm.address = address.value;
  contactForm.plz = plz.value;
  contactForm.city = city.value;

  pymentForm.type = type.value as 'card' | 'paypal';
  pymentForm.cardName = cardName.value.toString();
  pymentForm.cardNumber = cardNumber.value.toString();
  pymentForm.expiryMonth = expiryMonth.value.toString();
  pymentForm.expiryYear = expiryYear.value.toString();
  pymentForm.cvv = cvv.value.toString();

  const productsItems = productStore.productsCart.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));

  const { ok, message } = await orderShopStore.createOrderPayment(
    productsItems,
    contactForm,
    pymentForm,
  );

  if (ok) {
    localStorage.setItem('productsCart', '');
    await orderShopStore.processFakePayment();
    toast.success(message);
    window.location.href = '/orders';
  } else {
    toast.error(message);
  }
});

/* const onPayment = async () => {
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
}; */
</script>
