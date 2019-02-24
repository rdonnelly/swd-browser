import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
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

const CardBrowserStack = createStackNavigator(
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
    defaultNavigationOptions: {
      headerTitle: 'Cards',
      headerTintColor: colors.headerTint,
      headerStyle: {
        backgroundColor: colors.headerBackground,
      },
    },
  },
);

class KeyboardAvoidingCharacterStackNavigator extends PureComponent {
  static router = CardBrowserStack.router;

  render() {
    const { navigation } = this.props;
    const keyboardAvoidingViewStyle = { flex: 1 };
    return (
      <KeyboardAvoidingView
        behavior={ 'padding' }
        style={ keyboardAvoidingViewStyle }
      >
        <CardBrowserStack navigation={navigation} />
      </KeyboardAvoidingView>
    );
  }
}

KeyboardAvoidingCharacterStackNavigator.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default KeyboardAvoidingCharacterStackNavigator;
