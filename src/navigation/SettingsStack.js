import { StackNavigator } from 'react-navigation';

import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../styles';

const SettingsStack = StackNavigator({
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
      headerTintColor: colors.headerTint,
      headerStyle: {
        backgroundColor: colors.headerBackground,
      },
    },
  },
});

export default SettingsStack;
