import { instance } from './../base/instance';
import { Product } from '../../../entities/Product.ts';

interface ProductsResponse {
  data?: Product[];
}

type Params = {
  name: string;
  photo?: string | null;
  desc?: string;
  oldPrice?: number | null;
  price: number;
  categoryId: string;
};

const get = async function (pageNumber = 1, pageSize = 50): Promise<Product[]> {
  try {
    const url = `/products?${new URLSearchParams({
      pagination: JSON.stringify({
        pageSize: pageSize,
        pageNumber: pageNumber,
      }),
      sorting: JSON.stringify({ type: 'DESC', field: 'id' }),
    }).toString()}`;

    const response = await instance.get<ProductsResponse>(url);

    return response.data.data ?? [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return [];
  }
};

const getById = async function (id: string): Promise<Product> {
  const response = await instance.get<Product>(`/products/${id}`);
  return response.data;
};

const create = async function (data: Params): Promise<Product> {
  const response = await instance.post<Product>(`/products`, data);
  return response.data;
};

const update = async function (id: string, data: Params): Promise<Product> {
  const response = await instance.put<Product>(`/products/${id}`, data);
  return response.data;
};

export const ProductsApi = {
  get,
  getById,
  create,
  update,
};
