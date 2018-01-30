import { StackNavigator } from 'react-navigation';

import CardSplitScreen from '../screens/CardSplitScreen';
import { colors } from '../styles';

const CardBrowserSplitStack = StackNavigator({
  CardSplitScreen: {
    screen: CardSplitScreen,
    navigationOptions: {
      headerTintColor: colors.headerTint,
      headerStyle: {
        backgroundColor: colors.headerBackground,
      },
    },
  },
});

export default CardBrowserSplitStack;
