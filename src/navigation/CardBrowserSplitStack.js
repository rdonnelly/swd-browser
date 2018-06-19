import _get from 'lodash/get';
import { createStackNavigator } from 'react-navigation';

import CardSplitScreen from '../screens/CardSplitScreen';
import { colors } from '../styles';

const cardBrowserSplitStack = createStackNavigator(
  {
    CardSplitScreen: {
      screen: CardSplitScreen,
    },
  },
  {
    navigationOptions: {
      headerTitle: 'Cards',
      headerTintColor: colors.headerTint,
      headerStyle: {
        backgroundColor: colors.headerBackground,
      },
    },
  },
);

cardBrowserSplitStack.navigationOptions = {
  tabBarOnPress: ({ navigation }) => {
    const stackNavigation = _get(navigation, 'state.routes[0]');
    if (stackNavigation &&
        stackNavigation.params &&
        stackNavigation.params.resetScreen) {
      stackNavigation.params.resetScreen();
    }
  },
};

export default cardBrowserSplitStack;
