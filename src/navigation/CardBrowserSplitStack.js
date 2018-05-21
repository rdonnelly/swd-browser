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
      headerTintColor: colors.headerTint,
      headerStyle: {
        backgroundColor: colors.headerBackground,
      },
    },
  },
);

cardBrowserSplitStack.navigationOptions = {
  tabBarOnPress: ({ navigation }) => {
    console.log(navigation);
  },
};

export default cardBrowserSplitStack;
