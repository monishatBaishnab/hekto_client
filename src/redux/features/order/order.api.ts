import { baseApi } from '@/redux/base.api';
import { TQueries } from '@/types';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllOrders: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();
        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/orders/all',
          method: 'GET',
          params,
        };
      },
      providesTags: ['orders'],
    }),
    fetchMyOrders: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();
        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/orders/',
          method: 'GET',
          params,
        };
      },
      providesTags: ['orders', 'my'],
    }),
    createOrder: builder.mutation({
      query: (orderData) => {
        return {
          url: '/orders',
          method: 'POST',
          body: orderData,
        };
      },
      invalidatesTags: ['orders'],
    }),
  }),
});

export const { useFetchAllOrdersQuery, useFetchMyOrdersQuery, useCreateOrderMutation } = productApi;
