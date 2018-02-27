import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Html from 'react-native-render-html';
import DeviceInfo from 'react-native-device-info';

import SWDIcon from './SWDIcon';
import { colors } from '../styles';

import { cardDatabase } from '../data';
import CardParser from '../utils/CardParser';


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  cardTitleWrapper: {
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderBottomWidth: 8,
    height: 84,
    justifyContent: 'center',
  },
  cardTitleWrapperBlue: {
    backgroundColor: colors.blue,
    borderBottomColor: colors.blueDark,
  },
  cardTitleWrapperGray: {
    backgroundColor: colors.grayDark,
    borderBottomColor: colors.grayDarkDark,
  },
  cardTitleWrapperRed: {
    backgroundColor: colors.red,
    borderBottomColor: colors.redDark,
  },
  cardTitleWrapperYellow: {
    backgroundColor: colors.yellow,
    borderBottomColor: colors.yellowDark,
  },
  cardTitleInner: {
    paddingHorizontal: 8,
  },
  cardTitleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  cardTitleName: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  cardTitleSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.lightGray,
    textAlign: 'center',
    lineHeight: 14,
  },
  cardDetails: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: DeviceInfo.isTablet() ? 24 : 16,
    paddingTop: 16,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardDetailsInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    width: '100%',
  },
  cardDetailsInfoStat: {
    backgroundColor: colors.lightGrayTranslucent,
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  cardDetailsInfoStatTitle: {
    color: colors.darkGray,
    fontSize: DeviceInfo.isTablet() ? 18 : 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardDetailsInfoStatData: {
    color: colors.darkGray,
    fontSize: DeviceInfo.isTablet() ? 18 : 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardDetailsDice: {
    alignItems: 'center',
    backgroundColor: colors.lightGrayTranslucent,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    maxWidth: '100%',
    overflow: 'hidden',
  },
  cardDetailsDiceSide: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    height: DeviceInfo.isTablet() ? 64 : 48,
    justifyContent: 'center',
    padding: 8,
  },
  cardDetailsDiceSideTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardDetailsDiceSideBottom: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardDetailsDiceSideElement: {
    padding: 1,
  },
  cardDetailsDiceSideIcon: {
    color: colors.darkGray,
    fontSize: DeviceInfo.isTablet() ? 18 : 14,
    lineHeight: DeviceInfo.isTablet() ? 18 : 14,
  },
  cardDetailsDiceSideBottomIcon: {
    color: colors.yellowDark,
    fontSize: DeviceInfo.isTablet() ? 12 : 11,
    lineHeight: DeviceInfo.isTablet() ? 12 : 11,
  },
  cardDetailsDiceSideText: {
    color: colors.darkGray,
    fontSize: DeviceInfo.isTablet() ? 22 : 16,
    lineHeight: DeviceInfo.isTablet() ? 24 : 16,
    fontWeight: '700',
    marginTop: DeviceInfo.isTablet() ? 2 : 3,
  },
  cardDetailsDiceSideBottomText: {
    color: colors.yellowDark,
    fontSize: DeviceInfo.isTablet() ? 16 : 14,
    lineHeight: DeviceInfo.isTablet() ? 18 : 14,
    marginTop: DeviceInfo.isTablet() ? 1 : 2,
  },
  cardDetailsDiceSideBlankText: {
    color: colors.red,
  },
  cardDetailsDiceSideModiferText: {
    color: colors.blue,
  },
  cardDetailsType: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
    width: '100%',
  },
  cardDetailsTypeText: {
    color: colors.darkGray,
    fontSize: DeviceInfo.isTablet() ? 20 : 16,
    fontWeight: '700',
  },
  cardDetailsTypeTextIcon: {
    fontSize: DeviceInfo.isTablet() ? 16 : 14,
  },
  cardDetailsTextWrapper: {
    backgroundColor: colors.lightGrayTranslucent,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: '100%',
  },
  cardAdditionalInfoWrapper: {
    alignItems: 'center',
    backgroundColor: colors.lightGrayTranslucent,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: '100%',
  },
  cardAdditionalInfoText: {
    color: colors.darkGray,
  },
  cardImageWrapper: {
    height: 400,
    padding: 16,
    width: '100%',
  },
  cardImageWrapperBlue: {
    borderTopColor: colors.blue,
    borderTopWidth: 8,
  },
  cardImageWrapperGray: {
    borderTopColor: colors.grayDarkDark,
    borderTopWidth: 8,
  },
  cardImageWrapperRed: {
    borderTopColor: colors.red,
    borderTopWidth: 8,
  },
  cardImageWrapperYellow: {
    borderTopColor: colors.yellow,
    borderTopWidth: 8,
  },
  cardImage: {
    height: '100%',
    width: '100%',
  },
});

class CardDetail extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.card.id === nextProps.card.id) {
      return false;
    }

    return true;
  }

  renderCardName() {
    const {
      name: cardTitle,
      subtitle: cardSubtitle,
      faction: cardFaction,
      isUnique: cardIsUnique,
    } = this.props.card;

    let colorStyles = null;
    switch (cardFaction) {
      case 'blue':
        colorStyles = styles.cardTitleWrapperBlue;
        break;
      case 'red':
        colorStyles = styles.cardTitleWrapperRed;
        break;
      case 'yellow':
        colorStyles = styles.cardTitleWrapperYellow;
        break;
      default:
        colorStyles = styles.cardTitleWrapperGray;
    }

    const uniqueIcon = cardIsUnique ? (
      <Text>
        <SWDIcon type={ 'unique' } style={ styles.cardTitleIcon } />&nbsp;
      </Text>
    ) : null;

    return (
      <View style={ [styles.cardTitleWrapper, colorStyles] }>
        <View style={ styles.cardTitleInner }>
          <Text style={ styles.cardTitleName }>
            { uniqueIcon }
            { cardTitle }
          </Text>
          { cardSubtitle ? (
            <Text style={ styles.cardTitleSubtitle }>
              { cardSubtitle }
            </Text>) : null
          }
        </View>
      </View>
    );
  }

  renderCardType() {
    const {
      affiliation: cardAffiliation,
      position: cardPosition,
      set: cardSet,
      subtype: cardSubtype,
      type: cardType,
    } = this.props.card;

    const displayCardAffiliation =
      cardAffiliation.charAt(0).toUpperCase() + cardAffiliation.slice(1);
    const displayCardType = cardType.charAt(0).toUpperCase() + cardType.slice(1);

    let displayCardSubtype;
    if (cardSubtype) {
      displayCardSubtype = cardSubtype.charAt(0).toUpperCase() + cardSubtype.slice(1);
    }

    return (
      <View style={ styles.cardDetailsType }>
        { cardPosition ? (
          <Text style={ styles.cardDetailsTypeText }>
            <SWDIcon type={ cardSet } style={ styles.cardDetailsTypeTextIcon } />
            &nbsp;{ cardSet }&nbsp;{ cardPosition }
          </Text>) : null
        }
        <Text style={ styles.cardDetailsTypeText }>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          { displayCardType }
        </Text>
        { cardSubtype ? (
          <Text style={ styles.cardDetailsTypeText }>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;{ displayCardSubtype }
          </Text>) : null
        }
        { cardAffiliation ? (
          <Text style={ styles.cardDetailsTypeText }>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;{ displayCardAffiliation }
          </Text>) : null
        }
      </View>
    );
  }

  renderCardDetailsInfo() {
    const {
      cost: cardCost,
      health: cardHealth,
      points: cardPoints,
      hasBalance: cardHasBalance,
    } = this.props.card;

    const costText = cardCost !== null ?
      <View style={ styles.cardDetailsInfoStat }>
        <Text style={ styles.cardDetailsInfoStatData }>
          { cardCost }&nbsp;
        </Text>
        <SWDIcon type={ 'resource' } style={ styles.cardDetailsInfoStatTitle } />
      </View> : null;

    const pointsText = cardPoints !== null ?
      <View style={ styles.cardDetailsInfoStat }>
        <Text style={ styles.cardDetailsInfoStatData }>
          { cardPoints }
        </Text>
        { cardHasBalance &&
          <Text style={ styles.cardDetailsInfoStatTitle }>
            *
          </Text>
        }
        <Text style={ styles.cardDetailsInfoStatTitle }>
          &nbsp;Points
        </Text>
      </View> : null;

    const healthText = cardHealth !== null ?
      <View style={ styles.cardDetailsInfoStat }>
        <Text style={ styles.cardDetailsInfoStatData }>
          { cardHealth }&nbsp;
        </Text>
        <Text style={ styles.cardDetailsInfoStatTitle }>
          Health
        </Text>
      </View> : null;

    return (
      <View style={ styles.cardDetailsInfo }>
        { costText }
        { pointsText }
        { healthText }
      </View>
    );
  }

  renderDiceSides() {
    const {
      id: cardId,
      sides: cardSides,
      hasDie: cardHasDie,
    } = this.props.card;

    if (!cardHasDie) {
      return null;
    }

    const containerStyles = [styles.cardDetailsDiceSide];
    const textTopStyles = [styles.cardDetailsDiceSideText];
    const textBottomStyles = [
      styles.cardDetailsDiceSideText, styles.cardDetailsDiceSideBottomText];
    const iconTopStyles = [styles.cardDetailsDiceSideIcon];
    const iconBottomStyles = [
      styles.cardDetailsDiceSideIcon, styles.cardDetailsDiceSideBottomIcon];

    const sides = cardSides.map((dieSide, index) => {
      const parts = dieSide.match(/(\+)?([0-9]*)([A-Za-z-]*)([0-9]*)/);

      const [
        ,
        isModifier,
        sideValue,
        sideType,
        sideCost,
      ] = parts;

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

      let extraIconStyles = null;
      let extraTextStyles = null;
      if (isBlank) {
        extraIconStyles = styles.cardDetailsDiceSideBlankText;
        extraTextStyles = styles.cardDetailsDiceSideBlankText;
      } else if (isModifier) {
        extraIconStyles = styles.cardDetailsDiceSideModiferText;
        extraTextStyles = styles.cardDetailsDiceSideModiferText;
      }

      return (
        <View style={ containerStyles } key={ `sides_${cardId}_${index}`}>
          <View style={ styles.cardDetailsDiceSideTop }>
            { isModifier ? (
              <View style={ styles.cardDetailsDiceSideElement }>
                <Text style={ [textTopStyles, extraTextStyles] }>
                  +
                </Text>
              </View>) : null
            }
            <View style={ styles.cardDetailsDiceSideElement }>
              <Text style={ [textTopStyles, extraTextStyles] }>
                { isBlank ? '—' : sideValue }
              </Text>
            </View>
            <View style={ styles.cardDetailsDiceSideElement }>
              <SWDIcon type={ iconType } style={ [iconTopStyles, extraIconStyles] } />
            </View>
          </View>
          { sideCost ? (
            <View style={ styles.cardDetailsDiceSideBottom }>
              <Text style={ textBottomStyles }>
                { sideCost }
              </Text>
              <View style={ styles.cardDetailsDiceSideElement }>
                <SWDIcon type={ 'RESOURCE' } style={ iconBottomStyles } />
              </View>
            </View>) : null
          }
        </View>
      );
    });

    return (
      <View style={ styles.cardDetailsDice }>
        { sides }
      </View>
    );
  }

  renderCardText() {
    let { text: cardText } = this.props.card;

    if (!cardText) {
      return null;
    }

    cardText = CardParser.replaceLineBreaks(cardText);
    cardText = CardParser.replaceIconPlaceholders(cardText);

    const customRenderers = {
      icon: { renderer: CardParser.iconRenderer, wrapper: 'Text' },
    };

    return (
      <View style={ styles.cardDetailsTextWrapper }>
        <Html
          html={ cardText }
          baseFontStyle={{ fontSize: DeviceInfo.isTablet() ? 20 : 17, color: colors.darkGray }}
          tagsStyles={{ p: { marginTop: 0, marginBottom: 0 } }}
          renderers={ customRenderers }
        />
      </View>
    );
  }

  renderAdditionalInfo() {
    const {
      reprintOf: cardReprintOf,
    } = this.props.card;

    const views = [];

    const reprintCard = cardDatabase.find(cardReprintOf);
    if (reprintCard) {
      const reprintCardPosition = reprintCard.position;
      const reprintCardSet = reprintCard.set;

      views.push(<View style={ styles.cardAdditionalInfoWrapper }>
          <Text style={ styles.cardAdditionalInfoText }>
            Reprint of&nbsp;
          </Text>
          <Text style={ styles.cardAdditionalInfoText }>
            <SWDIcon type={ reprintCardSet } style={ styles.cardDetailsTypeTextIcon } />
            &nbsp;{ reprintCardSet }&nbsp;{ reprintCardPosition }
          </Text>
        </View>);
    }

    return views;
  }

  render() {
    const {
      id: cardId,
      faction: cardFaction,
    } = this.props.card;

    const imageSrc = `https://swdestinydb.com/bundles/cards/en/${cardId.slice(0, 2)}/${cardId}.jpg`;

    const imageWrapperStyles = [styles.cardImageWrapper];
    switch (cardFaction) {
      case 'blue':
        imageWrapperStyles.push(styles.cardImageWrapperBlue);
        break;
      case 'red':
        imageWrapperStyles.push(styles.cardImageWrapperRed);
        break;
      case 'yellow':
        imageWrapperStyles.push(styles.cardImageWrapperYellow);
        break;
      default:
        imageWrapperStyles.push(styles.cardImageWrapperGray);
    }

    // eslint-disable-next-line global-require
    const defaultImageSrc = require('../../assets/images/swd-texture.png');

    return (
      <View style={ styles.container }>
        <ScrollView>
          { this.renderCardName() }
          <View style={ styles.cardDetails }>
            { this.renderCardType() }
            { this.renderCardDetailsInfo() }
            { this.renderCardText() }
            { this.renderDiceSides() }
            { this.renderAdditionalInfo() }
          </View>
          <View style={ imageWrapperStyles }>
            <Image
              style={ styles.cardImage }
              resizeMode='contain'
              source={{ uri: imageSrc }}
              defaultSource={ defaultImageSrc }
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

CardDetail.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardDetail;
