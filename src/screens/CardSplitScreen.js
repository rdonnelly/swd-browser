import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import CardListScreen from './CardListScreen';
import CardDetailScreen from './CardDetailScreen';
import { colors } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  containerList: {
    borderRightColor: colors.lightGrayDark,
    borderRightWidth: StyleSheet.hairlineWidth,
    width: 320,
  },
  containerDetails: {
    flex: 1,
  },
});

class CardSplitScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCardId: null,
    };

    this.selectCard = this.selectCard.bind(this);
    this.resetScreen = this.resetScreen.bind(this);
  }

  componentWillMount() {
    if (this.props.navigation) {
      this.props.navigation.setParams({
        resetScreen: this.resetScreen,
      });
    }
  }

  resetScreen() {
    if (this.listScreen && this.listScreen.resetScreen) {
      this.listScreen.resetScreen();
    }

    if (this.detailScreen && this.detailScreen.resetScreen) {
      this.detailView.resetScreen();
    }

    this.setState({ selectedCardId: null });
  }

  selectCard(cardId) {
    this.setState({
      selectedCardId: cardId,
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.containerList }>
          <CardListScreen
            ref={ (component) => { this.listScreen = component; } }
            selectCard={ this.selectCard }
            selectedCardId={ this.state.selectedCardId }
          />
        </View>
        <View style={ styles.containerDetails }>
          <CardDetailScreen
            ref={ (component) => { this.detailScreen = component; } }
            selectCard={ this.selectCard }
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
