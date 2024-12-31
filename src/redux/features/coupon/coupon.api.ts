import { baseApi } from '@/redux/base.api';
import { TQueries } from '@/types';

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllCoupons: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();
        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/coupons/',
          method: 'GET',
          params,
        };
      },
      providesTags: ['coupons'],
    }),
    createCoupons: builder.mutation({
      query: (payload) => {
        return {
          url: `/coupons`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['coupons', 'products'],
    }),
    applyCoupon: builder.mutation({
      query: (payload) => {
        return {
          url: `/coupons/apply`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['coupons', 'products'],
    }),
    updateCoupons: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/coupons/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['coupons'],
    }),
    deleteCoupons: builder.mutation({
      query: (id) => {
        return {
          url: `/coupons/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['coupons'],
    }),
  }),
});

export const {
  useFetchAllCouponsQuery,
  useApplyCouponMutation,
  useCreateCouponsMutation,
  useUpdateCouponsMutation,
  useDeleteCouponsMutation,
} = couponApi;
