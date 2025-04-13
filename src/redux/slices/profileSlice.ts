import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  fetchProfileInfoAPI,
  updateProfileInfoAPI,
} from '../../services/AxiosInstance'; // Import API services

import {API_ENDPOINTS} from '../../services/constants';
// Define the state interface for profile info
interface ProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  userType: string;
}

interface ProfileState {
  profile: ProfileInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

// Define the async thunk to fetch profile info
export const fetchProfileInfo1 = createAsyncThunk<
  ProfileInfo, // Return type
  void, // No parameters for the API call
  {rejectValue: string} // Reject type
>('profile/fetchProfileInfo', async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get(
      'https://www.similac.com/api/private/profile/profile-info',
      {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          store: 'new_similac',
          'x-application-id': 'similac',
          'x-country-code': 'US',
          'x-id-token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJFUTBNVVE1TjBOQ1JUSkVNemszTTBVMVJrTkRRMFUwUTBNMVJFRkJSamhETWpkRU5VRkJRZyJ9.eyJpc3MiOiJodHRwczovL2ZpZG0uZ2lneWEuY29tL2p3dC8zXzZkc2JSbldfME5pM0EyOTROdlJCVTI3NFJtdjhRY3duOW53OS1Da1dVV0dlaXVKdXNSdm5kMFZlTG9RZk52aVIvIiwiYXBpS2V5IjoiM182ZHNiUm5XXzBOaTNBMjk0TnZSQlUyNzRSbXY4UWN3bjludzktQ2tXVVdHZWl1SnVzUnZuZDBWZUxvUWZOdmlSIiwiaWF0IjoxNzQ0MDExOTc3LCJleHAiOjE3NDQwMTU1NzcsInN1YiI6IjBmNWEzOGViNWM5ZTQ0YThhNWNhNzY5Yzk5MGE4OTJmIiwiZGF0YS51c2VyVHlwZSI6InNpbWlsYWMtc3NtIn0.pNXJhhCJQpKYx6tQY9M69HdbZjXYmv0RHVw4VJY0BiayftFyngRbGBB7DLaT6gE8KnmOnM12dISlaGoHHpmSFAsc73Z9B4YBsCXpBNj1CE74hmmS9BThhE7Z0rhff5o1bWjmK9SFuElcOvYJt59uHN5fckJRtgZ9rr6_kjXIBEE_allCBvKHiMsryu7TkOfkBCcbCyQUq9rvTVbSjyugdRdEV023E8kbcGpLEuZo8f1bU32ccy_v2lL1NfA1Vygu6XZ-OFGIxVq9-kg9aVsGw-vx_tD99EK_LIweI7G0jNVKP9n6W0wcbacqhgA4WGuY_3fkfnmE889Skr5D4a5VHQ', // Replace with a valid token
        },
      },
    );

    console.log('response', response);

    return response.data; // Assuming the API response is the profile data
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || 'Failed to fetch profile info';
    return rejectWithValue(errorMessage); // Return error message if API call fails
  }
});

export const fetchProfileInfo = createAsyncThunk<
  ProfileInfo,
  void,
  {rejectValue: string}
>('profile/fetchProfileInfo', async (_, {rejectWithValue}) => {
  try {
    const data = await fetchProfileInfoAPI(API_ENDPOINTS.PROFILE_INFO); // Call the API service

    console.log('data---->', data);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Error fetching profile');
  }
});

// Create the slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: state => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Handle the pending state (API call in progress)
      .addCase(fetchProfileInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      // Handle the fulfilled state (API call successful)
      .addCase(
        fetchProfileInfo.fulfilled,
        (state, action: PayloadAction<ProfileInfo>) => {
          console.log('vikas_khandekar', action.payload);
          state.loading = false;
          state.profile = action.payload; // Set the profile data
        },
      )
      // Handle the rejected state (API call failed)
      .addCase(fetchProfileInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set the error message
      });
  },
});

export const {resetProfile} = profileSlice.actions;

export default profileSlice.reducer;
