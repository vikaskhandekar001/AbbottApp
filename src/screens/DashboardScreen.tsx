import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useGetProfileQuery} from '../redux/slices/profileSlice';
const Dashboard = () => {
  const navigation = useNavigation();
  const {data: profileData, isLoading, isError, error} = useGetProfileQuery();

  // Logout function
  const handleLogout = async () => {
    try {
      //   await AsyncStorage.removeItem('accessToken');
      //   await AsyncStorage.removeItem('user');
      navigation.navigate('NetInfo'); // Navigates back to login screen
    } catch (error) {
      console.error('Logout error', error);
      Alert.alert('Failed to log out');
    }
  };
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load profile</Text>
        <Text>{error?.data?.message || 'Please try again later.'}</Text>
      </View>
    );
  }

  const {data} = profileData;
  console.log('data===>', data);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 User Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{data?.name || 'N/A'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{data?.email}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{data?.userDetails?.address || 'N/A'}</Text>

        <Text style={styles.label}>Pincode:</Text>
        <Text style={styles.value}>{data?.userDetails?.pincode || 'N/A'}</Text>

        <Text style={styles.label}>Mobile Number:</Text>
        <Text style={styles.value}>
          {data?.userDetails?.mobileNumber || 'N/A'}
        </Text>

        <Text style={styles.label}>Occupation:</Text>
        <Text style={styles.value}>
          {data?.userDetails?.occupation || 'N/A'}
        </Text>

        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{data?.userDetails?.age || 'N/A'}</Text>

        <Text style={styles.label}>Sex:</Text>
        <Text style={styles.value}>{data?.userDetails?.sex || 'N/A'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F6F8',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#444',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
export default Dashboard;
