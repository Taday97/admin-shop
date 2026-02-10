import { tesloApi } from '@/api/tesloApi';
import type { Order } from '../interfaces/order.interface';
import { getProductImageAction } from '@/modules/products/actions';

export const getOrdersActions = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Order[]>(
      `/orders?limit=${limit}&offset=${(page - 1) * limit}`,
    );
    /*  const { data } = await tesloApi.get<Order[]>(`/orders`); */

    console.log(data);

    return data.map((order) => ({
      ...order,
      images: order.items.map((item) => getProductImageAction(item.product.images[0]!)),
    }));
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};
