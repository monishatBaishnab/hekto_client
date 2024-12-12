import { baseApi } from '@/redux/base.api';
import { TQueries } from '@/types';

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllReview: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();
        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/reviews',
          method: 'GET',
          params,
        };
      },
      providesTags: ['reviews'],
    }),
    createReview: builder.mutation({
      query: (payload) => {
        return {
          url: `/reviews`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['reviews', 'products'],
    }),
    deleteReview: builder.mutation({
      query: (id) => {
        return {
          url: `/reviews/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['reviews'],
    }),
  }),
});

export const {
  useFetchAllReviewQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
