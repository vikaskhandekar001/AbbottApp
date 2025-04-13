/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {ApolloProvider} from '@apollo/client';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NetInfo from './src/components/NetInfo';
import CreateLinkComponent from './src/components/SvgTest';
import {ThemeProvider, useTheme} from './src/components/hooks/ThemeProvider'; // Import the theme context
import UserList from './src/components/UserList'; // Import the UserList component
import client from './src/services/ApolloProvider'; // Import Apollo Client setup
// import client from './graphql/client';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import SavingsScreen from './src/screens/SavingsScreen';
import ScanNRewardsScreen from './src/screens/ScanNRewards';
import AccountScreen from './src/screens/AccountsScreen';
import CustomHeader from './src/components/CustomHeader';
import ApiCallComponent from './src/components/ApiCall';
import Dashboard from './src/screens/DashboardScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <View style={styles1.container}>
      <CustomHeader />
      <Tab.Navigator
        style={styles1.tabs} // Add marginTop to create space between header and tabs
        screenOptions={{
          tabBarStyle: {
            height: 60,

            // Custom styles for the tab bar itself
            backgroundColor: '#f5f5f5',
            // paddingTop: 10, // Add space inside the tab bar
          },
          tabBarLabelStyle: {
            color: '#003087',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 14,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#FE9E1F', // Set the tab indicator color here
            height: 3, // Optionally set the height of the indicator
          },
        }}

        // screenOptions={{headerShown: false}}

        // screenOptions={{

        //   header: () => <CustomHeader />, // Apply CustomHeader globally for all tabs
        // }}
      >
        <Tab.Screen name="Savings" component={SavingsScreen} />
        <Tab.Screen name="Scan & Rewards" component={ScanNRewardsScreen} />
      </Tab.Navigator>
    </View>
  );
}

function RootStack(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Disable the default header globally for all screens
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NetInfo" component={NetInfo} />
      <Stack.Screen name="Svg" component={CreateLinkComponent} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Account" component={AccountScreen} />

      <Stack.Screen name="MyTabs" component={MyTabs} />
    </Stack.Navigator>
  );
}

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {theme, toggleTheme} = useTheme(); // Get the current theme and the toggle function

  return (
    <View
      style={[
        {flex: 1, alignItems: 'center', justifyContent: 'center'},
        {backgroundColor: theme.backgroundColor},
      ]}>
      {/* <UserList /> */}
      <Text style={{color: theme.textColor}}>Home Screen</Text>
      <Text style={[styles.text, {color: theme.textColor}]}>Hello, World!</Text>

      <Button
        title="nav to svg"
        // onPress={toggleTheme}
        // onPress={() => navigation.navigate('Svg')}
        onPress={() => navigation.navigate('NetInfo')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabs: {
    // marginTop: 20, // Space between the custom header and the tabs
  },
});

export default App;
