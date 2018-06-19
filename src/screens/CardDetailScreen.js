import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import _get from 'lodash/get';

import { cardDatabase } from '../data';
import CardDetail from '../components/CardDetail';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


class CardDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = this.initState(props);

    const deviceWidth = Dimensions.get('window').width;
    this.state.viewWidth = deviceWidth;

    if (this.state.listIndex !== -1) {
      this.state.scrollOffset = this.state.listIndex * this.state.viewWidth;
    }

    this.handleLayout = this.handleLayout.bind(this);
    this.handleMomentumScrollEnd = this.handleMomentumScrollEnd.bind(this);
    this.handleContentSizeChange = this.handleContentSizeChange.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const navigationCardId = _get(nextProps, 'navigation.state.params.cardId');
    const selectedCardId = _get(nextProps, 'selectedCardId');

    const cardId = navigationCardId || selectedCardId;

    if (cardId !== this.state.cardId) {
      const newState = this.initState(nextProps);

      if (newState.listIndex !== -1) {
        newState.scrollOffset = newState.listIndex * this.state.viewWidth;
      }

      this.setState(newState);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.cardId === nextState.cardId &&
        this.state.scrollEnabled === nextState.scrollEnabled &&
        this.state.scrollerAdjustmentCardIndex === nextState.scrollerAdjustmentCardIndex &&
        this.state.scrollContentWidth === nextState.scrollContentWidth &&
        this.state.viewWidth === nextState.viewWidth) {
      return false;
    }

    return true;
  }

  initState(props) {
    const navigationCardId = _get(props, 'navigation.state.params.cardId');
    const selectedCardId = _get(props, 'selectedCardId');

    const cardId = navigationCardId || selectedCardId;

    const cardIndex = cardDatabase.findIndex(cardId);
    const minIndex = 0;
    const maxIndex = cardDatabase.count() - 1;

    const list = [];

    if (cardId && cardIndex > -1) {
      list.push(cardIndex);

      if (cardIndex !== minIndex) {
        list.unshift(cardIndex - 1);
      }

      if (cardIndex !== maxIndex) {
        list.push(cardIndex + 1);
      }
    }

    const listIndex = list.indexOf(cardIndex);

    return {
      cardId,

      cardIndex,

      minIndex,
      maxIndex,

      list,
      listIndex,

      scrollEnabled: true,
      scrollDirection: null,
      scrollOffset: 0,
      scrollerAdjustmentCardIndex: null,
    };
  }

  updateSelectedCard(cardIndex) {
    const selectedCard = cardDatabase.get(cardIndex);

    if (this.props.selectCard) {
      this.props.selectCard(selectedCard.id);
    }

    if (this.props.navigation) {
      this.props.navigation.setParams({
        cardId: selectedCard.id,
        cardName: selectedCard.name,
      });
    }
  }

  handleLayout(event) {
    const { width } = event.nativeEvent.layout;

    this.setState({
      viewWidth: width,
    });
  }

  handleMomentumScrollEnd(event) {
    const scrollOffset = event.nativeEvent.contentOffset.x;

    if (this.state.scrollOffset === scrollOffset) {
      return;
    }

    if (scrollOffset % this.state.viewWidth !== 0) {
      return;
    }

    // left
    if (this.state.scrollOffset > scrollOffset) {
      const newCardIndex = Math.max(this.state.cardIndex - 1, this.state.minIndex);
      const newListIndex = Math.max(this.state.listIndex - 1, 0);

      const nextState = {
        cardId: cardDatabase.get(newCardIndex).id,

        cardIndex: newCardIndex,

        listIndex: newListIndex,

        scrollDirection: 'left',
        scrollOffset,
      };

      // add a card to the left
      if (newCardIndex > this.state.minIndex && newListIndex === 0) {
        nextState.list = [newCardIndex, ...this.state.list];
        nextState.listIndex += 1;
        nextState.scrollerAdjustmentCardIndex = newCardIndex - 1;
        nextState.scrollEnabled = false;
      }

      this.setState(nextState, () => {
        this.updateSelectedCard(newCardIndex);
      });
    }

    // right
    if (this.state.scrollOffset < scrollOffset) {
      const newCardIndex = Math.min(this.state.cardIndex + 1, this.state.maxIndex);
      const newListIndex = Math.min(this.state.listIndex + 1, this.state.list.length - 1);

      const nextState = {
        cardId: cardDatabase.get(newCardIndex).id,

        cardIndex: newCardIndex,

        listIndex: newListIndex,

        scrollDirection: 'right',
        scrollOffset,
      };

      // add a card to the right
      if (newCardIndex < this.state.maxIndex && newListIndex === this.state.list.length - 1) {
        nextState.list = [...this.state.list, newCardIndex];
        nextState.scrollerAdjustmentCardIndex = newCardIndex + 1;
        nextState.scrollEnabled = false;
      }

      this.setState(nextState, () => {
        this.updateSelectedCard(newCardIndex);
      });
    }
  }

  handleContentSizeChange(contentWidth) {
    const newList = this.state.list;

    const contentWidthDiff = contentWidth - this.state.scrollContentWidth;
    let { scrollOffset } = this.state;

    if (contentWidthDiff) {
      scrollOffset = this.state.listIndex * this.state.viewWidth;

      if (this.state.scrollDirection === 'left' &&
          this.state.scrollerAdjustmentCardIndex !== null) {
        newList.shift();
        newList.unshift(this.state.scrollerAdjustmentCardIndex);
      }

      if (this.state.scrollDirection === 'right' &&
          this.state.scrollerAdjustmentCardIndex) {
        newList.pop();
        newList.push(this.state.scrollerAdjustmentCardIndex);
      }
    }

    if (scrollOffset !== this.state.scrollOffset) {
      this.scrollView.scrollTo({
        x: scrollOffset,
        animated: false,
      });
    }

    this.setState({
      list: newList,

      scrollContentWidth: contentWidth,
      scrollDirection: null,
      scrollEnabled: true,
      scrollOffset,

      scrollerAdjustmentCardIndex: null,
    });
  }

  renderCard(cardIndex, listIndex) {
    const card = cardDatabase.get(cardIndex);

    return (
      <View
        key={ `page-${card.id}-${listIndex}`}
        style={{ width: this.state.viewWidth }}
      >
        <CardDetail card={ card } />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={ styles.container }
        forceInset={{ horizontal: 'always' }}
        onLayout={ this.handleLayout }
      >
        { this.state.cardId &&
          <ScrollView
            ref={ (component) => { this.scrollView = component; } }
            horizontal={ true }
            pagingEnabled={ true }
            showsHorizontalScrollIndicator={ false }
            showsVerticalScrollIndicator={ false }
            scrollEnabled={ this.state.scrollEnabled }
            scrollsToTop={ false }
            removeClippedSubviews={ true }
            automaticallyAdjustContentInsets={ false }
            onMomentumScrollEnd={ this.handleMomentumScrollEnd }
            onContentSizeChange={ this.handleContentSizeChange }
            scrollEventThrottle={ 0 }
            contentOffset={{ x: this.state.scrollOffset, y: 0 }}
          >
            { this.state.list.map(this.renderCard) }
          </ScrollView>
        }
      </SafeAreaView>
    );
  }
}

CardDetailScreen.propTypes = {
  navigation: PropTypes.object,
  selectCard: PropTypes.func,
  selectedCardId: PropTypes.string,
};

export default CardDetailScreen;
