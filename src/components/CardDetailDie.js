import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';

import SWDIcon from './SWDIcon';

import { base, colors } from '../styles';

const isTablet = DeviceInfo.isTablet();

const styles = StyleSheet.create({
  container: {
    ...base.container,
    backgroundColor: colors.lightGrayTranslucent,
    borderRadius: 4,
    flexDirection: 'row',
    marginBottom: 16,
  },
  dieSide: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    height: isTablet ? 64 : 48,
    justifyContent: 'center',
    padding: 8,
  },
  dieSideTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dieSideBottom: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dieSideElement: {
    paddingRight: 1,
  },
  dieSideIcon: {
    color: colors.darkGray,
    fontSize: isTablet ? 18 : 14,
    lineHeight: isTablet ? 18 : 14,
  },
  dieSideText: {
    color: colors.darkGray,
    fontSize: isTablet ? 22 : 16,
    lineHeight: isTablet ? 24 : 16,
    fontWeight: '700',
    marginTop: isTablet ? 2 : 3,
  },
  dieSideBottomText: {
    color: colors.yellowDark,
    fontSize: isTablet ? 16 : 12,
    lineHeight: isTablet ? 18 : 12,
    marginTop: isTablet ? 1 : 2,
  },
  dieSideBottomIcon: {
    color: colors.yellowDark,
    fontSize: isTablet ? 12 : 9,
    lineHeight: isTablet ? 12 : 9,
  },
  dieSideBlankText: {
    color: colors.red,
  },
  dieSideModiferText: {
    color: colors.blue,
  },
});

class CardDetailDie extends PureComponent {
  render() {
    const {
      id: cardId,
      sides: cardSides,
      hasDie: cardHasDie,
    } = this.props.card;

    if (!cardHasDie) {
      return null;
    }

    const containerStyles = [styles.dieSide];
    const textTopStyles = [styles.dieSideText];
    const textBottomStyles = [styles.dieSideText, styles.dieSideBottomText];
    const iconTopStyles = [styles.dieSideIcon];
    const iconBottomStyles = [styles.dieSideIcon, styles.dieSideBottomIcon];

    const sides = cardSides.map((dieSide, index) => {
      const parts = dieSide.match(
        /(?:(\+)?([0-9]|X)?(MD|RD|ID|F|Dr|Dc|Sh|R|Sp|\*|-)([0-9]?))/,
      );

      const [, isModifier, sideValue, sideType, sideCost] = parts;

      let iconType = '-';

      switch (sideType) {
        case 'R':
          iconType = 'RESOURCE';
          break;
        case 'Sp':
          iconType = 'SPECIAL';
          break;
        case 'Dc':
          iconType = 'DISCARD';
          break;
        case 'Dr':
          iconType = 'DISRUPT';
          break;
        case 'F':
          iconType = 'FOCUS';
          break;
        case 'ID':
          iconType = 'INDIRECT';
          break;
        case 'MD':
          iconType = 'MELEE';
          break;
        case 'RD':
          iconType = 'RANGED';
          break;
        case 'Sh':
          iconType = 'SHIELD';
          break;
        case 'X':
        default:
          iconType = '-';
      }

      const isBlank = sideType === '-';
      let displayValue = sideValue;
      if (isBlank) {
        displayValue = '—';
      }

      let extraIconStyles = null;
      let extraTextStyles = null;
      if (isBlank) {
        extraIconStyles = styles.dieSideBlankText;
        extraTextStyles = styles.dieSideBlankText;
      } else if (isModifier) {
        extraIconStyles = styles.dieSideModiferText;
        extraTextStyles = styles.dieSideModiferText;
      }

      return (
        <View style={containerStyles} key={`sides_${cardId}_${index}`}>
          <View style={styles.dieSideTop}>
            {isModifier ? (
              <View style={styles.dieSideElement}>
                <Text style={[textTopStyles, extraTextStyles]}>+</Text>
              </View>
            ) : null}
            <View style={styles.dieSideElement}>
              <Text style={[textTopStyles, extraTextStyles]}>
                {displayValue}
              </Text>
            </View>
            <View style={styles.dieSideElement}>
              <SWDIcon
                type={iconType}
                style={[iconTopStyles, extraIconStyles]}
              />
            </View>
          </View>
          {sideCost ? (
            <View style={styles.dieSideBottom}>
              <Text style={textBottomStyles}>{sideCost}</Text>
              <View style={styles.dieSideElement}>
                <SWDIcon type={'RESOURCE'} style={iconBottomStyles} />
              </View>
            </View>
          ) : null}
        </View>
      );
    });

    return <View style={styles.container}>{sides}</View>;
  }
}

export default CardDetailDie;

CardDetailDie.propTypes = {
  card: PropTypes.object.isRequired,
};
