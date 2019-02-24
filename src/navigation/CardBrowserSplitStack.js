import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import CardSplitScreen from '../screens/CardSplitScreen';
import { colors } from '../styles';

const CardBrowserSplitStack = createStackNavigator(
  {
    CardSplitScreen: {
      screen: CardSplitScreen,
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
  static router = CardBrowserSplitStack.router;

  render() {
    const { navigation } = this.props;
    const keyboardAvoidingViewStyle = { flex: 1 };
    return (
      <KeyboardAvoidingView
        behavior={ 'padding' }
        style={ keyboardAvoidingViewStyle }
      >
        <CardBrowserSplitStack navigation={navigation} />
      </KeyboardAvoidingView>
    );
  }
}

KeyboardAvoidingCharacterStackNavigator.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default KeyboardAvoidingCharacterStackNavigator;
