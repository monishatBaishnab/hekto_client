import { baseApi } from '@/redux/base.api';

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followShop: builder.mutation({
      query: (followData) => {
        return {
          url: '/follows/shop',
          method: 'POST',
          body: followData,
        };
      },
      invalidatesTags: ['shops'],
    }),
  }),
});

export const { useFollowShopMutation } = followApi;
