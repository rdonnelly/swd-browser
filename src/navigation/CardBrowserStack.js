import _get from 'lodash/get';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import SWDIcon from '../components/SWDIcon';
import CardListScreen from '../screens/CardListScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import { colors } from '../styles';

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.headerTint,
    fontSize: 17,
    fontWeight: '700',
    marginHorizontal: 16,
    textAlign: 'center',
  },
  headerTitleIcon: {
    fontSize: 15,
  },
});

const cardBrowserStack = createStackNavigator(
  {
    CardsList: {
      screen: CardListScreen,
    },
    CardsDetail: {
      screen: CardDetailScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: (
          <Text style={styles.headerTitle}>
            <SWDIcon type={ navigation.getParam('cardSet') } style={ styles.headerTitleIcon } />
            &nbsp;
            <Text>
              { navigation.getParam('cardSet') }
              &nbsp;
              { navigation.getParam('cardPosition') }
            </Text>
          </Text>
        ),
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
        navigation.navigate('CardsList');
      }
    } else {
      defaultHandler();
    }
  },
};

export default cardBrowserStack;
