import React, {useEffect, useState} from 'react';
import {View, Text, Button, ActivityIndicator, Alert} from 'react-native';

const ApiCallComponent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = 'https://www.similac.com/api/private/profile/profile-info'; // Replace with your actual API URL
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJFUTBNVVE1TjBOQ1JUSkVNemszTTBVMVJrTkRRMFUwUTBNMVJFRkJSamhETWpkRU5VRkJRZyJ9.eyJpc3MiOiJodHRwczovL2ZpZG0uZ2lneWEuY29tL2p3dC8zXzZkc2JSbldfME5pM0EyOTROdlJCVTI3NFJtdjhRY3duOW53OS1Da1dVV0dlaXVKdXNSdm5kMFZlTG9RZk52aVIvIiwiYXBpS2V5IjoiM182ZHNiUm5XXzBOaTNBMjk0TnZSQlUyNzRSbXY4UWN3bjludzktQ2tXVVdHZWl1SnVzUnZuZDBWZUxvUWZOdmlSIiwiaWF0IjoxNzQ0MDAxNDcyLCJleHAiOjE3NDQwMDUwNzIsInN1YiI6IjBmNWEzOGViNWM5ZTQ0YThhNWNhNzY5Yzk5MGE4OTJmIiwiZGF0YS51c2VyVHlwZSI6InNpbWlsYWMtc3NtIn0.CWh8q4R4GUGVv_KLM96h0Ay0Lfcc9VDmOxXaaA-2MPx6aLhuldPxP-_hHebUH0HgJb79U-0ZATZkT8yi1X6psi8FI6kjWrhuiF9U9LWbD3i9S7EexDf-fqVwzl_JrlRw6C6w-grOKEXd6OlJoJTje2kFFUpWuMtkNP27-hZeUNfUUzZPgF_7cOZKQ90yL40GIe367NLg0wZiFxYc_y730TqE1JNJUawapYKHPNJbYyFSeGijstviDHm1m8N_Fai1P-rbSusKOWEaNAT7Fa-p_PgOBt4GnCw5gmlXubfmr4Bp-vp9ECJT0n5zgIcYTJXVoxiKTIYc_Sg4SUogh7FlGw'; // Replace with the actual token

  const headers = {
    accept: 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    store: 'new_similac',
    'x-application-id': 'similac',
    'x-country-code': 'US',
    'x-id-token': token,
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: 'GET', // Change this to POST or the method you're using in the API
        headers: headers,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonResponse = await response.json();
      console.log('response', jsonResponse);

      setData(jsonResponse); // Set the response data to the state
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>{error}</Text>}
      {data && <Text>{JSON.stringify(data)}</Text>}
      <Button title="Fetch Data" onPress={fetchData} />
    </View>
  );
};

export default ApiCallComponent;
