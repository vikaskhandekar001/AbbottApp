import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import client from '../../services/ApolloProvider'; // Apollo Client instance
import {POST_MUTATION} from '../../graphql/mutations/userMutation'; // Import mutation
// import {PostLinkMutation} from '../../graphql/generated/types'; // Import generated types

interface PostState {
  post: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  post: null,
  loading: false,
  error: null,
};

// Async thunk for posting data
export const postLink = createAsyncThunk<
  any['post'],
  {url: string; description: string},
  {rejectValue: string}
>('post/postLink', async ({url, description}, {rejectWithValue}) => {
  try {
    const {data} = await client.mutate<any>({
      mutation: POST_MUTATION,
      variables: {url, description},
    });
    console.log('data===>', data);
    return data.post; // Returning the post data
  } catch (error:any) {
    return rejectWithValue(error.message || 'Failed to post data');
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Posting data
      .addCase(postLink.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLink.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;

        console.log('data===> in store', action);
        state.post = action.payload; // Set the post data after success
      })
      .addCase(postLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;
