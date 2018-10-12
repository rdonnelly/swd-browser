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
        // eslint-disable-next-line global-require
        require('./CardBrowserSplitStack').default :
        // eslint-disable-next-line global-require
        require('./CardBrowserStack').default,
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
      tabStyle: {
        paddingTop: useHorizontalTabs ? 0 : 4,
      },
    },
  },
);
