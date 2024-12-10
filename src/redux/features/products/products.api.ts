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
    fetchProductById: builder.query({
      query: (id: string) => {
        return {
          url: `/products/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_, __, id) => [{ type: 'products', id }],
    }),
    createProduct: builder.mutation({
      query: (productData) => {
        return {
          url: '/products',
          method: 'POST',
          body: productData,
        };
      },
      invalidatesTags: ['products'],
    }),
    updateProduct: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/products/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['products'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi;
