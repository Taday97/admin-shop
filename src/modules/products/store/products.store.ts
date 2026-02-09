import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import type { Product, ProductItem } from '../interfaces/product.interface';

export const useProductStore = defineStore('product', () => {
  const productsCart = useLocalStorage<ProductItem[]>('productsCart', []);

  const quantityCard = computed(() =>
    productsCart.value.reduce((acc, item) => acc + item.quantity, 0),
  );
  const totalPrice = computed(() =>
    productsCart.value.reduce((acc, item) => {
      return acc + item.product.price * (item.quantity == 0 ? 1 : item.quantity);
    }, 0),
  );

  const addToCart = (product: Product, quantity: number = 1) => {
    let exist = productsCart.value.some((item) => {
      if (item.product.id == product.id) {
        item.quantity = item.quantity + quantity;
        return true;
      }
      return false;
    });
    if (!exist) {
      productsCart.value.push({
        product,
        quantity,
      });
    }
  };
  const removeToCart = (product: Product) => {
    let exist = productsCart.value.some(l=>l.product.id===product.id);
    if (exist) {
      productsCart.value = productsCart.value.filter(l=>l.product.id!==product.id);
    }
  };

  return {
    productsCart,
    quantityCard,
    totalPrice,
    addToCart,
    removeToCart,
  };
});
