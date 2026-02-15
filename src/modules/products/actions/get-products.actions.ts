import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductsActions = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await tesloApi.get<{ data: Product[]; total: number }>(
      `/products?limit=${limit}&offset=${(page - 1) * limit}`,
    );

    const { data, total } = response.data;

    return {
      data: data.map((product) => ({
        ...product,
        images: product.images.map(getProductImageAction),
      })),
      total: total,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};
