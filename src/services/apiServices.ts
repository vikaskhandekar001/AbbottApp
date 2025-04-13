// src/utils/apiService.ts

import axiosInstance from './AxiosInstance';

type RequestParams = {
  [key: string]: any;
};

const apiCall = async (
  method: string,
  url: string,
  data: any = null,
  params: RequestParams = {},
): Promise<any> => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
    });
    console.log('vikas_KHandekar', response);

    return response.data; // Return only the data from the response
  } catch (error: any) {
    console.log('vikas_KHandekar error', error);

    throw error.response ? error.response.data : error.message; // Handle errors gracefully
  }
};

// Wrapper function for GET request
export const get = (url: string, params: RequestParams = {}): Promise<any> =>
  apiCall('get', url, null, params);

// Wrapper function for POST request
export const post = (
  url: string,
  data: any = {},
  params: RequestParams = {},
): Promise<any> => apiCall('post', url, data, params);

// Wrapper function for PUT request
export const put = (
  url: string,
  data: any = {},
  params: RequestParams = {},
): Promise<any> => apiCall('put', url, data, params);

// Wrapper function for DELETE request
export const del = (url: string, params: RequestParams = {}): Promise<any> =>
  apiCall('delete', url, null, params);

export default {get, post, put, del};
