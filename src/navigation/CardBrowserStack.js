import { StackNavigator } from 'react-navigation';

import CardListScreen from '../screens/CardListScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import { colors } from '../styles';

const CardBrowserStack = StackNavigator(
  {
    CardBrowserList: {
      screen: CardListScreen,
    },
    CardBrowserDetail: {
      screen: CardDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Card Details',
        headerTitle: `${navigation.state.params.cardName}`,
      }),
    },
  },
  {
    navigationOptions: {
      title: 'Cards',
      headerTintColor: colors.headerTint,
      headerStyle: {
        backgroundColor: colors.headerBackground,
      },
    },
  },
);

export default CardBrowserStack;
