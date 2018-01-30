import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import SWDIcon from './SWDIcon';
import { colors } from '../styles';


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    borderBottomColor: colors.lightGrayDark,
    borderBottomWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowTappable: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    width: '100%',
  },
  cardIcon: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  cardIconGlyph: {
    fontSize: 24,
  },
  cardDetails: {
    flex: 1,
    paddingLeft: 8,
  },
  cardDetailsName: {
    color: colors.darkGray,
    fontSize: 18,
    fontWeight: '600',
  },
});


class CardListItem extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.card.id === nextProps.card.id) {
      return false;
    }

    return true;
  }

  render() {
    const {
      card,
      onPressItem,
    } = this.props;

    const iconGlyphStyles = [styles.cardIconGlyph];
    iconGlyphStyles.push({ color: colors[card.color] });

    return (
      <View style={ styles.row }>
        <TouchableOpacity
          onPress={ () => onPressItem(card) }
          style={ styles.rowTappable }
        >
          <View style={ styles.cardIcon }>
            <SWDIcon type={ card.type } style={ iconGlyphStyles } />
          </View>
          <View style={ styles.cardDetails }>
            <Text style={ styles.cardDetailsName }>
              { card.name }
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

CardListItem.propTypes = {
  card: PropTypes.object.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default CardListItem;
