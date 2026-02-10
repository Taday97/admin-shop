import type { User } from "@/modules/auth/interfaces";
import type { Product } from "@/modules/products/interfaces/product.interface";

export interface Order {
    id:        number;
    total:     number;
    status:    string;
    orderDate: Date;
    user:      User;
    items:     Item[];
}

export interface Item {
    id:       number;
    quantity: number;
    price:    number;
    product:  Product;
}

export interface ContactInfo {
  name: string;
  address: string;
  plz: string;
  city: string;
}

export interface PaymentInfo {
  type:  'card'| 'paypal';
  cardName?: string;
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
}
