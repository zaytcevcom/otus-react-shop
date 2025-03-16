import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }), // Укажите базовый URL
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: data,
      }),
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: '/signin',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
