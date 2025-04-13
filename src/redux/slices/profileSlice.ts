// src/features/api/authApiSlice.js
import {apiSlice} from '../../services/api'; // Assuming apiSlice is already set up with your base query

export const profileSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // getProfile query
    getProfile: builder.query<any, void>({
      query: () => '/profile-info',
    }),
  }),
});

// Export the generated hook
export const {useGetProfileQuery} = profileSlice;
