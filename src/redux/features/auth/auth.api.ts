import { baseApi } from '@/redux/base.api';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: '/auth/register',
          method: 'POST',
          body: userInfo,
        };
      },
    }),
    forgot: builder.mutation({
      query: (userInfo) => {
        return {
          url: '/auth/forgot-password',
          method: 'POST',
          body: userInfo,
        };
      },
    }),
    reset: builder.mutation({
      query: ({ password, token }) => {
        return {
          url: '/auth/reset-password',
          method: 'POST',
          body: { password },
          headers: { Authorization: token },
        };
      },
    }),
  }),
});

export const {
  useLogInMutation,
  useRegisterMutation,
  useForgotMutation,
  useResetMutation,
} = authApi;
