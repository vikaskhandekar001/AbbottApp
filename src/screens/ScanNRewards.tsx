import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {RootState, useAppDispatch} from '../redux/store';
import {useSelector} from 'react-redux';
import {fetchProfileInfo} from '../redux/slices/profileSlice';

const ScanNRewardsScreen = () => {
  const dispatch = useAppDispatch();
  const {profileInfo, status, error} = useSelector(
    (state: RootState) => state?.profile,
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProfileInfo()); // Fetch profile info if idle
    }
  }, [dispatch, status]);

  return (
    <View>
      <Text>Hello vikas</Text>
      <Text>Scan N Rewards</Text>
    </View>
  );
};

export default ScanNRewardsScreen;
