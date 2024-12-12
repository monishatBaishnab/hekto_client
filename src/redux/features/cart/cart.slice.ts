import { TProduct } from '@/types/products.types';
import { createSlice } from '@reduxjs/toolkit';

type TCart = { productId: string; shopId: string; product: TProduct };

const initialState: { carts: TCart[] } = { carts: [] };

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action: { payload: TCart }) => {
      const cartData = action.payload;

      for (const cart of state?.carts || []) {
        if (cartData.shopId !== cart.shopId) {
          state.carts = [];
        } else if (cart.productId === cartData.productId) {
          return;
        }
      }

      state?.carts?.push(cartData);

      return state;
    },
    removeFromCart: (state, action: { payload: { productId: string } }) => {
      const cartData = action.payload;

      const filteredCartData = state?.carts.filter(
        (cart) => cart.productId !== cartData.productId
      );

      state.carts = filteredCartData;
      return state;
    },
    clearCart: (state) => {
      state.carts = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
