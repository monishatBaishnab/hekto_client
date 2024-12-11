import { baseApi } from '@/redux/base.api';
import { TQueries } from '@/types';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllUser: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();
        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/users',
          method: 'GET',
          params,
        };
      },
      providesTags: ['users'],
    }),
    fetchProfileInfo: builder.query({
      query: (id: string) => {
        return {
          url: `/users/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_, __, id) => [{ type: 'users', id }],
    }),
    updateProfile: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/users/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (_, __, {id}) => {
        
        return ['users', id]
      },
    }),
  }),
});

export const { useFetchAllUserQuery, useFetchProfileInfoQuery, useUpdateProfileMutation } = productApi;
