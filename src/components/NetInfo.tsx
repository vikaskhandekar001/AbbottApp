import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useLoginMutation, useSignupMutation} from '../redux/slices/authSlices';

const NetInfo = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation(); // Use the generated mutation hook
  const [signup, {isLoading, isError, error}] = useSignupMutation(); // Use the generated mutation hook

  const apiUrl = 'http://10.0.2.2:5000'; // Android Emulator

  const handleSignup = async () => {
    try {
      // const res = await axios.post(`${apiUrl}/api/auth/signup`, {
      //   email,
      //   password,
      // });
      const res = await signup({email, password}).unwrap(); // unwrap to get data directly

      console.log('✅ Signup response:', res);

      if (res?.status === 'success') {
        await AsyncStorage.setItem('userId', res?.data?.userId);
        await AsyncStorage.setItem('authToken', res?.data?.token);
        Alert.alert('Signed up successfully', res?.data?.userId);
      }
    } catch (err) {
      console.log('error', err);
      console.log('error', err.response);
      Alert.alert(err?.data?.message || 'An error occurred during signup.');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await login({email, password}).unwrap(); // unwrap to directly get the data

      console.log('Login Response: ', res);

      await AsyncStorage.setItem('userId', res?.userId);
      await AsyncStorage.setItem('authToken', res?.accessToken);
      await AsyncStorage.setItem('refreshToken', res?.refreshToken);

      navigation.navigate('Dashboard');
    } catch (err) {
      console.log('Login Error:', err);
      console.log('Login Error:', err?.response);
      Alert.alert('Login failed', err?.response?.data?.error || err?.message);
    }
  };

  const handleBioMetric = async () => {
    // Implement biometric authentication here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subheading}>Please sign up or log in</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleBioMetric}>
          <Text style={styles.buttonText}>Biometric</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Account')}>
          <Text style={styles.linkButtonText}>Go to Svg</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  form: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  linkButton: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NetInfo;
