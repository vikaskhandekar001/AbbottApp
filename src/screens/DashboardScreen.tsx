import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);

  // Fetch user data from AsyncStorage or your state management (e.g., context)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('authToken');

        const res = await axios.get('http://10.0.2.2:5000/api/profile-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('userData', userData, res);
        setProfile(res.data.data);
        if (userData && userData?.length > 0) {
          setUser(userData);
        } else {
          Alert.alert('No user data found');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

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

  //   const {name = 'N/A', email = 'N/A', userDetails = {}} = profile;
  //   const {
  //     address = 'N/A',
  //     pincode = 'N/A',
  //     mobileNumber = 'N/A',
  //     occupation = 'N/A',
  //     age = 'N/A',
  //     sex = 'N/A',
  //   } = userDetails;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 User Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{profile?.name || 'N/A'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{profile?.email}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>
          {profile?.userDetails?.address || 'N/A'}
        </Text>

        <Text style={styles.label}>Pincode:</Text>
        <Text style={styles.value}>
          {profile?.userDetails?.pincode || 'N/A'}
        </Text>

        <Text style={styles.label}>Mobile Number:</Text>
        <Text style={styles.value}>
          {profile?.userDetails?.mobileNumber || 'N/A'}
        </Text>

        <Text style={styles.label}>Occupation:</Text>
        <Text style={styles.value}>
          {profile?.userDetails?.occupation || 'N/A'}
        </Text>

        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{profile?.userDetails?.age || 'N/A'}</Text>

        <Text style={styles.label}>Sex:</Text>
        <Text style={styles.value}>{profile?.userDetails?.sex || 'N/A'}</Text>
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
