import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './..';
import { Product } from '../../entities/Product.ts';

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.unshift(action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      state.filter((product) => product.id !== action.payload.id);
    },
    loadMore: (state, action: PayloadAction<Product[]>) => {
      for (const product of action.payload) {
        state.push(product);
      }
    },
  },
});

export const { addProduct, editProduct, removeProduct, loadMore } =
  productsSlice.actions;
export const selectProducts = (state: RootState) => state.products;
export default productsSlice.reducer;
