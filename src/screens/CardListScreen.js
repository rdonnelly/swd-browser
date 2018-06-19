import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native';

import CardListItem, { ITEM_HEIGHT } from '../components/CardListItem';
import { colors } from '../styles';

import { cardDatabase } from '../data';


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  keyboardAvoidingViewInner: {
    flex: 1,
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
  search: {
    backgroundColor: colors.lightGrayDark,
    borderRadius: 4,
    bottom: 8,
    left: 8,
    padding: 8,
    position: 'absolute',
    right: 8,
  },
  searchInput: {
    backgroundColor: colors.white,
    color: colors.darkGray,
    fontSize: 16,
    padding: 12,
    borderRadius: 4,
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

    this.resetScreen = this.resetScreen.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
    this.handleBlurFromSearch = this.handleBlurFromSearch.bind(this);
    this.handleSubmitFromSearch = this.handleSubmitFromSearch.bind(this);
    this.handleChangeFromSearch = this.handleChangeFromSearch.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.renderFooter = this.renderFooter.bind(this);

    cardDatabase.addFilterListener((results) => {
      this.setState({
        cards: results,
      });
    });
  }

  componentWillMount() {
    if (this.props.navigation) {
      this.props.navigation.setParams({
        resetScreen: this.resetScreen,
      });
    }
  }

  resetScreen() {
    this.listView.scrollToOffset(0);
  }

  search(query) {
    if (query) {
      cardDatabase.addFilter('search', card => card.name.search(new RegExp(query, 'i')) !== -1);
    } else {
      cardDatabase.removeFilter('search');
    }
  }

  onPressItem(card) {
    if (this.props.selectCard) {
      this.props.selectCard(card.id);
    }

    if (this.props.navigation) {
      this.props.navigation.navigate(
        'CardsDetail',
        {
          cardId: card.id,
          cardName: card.name,
        },
      );
    }
  }

  handleBlurFromSearch(event) {
    const query = event.nativeEvent.text;
    this.setUpDataSource(query);
  }

  handleSubmitFromSearch(event) {
    const query = event.nativeEvent.text;
    this.search(query);
  }

  handleChangeFromSearch(event) {
    const query = event.nativeEvent.text;
    if (!query) {
      this.search(query);
    }
  }

  getItemLayout(data, index) {
    return {
      offset: ITEM_HEIGHT * index,
      length: ITEM_HEIGHT,
      index,
    };
  }

  renderListView() {
    const keyExtractor = item => item.id;

    return (
      <FlatList
        ref={ (component) => { this.listView = component; } }
        style={ styles.list }
        data={ this.state.cards }
        extraData={ this.state }
        renderItem={ this.renderItem }
        keyExtractor={ keyExtractor }
        getItemLayout={ this.getItemLayout }
        ListFooterComponent={ this.renderFooter }
        ListEmptyComponent={ this.renderEmpty }
        contentContainerStyle={{ paddingBottom: 72 }}
        updateCellsBatchingPeriod={ 100 }
        windowSize={ 35 }
      />
    );
  }

  renderItem({ item }) {
    return (
      <CardListItem card={ item } onPressItem={ this.onPressItem } />
    );
  }

  renderEmpty() {
    return (
      <View style={ styles.empty }>
        <Text style={ styles.emptyHeader }>No Cards Found</Text>
        <Text style={ styles.emptyMessage }>
          Try changing your search terms or adjusting your settings.
        </Text>
      </View>
    );
  }

  renderSearch() {
    return (
      <View style={ styles.search }>
        <TextInput
          style={ styles.searchInput }
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
  }

  renderFooter() {
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
      <View style={ styles.container }>
        <KeyboardAvoidingView
          style={ styles.keyboardAvoidingView }
          behavior={ 'padding' }
          keyboardVerticalOffset={64}
        >
          <View style={ styles.keyboardAvoidingViewInner }>
            { this.renderListView() }

            { this.renderSearch() }
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

CardListScreen.propTypes = {
  navigation: PropTypes.object,
  selectCard: PropTypes.func,
  selectedCardId: PropTypes.string,
};

export default CardListScreen;
