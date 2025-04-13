import {configureStore} from '@reduxjs/toolkit';
import postReducer from './slices/userSlice';
// import profileReducer from './slices/profileSlice';
import {useDispatch} from 'react-redux';
import {apiSlice} from '../services/api';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    post: postReducer,
    // profile: profileReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware().concat(apiSlice.middleware);

    // Only use redux-logger in development
    if (__DEV__) {
      middlewares.push(logger);
    }

    return middlewares;
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
