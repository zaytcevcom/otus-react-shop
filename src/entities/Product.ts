import { Category } from './Category.ts';

export type Product = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};
