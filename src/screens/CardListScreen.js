import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, View,
} from 'react-native';

import CardListItem, { ITEM_HEIGHT } from '../components/CardListItem';
import { base, colors } from '../styles';

import { cardDatabase } from '../data';


const styles = StyleSheet.create({
  container: {
    ...base.container,
    backgroundColor: colors.lightGray,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 128,
    paddingHorizontal: 8,
    flex: 1,
    height: '100%',
  },
  emptyHeader: {
    color: colors.grayDark,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyMessage: {
    color: colors.grayDark,
    fontSize: 14,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  list: {
    backgroundColor: colors.lightGrayTranslucent,
    flex: 1,
  },
  listContent: {
    paddingBottom: 76,
  },
  floatingControls: {
    ...base.floatingControls,
  },
  floatingControlsInput: {
    ...base.input,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  footerText: {
    color: colors.gray,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
  },
});

class CardListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: cardDatabase.all(),
    };

    cardDatabase.addFilterListener((results) => {
      this.setState({
        cards: results,
      });
    });

    if (props.navigation) {
      props.navigation.setParams({
        resetScreen: this.resetScreen,
      });
    }
  }

  static getItemLayout(data, index) {
    return {
      offset: ITEM_HEIGHT * index,
      length: ITEM_HEIGHT,
      index,
    };
  }

  static search(query) {
    if (query) {
      cardDatabase.addFilter('search', card => card.name.search(new RegExp(query, 'i')) !== -1);
    } else {
      cardDatabase.removeFilter('search');
    }
  }

  resetScreen = () => {
    if (this.listView) {
      this.listView.scrollToOffset(0);
    }
  }

  handlePressItem = (card) => {
    if (this.props.selectCard) {
      this.props.selectCard(card.id);
    }

    if (this.props.navigation) {
      this.props.navigation.navigate(
        'CardsDetail',
        {
          cardId: card.id,
          cardPosition: card.position,
          cardSet: card.set,
        },
      );
    }
  }

  handleBlurFromSearch = (event) => {
    const query = event.nativeEvent.text;
    this.setUpDataSource(query);
  }

  handleSubmitFromSearch = (event) => {
    const query = event.nativeEvent.text;
    CardListScreen.search(query);
  }

  handleChangeFromSearch = (event) => {
    const query = event.nativeEvent.text;
    if (!query) {
      CardListScreen.search(query);
    }
  }

  handleScrollBeginDrag = () => {
    this.searchInput.blur();
  }

  renderItem = ({ item }) => {
    const { selectedCardId } = this.props;
    const isSelected = item.id === selectedCardId;

    return (
      <CardListItem
        card={ item }
        isSelected={ isSelected }
        onPressItem={ this.handlePressItem }
      />
    );
  }

  renderListView = () => {
    const keyExtractor = item => item.id;

    return (
      <FlatList
        ref={ (component) => { this.listView = component; } }
        style={ styles.list }
        data={ this.state.cards }
        extraData={{
          cards: this.state.cards,
          selectedCardId: this.props.selectedCardId,
        }}
        renderItem={ this.renderItem }
        keyExtractor={ keyExtractor }
        getItemLayout={ CardListScreen.getItemLayout }
        ListFooterComponent={ this.renderFooter }
        ListEmptyComponent={ this.renderEmpty }
        contentContainerStyle={ styles.listContent }
        updateCellsBatchingPeriod={ 100 }
        windowSize={ 35 }
        onScrollBeginDrag={ this.handleScrollBeginDrag }
      />
    );
  }

  renderEmpty = () => (
    <View style={ styles.empty }>
      <Text style={ styles.emptyHeader }>No Cards Found</Text>
      <Text style={ styles.emptyMessage }>
        Try changing your search terms or adjusting your settings.
      </Text>
    </View>
  );

  renderSearch = () => (
    <View style={ styles.floatingControls }>
      <TextInput
        style={ styles.floatingControlsInput }
        autoCapitalize={ 'none' }
        autoCorrect={ false }
        clearButtonMode={ 'always' }
        placeholder={ 'Search' }
        placeholderColor={ colors.lightGrayDark }
        ref={ (component) => { this.searchInput = component; } }
        returnKeyType={ 'search' }
        onSubmitEditing={ this.handleSubmitFromSearch }
        onChange={ this.handleChangeFromSearch }
      />
    </View>
  );

  renderFooter = () => {
    if (this.state.cards.length === 0) {
      return null;
    }

    return (
      <View style={ styles.footer }>
        <Text style={ styles.footerText }>
          Showing { this.state.cards.length } Card{ this.state.cards.length === 1 ? '' : 's' }
        </Text>
      </View>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={ styles.container }
        behavior={ 'padding' }
      >
        <View>
          { this.renderListView() }

          { this.renderSearch() }
        </View>
      </KeyboardAvoidingView>
    );
  }
}

CardListScreen.propTypes = {
  navigation: PropTypes.object,
  selectCard: PropTypes.func,
  selectedCardId: PropTypes.string,
};

export default CardListScreen;
