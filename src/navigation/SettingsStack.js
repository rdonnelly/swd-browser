// import { createStackNavigator } from 'react-navigation';
//
// import SettingsScreen from '../screens/SettingsScreen';
// import { colors } from '../styles';
//
// const settingsStackNavigator = createStackNavigator(
//   {
//     SettingsScreen: {
//       screen: SettingsScreen,
//     },
//   },
//   {
//     defaultNavigationOptions: {
//       headerTitle: 'Settings',
//       headerTintColor: colors.headerTint,
//       headerStyle: {
//         backgroundColor: colors.headerBackground,
//       },
//     },
//   },
// );
//
// export default settingsStackNavigator;


import { createStackNavigator } from 'react-navigation';

import SettingsScreen from '../screens/SettingsScreen';

import { colors } from '../styles';

const routeConfiguration = {
  SettingsScreen: {
    screen: SettingsScreen,
    path: 'index',
  },
};

const stackNavigatorConfiguration = {
  initialRouteName: 'SettingsScreen',
  defaultNavigationOptions: {
    headerTintColor: colors.headerTint,
    headerStyle: {
      backgroundColor: colors.headerBackground,
    },
  },
};

const SettingsStackNavigator = createStackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration,
);

export default SettingsStackNavigator;
