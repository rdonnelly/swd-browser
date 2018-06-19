import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import CardListScreen from '../screens/CardListScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import { colors } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  containerLeft: {
    borderRightColor: colors.lightGrayDark,
    borderRightWidth: StyleSheet.hairlineWidth,
    width: 320,
  },
  containerRight: {
    flex: 1,
  },
});

class CardSplitScreen extends Component {
  state = {
    selectedCardId: null,
  };

  selectCard(cardId) {
    this.setState({
      selectedCardId: cardId,
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.containerLeft }>
          <CardListScreen
            selectCard={ this.selectCard.bind(this) }
            selectedCardId={ this.state.selectedCardId }
          />
        </View>
        <View style={ styles.containerRight }>
          <CardDetailScreen
            selectCard={ this.selectCard.bind(this) }
            selectedCardId={ this.state.selectedCardId }
          />
        </View>
      </View>
    );
  }
}

CardSplitScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CardSplitScreen;
