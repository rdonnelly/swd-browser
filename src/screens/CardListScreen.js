import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

import CardListItem from '../components/CardListItem';
import { colors } from '../styles';

import { cardDatabase } from '../data';


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    flex: 1,
  },
  search: {
    backgroundColor: colors.lightGrayDark,
    padding: 8,
  },
  searchInput: {
    backgroundColor: colors.white,
    color: colors.darkGray,
    fontSize: 16,
    padding: 8,
    borderRadius: 4,
  },
  list: {
    flex: 1,
  },
});

class CardListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: cardDatabase.all(),
      showEmpty: false,
    };

    this.onPressItem = this.onPressItem.bind(this);
    this.handleBlurFromSearch = this.handleBlurFromSearch.bind(this);
    this.handleSubmitFromSearch = this.handleSubmitFromSearch.bind(this);
    this.handleChangeFromSearch = this.handleChangeFromSearch.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderSearch = this.renderSearch.bind(this);

    cardDatabase.addFilterListener((results) => {
      this.setState({
        cards: results,
        showEmpty: !results.length,
      });
    });
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
        'CardBrowserDetail',
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
          // onBlur={ this.handleBlurFromSearch }
          onSubmitEditing={ this.handleSubmitFromSearch }
          onChange={ this.handleChangeFromSearch }
        />
      </View>
    );
  }

  renderListView() {
    const keyExtractor = item => item.id;

    return (
      <FlatList
        style={ styles.list }
        data={ this.state.cards }
        renderItem={ this.renderItem }
        keyExtractor={ keyExtractor }
        ListHeaderComponent={ this.renderSearch }
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
      <View>
        <Text>EMPTY</Text>
      </View>
    );
  }

  render() {
    return (
      <View
        style={ styles.container }
      >
        { this.state.showEmpty ?
          this.renderEmpty() :
          this.renderListView()
        }

        <StatusBar animated={ true } barStyle="light-content" />
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
