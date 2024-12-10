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
        console.log(userInfo.get('file'));
        return {
          url: '/auth/register',
          method: 'POST',
          body: userInfo,
        };
      },
    }),
  }),
});

export const { useLogInMutation, useRegisterMutation } = authApi;
