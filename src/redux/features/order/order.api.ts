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
          url: '/orders',
          method: 'GET',
          params,
        };
      },
      providesTags: ['orders'],
    }),
  }),
});

export const { useFetchAllOrdersQuery } = productApi;
