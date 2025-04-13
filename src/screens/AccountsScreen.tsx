import React from 'react';
import {View, Text} from 'react-native';
import NetworkLogger from 'react-native-network-logger';

const AccountScreen = () => {
  return (
    <View style={{flex: 1}}>
      <NetworkLogger
        theme={{
          colors: {
            background: 'red',
          },
        }}
      />
    </View>
  );
};

export default AccountScreen;
