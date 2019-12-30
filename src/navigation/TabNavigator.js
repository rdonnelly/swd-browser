import _get from 'lodash/get';
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import DeviceInfo from 'react-native-device-info';

import SettingsStack from './SettingsStack';
import { colors } from '../styles';

const routeConfiguration = {
  Cards: {
    screen: DeviceInfo.isTablet()
      ? require('./CardBrowserSplitStack').default
      : require('./CardBrowserStack').default,
    path: 'cards',
  },
  Settings: {
    screen: SettingsStack,
    path: 'settings',
  },
};

const tabNavigatorConfig = {
  initialRouteName: 'Cards',
  backBehavior: 'none',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Cards') {
        iconName = 'documents';
      } else if (routeName === 'Settings') {
        iconName = 'cog';
      }

      const iconStyle = { marginTop: 4 };

      return (
        <Icon name={iconName} size={24} color={tintColor} style={iconStyle} />
      );
    },
    tabBarOnPress: ({ navigation: tabNavigation, defaultHandler }) => {
      if (tabNavigation.isFocused() && tabNavigation.state.index === 0) {
        const stackNavigation = _get(tabNavigation, 'state.routes[0]');
        if (
          stackNavigation &&
          stackNavigation.params &&
          stackNavigation.params.resetScreen
        ) {
          stackNavigation.params.resetScreen();
        }
      } else {
        defaultHandler();
      }
    },
  }),
  tabBarOptions: {
    activeTintColor: colors.tabActiveTint,
    inactiveTintColor: colors.tabInactiveTint,
    labelStyle: {
      fontSize: 13,
    },
  },
};

const TabNavigator = createBottomTabNavigator(
  routeConfiguration,
  tabNavigatorConfig,
);

export default TabNavigator;
