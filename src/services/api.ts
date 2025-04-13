// src/features/api/apiSlice.js
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from './constants';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async headers => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  keepUnusedDataFor: 5,
  tagTypes: ['auth', 'profile'], // Optional: add tagTypes based on your models
  endpoints: () => ({}), // Will inject endpoints later
});
