import { baseApi } from '@/redux/base.api';
import { TQueries } from '@/types';

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllCategories: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();

        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/categories',
          method: 'GET',
          params,
        };
      },
      providesTags: ['categories'],
    }),
  }),
});

export const { useFetchAllCategoriesQuery } = categoryApi;
