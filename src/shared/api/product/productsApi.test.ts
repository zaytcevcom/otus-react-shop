import MockAdapter from 'axios-mock-adapter';
import { ProductsApi } from './productsApi.ts';
import { Product } from '../../../entities/Product';
import { instance } from '../base/instance.ts';
import { describe, it, expect, afterEach } from '@jest/globals';

const mock = new MockAdapter(instance);

describe('ProductsApi', () => {
  afterEach(() => {
    mock.reset();
  });

  describe('get', () => {
    it('return array of products in case success', async () => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Продукт 1',
          price: 100,
          createdAt: '2025-03-16T07:09:28+00:00',
          category: {
            id: '1',
            name: 'Категория 1',
            photo: undefined,
          },
        },
        {
          id: '2',
          name: 'Продукт 2',
          price: 200,
          createdAt: '2025-03-16T07:09:28+00:00',
          category: {
            id: '2',
            name: 'Категория 2',
            photo: undefined,
          },
        },
      ];

      const url =
        '/products?pagination=%7B%22pageSize%22%3A50%2C%22pageNumber%22%3A1%7D&sorting=%7B%22type%22%3A%22DESC%22%2C%22field%22%3A%22id%22%7D';

      mock.onGet(url).reply(200, { data: mockProducts });

      const result = await ProductsApi.get();

      expect(result).toEqual(mockProducts);
    });

    it('return empty array in case error', async () => {
      mock.onGet('/products').reply(500);

      const result = await ProductsApi.get();
      expect(result).toEqual([]);
    });
  });

  describe('getById', () => {
    it('return product by id', async () => {
      const mockProduct: Product = {
        category: {
          id: '1',
          name: 'Категория 1',
          photo: undefined,
        },
        createdAt: '2025-03-16T07:09:28+00:00',
        id: '1',
        name: 'Продукт 1',
        price: 100,
      };

      mock.onGet('/products/1').reply(200, mockProduct);

      const result = await ProductsApi.getById('1');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('create', () => {
    it('create a new product', async () => {
      const newProduct = { name: 'Новый продукт', price: 300, categoryId: '1' };
      const createdProduct: Product = {
        category: {
          id: '1',
          name: 'Категория 1',
          photo: undefined,
        },
        createdAt: '2025-03-16T07:09:28+00:00',
        id: '3',
        ...newProduct,
      };

      mock.onPost('/products').reply(201, createdProduct);

      const result = await ProductsApi.create(newProduct);
      expect(result).toEqual(createdProduct);
    });
  });
});
