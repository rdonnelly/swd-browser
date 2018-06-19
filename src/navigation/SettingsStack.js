import _get from 'lodash/get';
import { createStackNavigator } from 'react-navigation';

import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../styles';

const settingsStackNavigator = createStackNavigator({
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      headerTitle: 'Settings',
      headerTintColor: colors.headerTint,
      headerStyle: {
        backgroundColor: colors.headerBackground,
      },
    },
  },
});

settingsStackNavigator.navigationOptions = {
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    if (navigation.isFocused()) {
      if (navigation.state.index === 0) {
        const stackNavigation = _get(navigation, 'state.routes[0]');
        if (stackNavigation &&
            stackNavigation.params &&
            stackNavigation.params.resetScreen) {
          stackNavigation.params.resetScreen();
        }
      }

      if (navigation.state.index === 1) {
        navigation.navigate('SettingsScreen');
      }
    } else {
      defaultHandler();
    }
  },
};

export default settingsStackNavigator;
