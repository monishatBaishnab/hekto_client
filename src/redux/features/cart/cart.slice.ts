import { TProduct } from '@/types/products.types';
import { createSlice } from '@reduxjs/toolkit';

type TCart = {
  productId: string;
  shopId: string;
  product: TProduct;
  quantity: number;
};

const initialState: { carts: TCart[] } = { carts: [] };

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action: { payload: TCart }) => {
      const cartData = action.payload;
    
      // If the cart contains products from a different shop, clear the cart
      if (state.carts.some((cart) => cart.shopId !== cartData.shopId)) {
        state.carts = [];
      }
    
      // Check if the product already exists in the cart
      const existingCartItem = state.carts.find(
        (cart) => cart.productId === cartData.productId
      );
    
      if (existingCartItem) {
        // Increase the quantity if the total doesn't exceed the limit
        if (existingCartItem.quantity + cartData.quantity <= 5) {
          existingCartItem.quantity += cartData.quantity;
        }
      } else {
        // Add the new product to the cart
        state.carts.push(cartData);
      }
    
      return state;
    },
    increaseQty: (state, action) => {
      const productId = action.payload;
      const existingCartItem = state.carts.find((cart) => cart.productId === productId);

      if (existingCartItem && existingCartItem.quantity < 5) {
        existingCartItem.quantity += 1;
      }
    },
    decreaseQty: (state, action) => {
      const productId = action.payload;
      const existingCartItem = state.carts.find((cart) => cart.productId === productId);

      if (existingCartItem && existingCartItem.quantity > 1) {
        existingCartItem.quantity -= 1;
      }
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

export const { addToCart, removeFromCart, clearCart, increaseQty, decreaseQty } = cartSlice.actions;

export default cartSlice.reducer;
