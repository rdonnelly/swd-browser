import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import SWDIcon from './SWDIcon';
import { validateSetCode } from '../lib/SWDIconCodes';
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
  rowSelected: {
    backgroundColor: colors.whiteTranslucent75,
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
    flexDirection: 'row',
    paddingVertical: 1,
  },
  cardDetailsInfoSet: {
    marginTop: 2,
  },
  cardDetailsInfoSetIcon: {
    color: colors.gray,
    fontSize: 12,
  },
  cardDetailsInfoText: {
    color: colors.gray,
    fontSize: 13,
    fontWeight: '500',
  },
  chevronWrapper: {
  },
  chevron: {
    color: colors.lightGrayDark,
    marginTop: 2,
  },
  chevronSelected: {
    color: colors.brand,
  },
});


class CardListItem extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.card.id !== nextProps.card.id) {
      return true;
    }

    if (this.props.isSelected !== nextProps.isSelected) {
      return true;
    }

    return false;
  }

  render() {
    const {
      card,
      isSelected,
      onPressItem,
    } = this.props;

    const setIcon = validateSetCode(card.set) ?
      (<SWDIcon type={ card.set } style={ styles.cardDetailsInfoSetIcon } />) :
      null;

    let cardData = '';
    if (card.cost !== null) {
      cardData = card.cost;
    }
    if (card.points) {
      cardData = card.pointsPerFormat.inf;
      if (card.hasBalance) {
        cardData = `${cardData}*`;
      }
    }

    const rowStyles = [styles.row];
    const chevronStyles = [styles.chevron];
    if (isSelected) {
      rowStyles.push(styles.rowSelected);
      chevronStyles.push(styles.chevronSelected);
    }

    const iconGlyphStyles = [styles.cardIconGlyph];
    const colorString = `card${card.faction.charAt(0).toUpperCase() + card.faction.slice(1)}`;
    iconGlyphStyles.push({ color: colors[colorString] });

    return (
      <View style={ rowStyles }>
        <TouchableOpacity
          onPress={ () => onPressItem(card) }
          style={ styles.rowTappable }
        >
          <View style={ styles.cardIcon }>
            <SWDIcon type={ card.type } style={ iconGlyphStyles } />
          </View>
          <View style={ styles.cardDetails }>
            <View style={ styles.cardDetailsName }>
              <Text
                style={ styles.cardDetailsNameText }
                numberOfLines={ 1 }
              >
                { card.name }
              </Text>
            </View>
            <View style={ styles.cardDetailsInfo }>
              <Text style={ styles.cardDetailsInfoSet }>
                { setIcon }
              </Text>
              <Text style={ styles.cardDetailsInfoText }>
                { setIcon && <Text>&nbsp;</Text>}
                <Text>{ card.set }&nbsp;{ card.position }</Text>
                <Text>&nbsp;&middot;&nbsp;{ card.displayType }</Text>
                <Text>&nbsp;&middot;&nbsp;{ card.displayAffiliation }</Text>
                { cardData !== '' && <Text>&nbsp;&middot;&nbsp;{ cardData }</Text> }
              </Text>
            </View>
          </View>
          <View style={ styles.chevronWrapper }>
            <FontAwesome5Icon name={ 'chevron-right' } size={ 16 } style={ chevronStyles } />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

CardListItem.propTypes = {
  card: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default CardListItem;
