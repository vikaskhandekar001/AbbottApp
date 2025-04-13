import {configureStore} from '@reduxjs/toolkit';
import postReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice';
import {useDispatch} from 'react-redux';

export const store = configureStore({
  reducer: {
    post: postReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
