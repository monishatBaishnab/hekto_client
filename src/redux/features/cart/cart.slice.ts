import { createSlice } from '@reduxjs/toolkit';

type TCart = { productId: string; shopId: string };

const initialState: TCart[] = [];

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action: { payload: TCart }) => {
      const cartData = action.payload;

      for (const cart of state || []) {
        if (cartData.shopId !== cart.shopId) {
          state = [];
        } else if (cart.productId === cartData.productId) {
          return;
        }
      }

      state?.push(cartData);
    },
    removeFromCart: (state, action: { payload: TCart }) => {
      const cartData = action.payload;

      const filteredCartData = state.filter(
        (cart) => cart.productId !== cartData.productId
      );

      state = filteredCartData;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
