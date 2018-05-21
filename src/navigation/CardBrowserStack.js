import _get from 'lodash/get';
import { createStackNavigator } from 'react-navigation';

import CardListScreen from '../screens/CardListScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import { colors } from '../styles';

const cardBrowserStack = createStackNavigator(
  {
    CardsList: {
      screen: CardListScreen,
    },
    CardsDetail: {
      screen: CardDetailScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: `${navigation.state.params.cardName}`,
      }),
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

cardBrowserStack.navigationOptions = {
  tabBarOnPress: ({ navigation }) => {
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
        navigation.navigate('CardsList');
      }
    }
  },
};

export default cardBrowserStack;
