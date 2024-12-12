import { baseApi } from '@/redux/base.api';
import { TQueries } from '@/types';

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllShops: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();
        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/shops',
          method: 'GET',
          params,
        };
      },
      providesTags: ['shops'],
    }),
    fetchSingleShop: builder.query({
      query: (id: string) => {
        return {
          url: `/shops/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['shops'],
    }),
    createShop: builder.mutation({
      query: ({ formData }) => {
        return {
          url: `/shops/`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['shops'],
    }),
    updateShop: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/shops/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['shops', 'users'],
    }),
  }),
});

export const {
  useFetchAllShopsQuery,
  useFetchSingleShopQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
} = shopApi;
