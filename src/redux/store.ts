import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/auth.slice';
import cartReducer from '../redux/features/cart/cart.slice';
import recentReducer from '../redux/features/recent/recent.slice';
import storage from 'redux-persist/lib/storage';
import { baseApi } from './base.api';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Persist configuration for authentication
const authPersistConfig = {
  key: 'hekto_auth',
  storage,
};

// Persist configuration for cart
const cartPersistConfig = {
  key: 'hekto_cart',
  storage,
};

// Persist configuration for cart
const recentPersistConfig = {
  key: 'hekto_recent_products',
  storage,
};

// Apply persist configurations to reducers
const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const cartPersistedReducer = persistReducer(cartPersistConfig, cartReducer);
const recentPersistedReducer = persistReducer(
  recentPersistConfig,
  recentReducer
);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Base API slice
    auth: authPersistedReducer, // Persisted auth reducer
    cart: cartPersistedReducer, // Persisted cart reducer
    recent: recentPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore redux-persist actions
      },
    }).concat(baseApi.middleware), // Add API middleware
});

// Infer the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create the persistor for redux-persist
export const persistor = persistStore(store);
