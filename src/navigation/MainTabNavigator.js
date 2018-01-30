/* eslint-disable react/display-name */
import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { NavigationActions, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import DeviceInfo from 'react-native-device-info';

import SettingsStack from './SettingsStack';
import { colors } from '../styles';


const MainTabNavigator = TabNavigator(
  {
    CardBrowserTab: {
      screen: DeviceInfo.isTablet() ?
        require('./CardBrowserSplitStack').default : // eslint-disable-line global-require
        require('./CardBrowserStack').default, // eslint-disable-line global-require
      navigationOptions: ({ navigation }) => ({
        title: 'Cards',
        tabBarLabel: 'Cards',
        tabBarIcon: ({ tintColor }) => {
          const majorVersion = parseInt(Platform.Version, 10);
          const isIos = Platform.OS === 'ios';
          const useHorizontalTabs = majorVersion >= 11 && isIos;

          const windowDimensions = Dimensions.get('window');
          const isLandscape = windowDimensions.width > windowDimensions.height;

          return (
            <Icon
              name="documents"
              size={ 24 }
              color={ tintColor }
              style={{ marginTop: useHorizontalTabs && isLandscape ? 0 : 4 }}
            />
          )
        },
        tabBarOnPress: ({ scene, jumpToIndex }) => {
          const { index, focused } = scene;

          if (focused) {
            if (!DeviceInfo.isTablet()) {
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'CardBrowserList' }),
                ],
              });

              navigation.dispatch(resetAction);
            }
          } else {
            jumpToIndex(index);
          }
        },
      }),
    },
    SettingsTab: {
      screen: SettingsStack,
      navigationOptions: {
        title: 'Settings',
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => {
          const majorVersion = parseInt(Platform.Version, 10);
          const isIos = Platform.OS === 'ios';
          const useHorizontalTabs = majorVersion >= 11 && isIos;

          const windowDimensions = Dimensions.get('window');
          const isLandscape = windowDimensions.width > windowDimensions.height;

          return (
            <Icon
              name="cog"
              size={ 24 }
              color={ tintColor }
              style={{ marginTop: useHorizontalTabs && isLandscape ? 0 : 4 }}
            />
          )
        },
      },
    },
  },
  {
    backBehavior: 'none',
    tabBarOptions: {
      activeTintColor: colors.tabActiveTint,
      inactiveTintColor: colors.tabInactiveTint,
      labelStyle: {
        fontSize: 13,
      },
    },
  },
);

export default MainTabNavigator;
