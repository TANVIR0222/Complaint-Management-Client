import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import baseURL from '../../../utils/baseURL'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL()}/user/` }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (newData) => ({
        url: `register`,
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: ['User'],
    }),
    userLogin: builder.mutation({
      query: (newData) => ({
        url: `login`,
        method: 'POST',
        body: newData,
      }),
      invalidatesTags:  ['User'],
    }),
    fetchSingleUser: builder.query({
      query: (id) => `single-user/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    
    logoutUser: builder.mutation({
      query: () => ({
        url: `logout`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUserRegisterMutation  , useUserLoginMutation , useFetchSingleUserQuery ,  useLogoutUserMutation  } = userApi