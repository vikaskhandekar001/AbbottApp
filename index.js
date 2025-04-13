/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {startNetworkLogging} from 'react-native-network-logger';
import {useEffect} from 'react';
import {NativeModules} from 'react-native';

const connectToRemoteDebugger = () => {
  NativeDevSettings.setIsDebuggingRemotely(true);
};
// connectToRemoteDebugger();
// const {DevSettings} = NativeModules;
// if (DevSettings) {
//   DevSettings.openDeveloperMenu();
// } else {
//   console.log('DevSettings module is not available.');
// }
// console.log(NativeModules);

// // const {DevSettings} = NativeModules;

// if (NativeModules?.DevSettings) {
//   DevSettings.openDeveloperMenu(); // Opens the developer menu
// } else {
//   console.log('DevSettings is not available');
// }

startNetworkLogging();
AppRegistry.registerComponent(appName, () => App);
