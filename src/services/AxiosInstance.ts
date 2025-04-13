import axios from 'axios';
import {API_BASE_URL} from './constants';

// Get the token from localStorage or any other secure storage
const getToken = () => {
  // Replace with your preferred method of storing/retrieving the token
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJFUTBNVVE1TjBOQ1JUSkVNemszTTBVMVJrTkRRMFUwUTBNMVJFRkJSamhETWpkRU5VRkJRZyJ9.eyJpc3MiOiJodHRwczovL2ZpZG0uZ2lneWEuY29tL2p3dC8zXzZkc2JSbldfME5pM0EyOTROdlJCVTI3NFJtdjhRY3duOW53OS1Da1dVV0dlaXVKdXNSdm5kMFZlTG9RZk52aVIvIiwiYXBpS2V5IjoiM182ZHNiUm5XXzBOaTNBMjk0TnZSQlUyNzRSbXY4UWN3bjludzktQ2tXVVdHZWl1SnVzUnZuZDBWZUxvUWZOdmlSIiwiaWF0IjoxNzQ0MDE2MTQzLCJleHAiOjE3NDQwMTk3NDMsInN1YiI6IjBmNWEzOGViNWM5ZTQ0YThhNWNhNzY5Yzk5MGE4OTJmIiwiZGF0YS51c2VyVHlwZSI6InNpbWlsYWMtc3NtIn0.onfTkoUzii_a7ArctgKZfg_bDfcjh_icHdKyiPIz22RggDVj8Ce97LLn9MxjcJoglBEtzFu1nTZ8JDFlBMFIVqSgMUxbR-GSa5_meTzYlkvbXyxWw5024VS_28J1G9SBa-CTq45OQyagWepWVOpj5TyV4qphaPqCXH1w4xW1DPE7haou1K9iljRWoUy5sUdYm12j6YKLy-TVNZhnJZvzQOf3NnslaX57czOgbjQ8XKG9ToVxj-58GS8JH3MqHnxe5QXF8jOIcFnCS871RSuWFLVGKEUWwYSLQLgcfHUZgMZHct8VXk3iS8H7CtONijxQMESpdvuqRGQcb4zqvOHoSQ'; // This is just a placeholder
};
const createHeaders = () => {
  // Get the token from wherever you store it (localStorage, Redux, etc.)
  // const token = localStorage.getItem('authToken'); // You can change this if using Redux or another method

  // if (!getToken()) {
  //   throw new Error('No token found');
  // }

  return {
    "accept": 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    "store": 'new_similac', // This can be customized
    'x-application-id': 'similac', // Custom header for your app
    'x-country-code': 'US', // You may want to change this based on region
    'x-id-token': getToken(), // Use the token directly here
  };
};
// Fetch profile information (GET request)
export const fetchProfileInfoAPI = async (req: string) => {
  try {
    const response = await axios.get(API_BASE_URL + req, {
      headers: createHeaders(),
    });

    console.log('response from axiosInstance', response);

    return response.data; // Return the fetched profile data
  } catch (error) {
    console.log('error from axiosInstance', error);

    throw new Error(
      error?.response?.data?.message || 'Failed to fetch profile info',
    );
  }
};

// Update profile information (POST request)
export const updateProfileInfoAPI = async (profileData: any, url: string) => {
  try {
    const response = await axios.post(API_BASE_URL + url, profileData, {
      headers: createHeaders(),
    });
    return response.data; // Return the response data after the POST request
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || 'Failed to update profile info',
    );
  }
};
