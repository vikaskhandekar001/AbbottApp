// src/utils/errorHandler.ts
import {ApolloError} from '@apollo/client';
import {AppDispatch} from '../redux/store';
// import {setUser} from '../redux/slices/userSlice';

interface ErrorHandlerParams {
  data: any;
  error: ApolloError | null;
  dispatch: AppDispatch;
}

export const handleMutationError = ({
  data,
  error,
  dispatch,
}: ErrorHandlerParams) => {
  if (error) {
    console.error('Mutation Error: ', error.message);
    return false;
  }

  if (data) {
    dispatch(
      setUser({
        id: data.updateUser.id,
        name: data.updateUser.name,
        email: data.updateUser.email,
      }),
    );
    return true;
  }

  return false;
};

export const handleQueryError = ({
  data,
  error,
  dispatch,
}: ErrorHandlerParams) => {
  if (error) {
    console.error('Query Error: ', error.message);
    return false;
  }

  if (data) {
    dispatch(
      setUser({
        id: data.getUser.id,
        name: data.getUser.name,
        email: data.getUser.email,
      }),
    );
    return true;
  }

  return false;
};
