import { TProduct } from '@/types/products.types';
import { createSlice } from '@reduxjs/toolkit';

type TRecent = { product: TProduct };

const initialState: { recentProducts: TRecent[] } = { recentProducts: [] };

const recentSlice = createSlice({
  name: 'recentProducts',
  initialState,
  reducers: {
    addToRecent: (state, action: { payload: TRecent }) => {
      const recentData = action.payload;

      // Check if the product already exists in the recentProducts list
      const isAlreadyPresent = state.recentProducts.some(
        (product) => product.product.id === recentData.product.id
      );

      if (!isAlreadyPresent) {
        // If there are more than 10 products, remove the first one
        if (state.recentProducts.length >= 10) {
          state.recentProducts.pop(); // Remove the first product
        }

        // Add the new product
        state.recentProducts.unshift(recentData);
      }
    },
    clearRecent: (state) => {
      state.recentProducts = [];
    },
  },
});

export const { addToRecent, clearRecent } = recentSlice.actions;

export default recentSlice.reducer;
