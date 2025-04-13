import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {fetchProfileInfo} from '../redux/slices/profileSlice'; // Update path to your slice
import {RootState, useAppDispatch} from '../redux/store';
import {Text, View} from 'react-native';

const SavingsScreen = () => {
  const dispatch = useAppDispatch();
  const {profile, loading, error} = useSelector(
    (state: RootState) => state.profile,
  );

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Fetch profile info on component mount
    dispatch(fetchProfileInfo());
    // .unwrap()
    // .then(res => {
    //   console.log('res', res);
    // });
  }, [dispatch]);

  useEffect(() => {
    setUserInfo(profile?.response?.userInfo);
  }, [profile]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  console.log('profile inside of component', userInfo);

  // const {userInfo} = profile?.response;

  return (
    <View>
      {userInfo ? (
        <>
          <Text>First Name: {userInfo.firstName}</Text>
          <Text>Last Name: {userInfo.lastName}</Text>
          <Text>Email: {userInfo.email}</Text>
          <Text>Address: {userInfo?.address}</Text>
          <Text>City: {userInfo.city}</Text>
          <Text>userName: {userInfo?.userName}</Text>
          <Text>Zip Code: {userInfo?.zipCode}</Text>
          <Text>User Type: {userInfo?.userType}</Text>
        </>
      ) : (
        <Text>No profile data found</Text>
      )}
    </View>
  );
};

export default SavingsScreen;
