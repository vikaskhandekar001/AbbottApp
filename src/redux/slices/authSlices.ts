// src/features/api/authApiSlice.js
import {apiSlice} from '../../services/api'; // Assuming apiSlice is already set up with your base query

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // Login Mutation
    login: builder.mutation({
      query: ({email, password}) => ({
        url: '/auth/login',
        method: 'POST',
        body: {email, password},
      }),
    }),
    signup: builder.mutation({
      query: ({email, password}) => ({
        url: '/auth/signup',
        method: 'POST',
        body: {email, password},
      }),
    }),
  }),
});

// Export the generated hook
export const {useLoginMutation, useSignupMutation} = authApiSlice;
