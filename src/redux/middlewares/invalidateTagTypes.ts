import { Middleware } from '@reduxjs/toolkit';
import { baseApi, tagTypes } from '@/redux/base.api';
import { logout } from '../features/auth/auth.slice';

export const invalidateTagsOnLogoutMiddleware: Middleware = (store) => (next) => (action) => {
  if (logout.match(action)) {
    // Dispatch invalidation of all tags
    store.dispatch(baseApi.util.invalidateTags(tagTypes));
  }
  return next(action);
};
