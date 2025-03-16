import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './..';

type CartItem = {
  id: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ id: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.items;
export default cartSlice.reducer;
