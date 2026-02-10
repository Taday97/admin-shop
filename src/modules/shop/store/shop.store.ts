import { defineStore } from 'pinia';
import { createOrderAction } from '../actions/create-order.action';
import type { ContactInfo, PaymentInfo } from '../interfaces/order.interface';
import type { ProductItem, ProductItemCreate } from '@/modules/products/interfaces/product.interface';
import { ref } from 'vue';

export const shopStore = defineStore('order', () => {
  const createOrderPayment = async (
    items: ProductItemCreate[],
    contact: ContactInfo,
    payment: PaymentInfo,
  ) => {
    try {
      const orderResp = await createOrderAction(items, contact, payment);
      if (!orderResp.ok) {
        return { ok: false, message: orderResp.message };
      }

      return { ok: true, message: 'Die Zahlung wurde erfolgreich durchgeführt' };
    } catch (error) {
      console.log(error);
      return { ok: false, message: '' };
    }
  };

  const isProcessingPayment = ref(false);
  async function processFakePayment() {
    isProcessingPayment.value = true;

    // Simulation von Bezalung (3 segundos)
    await new Promise((resolve) => setTimeout(resolve, 3_000));

    isProcessingPayment.value = false;
  }

  //Die sieht man in Pinia
  return {
    createOrderPayment,
    isProcessingPayment,
    processFakePayment,
  };
});
