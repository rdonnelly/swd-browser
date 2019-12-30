import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import SWDIcon from '../components/SWDIcon';
import CardListScreen from '../screens/CardListScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import { colors } from '../styles';

const styles = StyleSheet.create({
  headerTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  headerTitleSet: {
    marginTop: 1,
  },
  headerTitleSetIcon: {
    color: colors.headerTint,
    fontSize: 15,
  },
  headerTitleText: {
    color: colors.headerTint,
    fontSize: 17,
    fontWeight: '700',
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
          <View style={styles.headerTitle}>
            <View style={styles.headerTitleSet}>
              <SWDIcon
                type={navigation.getParam('cardSet')}
                style={styles.headerTitleSetIcon}
              />
            </View>
            <Text style={styles.headerTitleText}>
              &nbsp;
              {navigation.getParam('cardSet')}
              &nbsp;
              {navigation.getParam('cardPosition')}
            </Text>
          </View>
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

const PlatformKeyboardAvoidingViewProps = Platform.select({
  ios: () => ({ behavior: 'padding' }),
  android: () => ({}),
})();

class KeyboardAvoidingCharacterStackNavigator extends PureComponent {
  static router = CardBrowserStack.router;

  render() {
    const { navigation } = this.props;
    const keyboardAvoidingViewStyle = { flex: 1 };
    return (
      <KeyboardAvoidingView
        {...PlatformKeyboardAvoidingViewProps}
        style={keyboardAvoidingViewStyle}
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
