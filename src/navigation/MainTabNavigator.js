/* eslint-disable react/display-name */
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import DeviceInfo from 'react-native-device-info';

import SettingsStack from './SettingsStack';
import { colors } from '../styles';


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
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ tintColor }) => {
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
        fontSize: 13,
      },
      tabStyle: {
        paddingTop: 4,
      },
    },
  },
);
