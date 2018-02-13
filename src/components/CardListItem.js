import _isInteger from 'lodash/isInteger';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import SWDIcon from './SWDIcon';
import { validate as validateIcon } from '../utils/SWDIconMap';
import { colors } from '../styles';

export const ITEM_HEIGHT = 58;

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    borderBottomColor: colors.lightGrayDark,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
  rowTappable: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
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
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  cardDetailsName: {
    paddingVertical: 1,
  },
  cardDetailsNameText: {
    color: colors.darkGray,
    fontSize: 18,
    fontWeight: '600',
  },
  cardDetailsInfo: {
    paddingVertical: 1,
  },
  cardDetailsInfoText: {
    color: colors.gray,
    fontSize: 13,
    fontWeight: '500',
  },
  cardDetailsInfoTextIcon: {
    color: colors.lightGrayDark,
    fontSize: 10,
    fontWeight: '500',
  },
  chevronWrapper: {
  },
  chevron: {
    color: colors.lightGrayDark,
    marginTop: 2,
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

    const colorString = `card${card.faction.charAt(0).toUpperCase() + card.faction.slice(1)}`;
    const iconGlyphStyles = [styles.cardIconGlyph];
    iconGlyphStyles.push({ color: colors[colorString] });

    const setIcon = validateIcon(card.set) ?
      (<SWDIcon type={ card.set } font={ 'swdestiny' } style={ styles.cardDetailsInfoTextIcon } />) :
      null;

    let cardData = '';
    if (_isInteger(card.cost)) {
      cardData = card.cost;
    }
    if (card.points) {
      cardData = `${card.points}`;
    }

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
            <View style={ styles.cardDetailsName }>
              <Text style={ styles.cardDetailsNameText }>
                { card.name }
              </Text>
            </View>
            <View style={ styles.cardDetailsInfo }>
              <Text style={ styles.cardDetailsInfoText }>
                { setIcon}
                { setIcon && <Text>&nbsp;</Text>}
                <Text>{ card.set }&nbsp;{ card.position }</Text>
                <Text>&nbsp;&middot;&nbsp;{ card.displayAffiliation }</Text>
                <Text>&nbsp;&middot;&nbsp;{ card.displayType }</Text>
                { <Text>&nbsp;&middot;&nbsp;{ cardData }</Text> }
              </Text>
            </View>
          </View>
          <View style={ styles.chevronWrapper }>
            <Icon name={ 'chevron-right' } size={ 20 } style={ styles.chevron } />
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
