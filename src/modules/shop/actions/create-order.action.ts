import { tesloApi } from '@/api/tesloApi';
import type {
  ProductItem,
  ProductItemCreate,
} from '@/modules/products/interfaces/product.interface';
import type { ContactInfo, Order, PaymentInfo } from '../interfaces/order.interface';

interface ResponseError {
  ok: false;
  message: string;
}
interface ResponseSuccess {
  ok: true;
  order: Order;
}

export const createOrderAction = async (
  items: ProductItemCreate[],
  contact: ContactInfo,
  payment: PaymentInfo,
): Promise<ResponseError | ResponseSuccess> => {
  try {
    console.log(items);
    const { data } = await tesloApi.post<ResponseSuccess>('/orders/payment/', {
      items,
      contact,
      payment,
    });
    return {
      ok: true,
      order: data.order,
    };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: 'Beim Bezahlen ist ein Fehler aufgetreten',
    };
  }
};
