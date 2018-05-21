/* eslint-disable react/display-name */
import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import DeviceInfo from 'react-native-device-info';

import SettingsStack from './SettingsStack';
import { colors } from '../styles';

const majorVersion = parseInt(Platform.Version, 10);
const isIos = Platform.OS === 'ios';
const useHorizontalTabs = DeviceInfo.isTablet() && isIos && majorVersion >= 11;


export default createBottomTabNavigator(
  {
    Cards: {
      screen: DeviceInfo.isTablet() ?
        require('./CardBrowserSplitStack').default : // eslint-disable-line global-require
        require('./CardBrowserStack').default, // eslint-disable-line global-require
      navigationOptions: {
        tabBarLabel: 'Cards',
      },
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: 'Settings',
      },
    },
  },
  {
    backBehavior: 'none',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => { // eslint-disable-line react/prop-types
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Cards') {
          iconName = 'documents';
        } else if (routeName === 'Settings') {
          iconName = 'cog';
        }

        return (
          <Icon
            name={ iconName }
            size={ 24 }
            color={ tintColor }
            style={{ marginTop: useHorizontalTabs ? 0 : 4 }}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.tabActiveTint,
      inactiveTintColor: colors.tabInactiveTint,
      labelStyle: {
        fontSize: useHorizontalTabs ? 15 : 13,
      },
    },
  },
);
