import { baseApi } from '@/redux/base.api';
import { TQueries } from '@/types';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();
        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/products',
          method: 'GET',
          params,
        };
      },
      providesTags: ['products'],
    }),
  }),
});

export const { useFetchAllProductsQuery } = productApi;