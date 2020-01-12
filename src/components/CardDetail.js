import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Html from 'react-native-render-html';
import DeviceInfo from 'react-native-device-info';
import Emoji from 'react-native-emoji';

import CardDetailDie from './CardDetailDie';
import CardDetailPills from './CardDetailPills';
import SWDIcon from './SWDIcon';

import { cardDatabase, subtypes } from '../data';
import CardParser from '../utils/CardParser';
import { setClipboard } from '../utils/Clipboard';
import { shareImageUrl } from '../utils/Share';
import defaultImageSrc from '../../assets/images/swd-texture.png';

import { base, colors } from '../styles';

const isTablet = DeviceInfo.isTablet();

const styles = StyleSheet.create({
  container: {
    ...base.container,
    backgroundColor: colors.lightGray,
  },
  scrollView: {
    width: '100%',
  },
  cardTitleWrapper: {
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderBottomWidth: 8,
    flex: 1,
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
    color: colors.whiteTranslucent75,
    textAlign: 'center',
    lineHeight: 14,
  },
  cardDetail: {
    paddingHorizontal: isTablet ? 24 : 16,
    paddingTop: 16,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardDetailPillData: {
    color: colors.darkGray,
    fontSize: isTablet ? 18 : 16,
    fontWeight: '900',
  },
  cardDetailPillDataSmall: {
    color: colors.darkGray,
    fontSize: isTablet ? 13 : 10,
    fontWeight: '900',
  },
  cardDetailPillTitle: {
    color: colors.darkGray,
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
  },
  cardDetailPillTitleIcon: {
    fontSize: isTablet ? 16 : 14,
  },
  cardDetailType: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
    width: '100%',
  },
  cardDetailTypeText: {
    color: colors.darkGray,
    fontSize: isTablet ? 20 : 16,
    fontWeight: '700',
  },
  cardDetailTypeTextIcon: {
    fontSize: isTablet ? 16 : 14,
  },
  cardDetailTextWrapper: {
    backgroundColor: colors.lightGrayTranslucent,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: '100%',
  },
  cardDetailText: {
    color: colors.darkGray,
    fontSize: isTablet ? 20 : 17,
    fontWeight: '500',
    letterSpacing: isTablet ? -0.54 : -0.408,
  },
  cardImageWrapper: {
    backgroundColor: colors.white,
    height: 440,
    marginBottom: 16,
    padding: 16,
    width: '100%',
  },
  cardImageWrapperBlue: {
    borderBottomColor: colors.blue,
    borderBottomWidth: 8,
    borderTopColor: colors.blue,
    borderTopWidth: 8,
  },
  cardImageWrapperGray: {
    borderBottomColor: colors.grayDarkDark,
    borderBottomWidth: 8,
    borderTopColor: colors.grayDarkDark,
    borderTopWidth: 8,
  },
  cardImageWrapperRed: {
    borderBottomColor: colors.red,
    borderBottomWidth: 8,
    borderTopColor: colors.red,
    borderTopWidth: 8,
  },
  cardImageWrapperYellow: {
    borderBottomColor: colors.yellow,
    borderBottomWidth: 8,
    borderTopColor: colors.yellow,
    borderTopWidth: 8,
  },
  cardImage: {
    height: '100%',
    width: '100%',
  },
  holocronContainer: {
    ...base.container,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
    flexDirection: 'row',
  },
  holocronFormat: {
    alignItems: 'center',
    backgroundColor: colors.lightGrayTranslucent,
    borderRadius: 4,
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 4,
    padding: 12,
  },
  holocronFormatTitle: {
    flex: 1,
    color: colors.grayDarkDark,
    fontSize: isTablet ? 13 : 10,
    fontWeight: '800',
  },
  holocronFormatData: {
    flex: 1,
    color: colors.darkGray,
    fontSize: isTablet ? 16 : 14,
    fontWeight: '700',
  },
  holocronFormatDataEmoji: {
    fontSize: isTablet ? 13 : 11,
    lineHeight: isTablet ? 18 : 16,
  },
  cardAdditionalInfoContainer: {
    ...base.container,
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: isTablet ? 24 : 16,
    width: '100%',
  },
  cardAdditionalInfoWrapper: {
    alignItems: 'center',
    backgroundColor: colors.lightGrayTranslucent,
    borderRadius: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: '100%',
  },
  cardAdditionalInfoItem: {
    flexDirection: 'row',
  },
  cardAdditionalInfoText: {
    color: colors.darkGray,
  },
});

class CardDetail extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.card.id === nextProps.card.id) {
      return false;
    }

    return true;
  }

  handleCardTextLongPress = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy');

    const cardText = CardParser.convertToText(this.props.card);

    setClipboard(cardText);
  };

  handleImageLongPress = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy');

    const { id: cardId } = this.props.card;

    const imageSrc = `https://swdestinydb.com/bundles/cards/en/${cardId.slice(
      0,
      2,
    )}/${cardId}.jpg`;
    shareImageUrl(imageSrc);
  };

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
        <SWDIcon type={'unique'} style={styles.cardTitleIcon} />
        &nbsp;
      </Text>
    ) : null;

    return (
      <View style={[styles.cardTitleWrapper, colorStyles]}>
        <View style={styles.cardTitleInner}>
          <Text style={styles.cardTitleName}>
            {uniqueIcon}
            {cardTitle}
          </Text>
          {cardSubtitle ? (
            <Text style={styles.cardTitleSubtitle}>{cardSubtitle}</Text>
          ) : null}
        </View>
      </View>
    );
  }

  renderCardType() {
    const { displayType: cardType, subtypes: cardSubtypes } = this.props.card;

    let displayCardSubtypes;
    if (cardSubtypes && cardSubtypes.length) {
      displayCardSubtypes = cardSubtypes.map((cardSubtype) => {
        const displayCardSubtype = subtypes.find(
          (subtype) => subtype.code === cardSubtype.toLowerCase(),
        ).name;

        return (
          <Text key={`subtype_${cardSubtype}`}>
            &nbsp;&nbsp;&middot; {displayCardSubtype}
          </Text>
        );
      });
    }

    return (
      <View style={styles.cardDetailType}>
        <Text style={styles.cardDetailTypeText}>{cardType}</Text>
        {displayCardSubtypes ? (
          <Text style={styles.cardDetailTypeText}>{displayCardSubtypes}</Text>
        ) : null}
      </View>
    );
  }

  renderCardDetailsInfo() {
    const {
      cost: cardCost,
      health: cardHealth,
      points: cardPoints,
      pointsPerFormat: cardPointsPerFormat,
      hasBalance: cardHasBalance,
    } = this.props.card;

    const pills = [];

    if (cardCost !== null) {
      pills.push(
        <Text>
          <Text style={styles.cardDetailPillData}>{cardCost}&nbsp;</Text>
          <SWDIcon
            type={'resource'}
            style={[styles.cardDetailPillTitle, styles.cardDetailPillTitleIcon]}
          />
        </Text>,
      );
    }

    if (cardPoints !== null) {
      pills.push(
        <Text>
          <Text style={styles.cardDetailPillData}>
            {cardPointsPerFormat.inf}
          </Text>
          {cardHasBalance && <Text style={styles.cardDetailPillData}>*</Text>}
          <Text style={styles.cardDetailPillTitle}>&nbsp;Points</Text>
        </Text>,
      );
    }

    if (cardHealth !== null) {
      pills.push(
        <Text>
          <Text style={styles.cardDetailPillData}>{cardHealth}&nbsp;</Text>
          <Text style={styles.cardDetailPillTitle}>Health</Text>
        </Text>,
      );
    }

    return <CardDetailPills info={pills} />;
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

    const customTagStyles = {
      i: { fontStyle: 'italic', fontWeight: '700' },
      p: { marginTop: 0, marginBottom: 0 },
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={this.handleCardTextLongPress}
        style={styles.cardDetailTextWrapper}
      >
        <Html
          html={cardText}
          baseFontStyle={styles.cardDetailText}
          tagsStyles={customTagStyles}
          renderers={customRenderers}
        />
      </TouchableOpacity>
    );
  }

  renderCardDetailsBottom() {
    const {
      displayAffiliation: affiliation,
      displayFaction: faction,
      displayRarity: rarity,
    } = this.props.card;

    const pills = [];

    if (affiliation !== null) {
      pills.push(
        <Text>
          <Text style={styles.cardDetailPillDataSmall}>{affiliation}</Text>
        </Text>,
      );
    }

    if (faction !== null) {
      pills.push(
        <Text>
          <Text style={styles.cardDetailPillDataSmall}>{faction}</Text>
        </Text>,
      );
    }

    if (rarity !== null) {
      pills.push(
        <Text>
          <Text style={styles.cardDetailPillDataSmall}>{rarity}</Text>
        </Text>,
      );
    }

    return <CardDetailPills info={pills} />;
  }

  renderHolocron() {
    const {
      formats: cardFormats,
      points: cardPoints,
      pointsPerFormat: cardPointsPerFormat,
    } = this.props.card;

    return (
      <View style={styles.holocronContainer}>
        {cardPoints ? (
          <View style={styles.holocronFormat}>
            <Text style={styles.holocronFormatTitle}>PRINT</Text>
            <Text style={styles.holocronFormatData}>{cardPoints}</Text>
          </View>
        ) : null}
        <View style={styles.holocronFormat}>
          <Text style={styles.holocronFormatTitle}>INF</Text>
          <Text style={styles.holocronFormatData}>
            {cardFormats.includes('INF') ? (
              cardPoints ? (
                cardPointsPerFormat.inf
              ) : (
                <Emoji name="+1" style={styles.holocronFormatDataEmoji} />
              )
            ) : (
              <Emoji name="no_entry" style={styles.holocronFormatDataEmoji} />
            )}
          </Text>
        </View>
        <View style={styles.holocronFormat}>
          <Text style={styles.holocronFormatTitle}>STD</Text>
          <Text style={styles.holocronFormatData}>
            {cardFormats.includes('STD') ? (
              cardPoints ? (
                cardPointsPerFormat.std
              ) : (
                <Emoji name="+1" style={styles.holocronFormatDataEmoji} />
              )
            ) : (
              <Emoji name="no_entry" style={styles.holocronFormatDataEmoji} />
            )}
          </Text>
        </View>
        <View style={styles.holocronFormat}>
          <Text style={styles.holocronFormatTitle}>TRI</Text>
          <Text style={styles.holocronFormatData}>
            {cardFormats.includes('TRI') ? (
              cardPoints ? (
                cardPointsPerFormat.tri
              ) : (
                <Emoji name="+1" style={styles.holocronFormatDataEmoji} />
              )
            ) : (
              <Emoji name="no_entry" style={styles.holocronFormatDataEmoji} />
            )}
          </Text>
        </View>
      </View>
    );
  }

  renderAdditionalInfo() {
    const {
      reprintOf: cardReprintOf,
      starterSets: cardStarterSets,
    } = this.props.card;

    const views = [];

    const reprintCard = cardDatabase.find(cardReprintOf);
    if (reprintCard) {
      const reprintCardPosition = reprintCard.position;
      const reprintCardSet = reprintCard.set;

      views.push(
        <View
          style={styles.cardAdditionalInfoWrapper}
          key={'additional-info-reprint'}
        >
          <View style={styles.cardAdditionalInfoItem}>
            <Text style={styles.cardAdditionalInfoText}>Reprint of&nbsp;</Text>
            <Text style={styles.cardAdditionalInfoText}>
              <SWDIcon
                type={reprintCardSet}
                style={styles.cardDetailTypeTextIcon}
              />
              &nbsp;{reprintCardSet}&nbsp;{reprintCardPosition}
            </Text>
          </View>
        </View>,
      );
    }

    if (cardStarterSets && cardStarterSets.length) {
      views.push(
        <View
          style={styles.cardAdditionalInfoWrapper}
          key={'additional-info-starters'}
        >
          {cardStarterSets.map((starterName) => (
            <View
              style={styles.cardAdditionalInfoItem}
              key={`found-in-starter-${starterName}`}
            >
              <Text style={styles.cardAdditionalInfoText}>
                Found In {starterName}
              </Text>
            </View>
          ))}
        </View>,
      );
    }

    return views.length ? (
      <View style={styles.cardAdditionalInfoContainer}>{views}</View>
    ) : null;
  }

  render() {
    const { card } = this.props;
    const { id: cardId, faction: cardFaction } = this.props.card;

    const imageSrc = `https://swdestinydb.com/bundles/cards/en/${cardId.slice(
      0,
      2,
    )}/${cardId}.jpg`;

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

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.renderCardName()}
          <View style={styles.cardDetail}>
            {this.renderCardType()}
            {this.renderCardDetailsInfo()}
            {this.renderCardText()}
            <CardDetailDie card={card} />
            {this.renderCardDetailsBottom()}
          </View>
          <View style={imageWrapperStyles}>
            <TouchableOpacity
              activeOpacity={0.9}
              onLongPress={this.handleImageLongPress}
            >
              <Image
                style={styles.cardImage}
                resizeMode="contain"
                source={{ uri: imageSrc }}
                defaultSource={defaultImageSrc}
              />
            </TouchableOpacity>
          </View>
          {this.renderHolocron()}
          {this.renderAdditionalInfo()}
        </ScrollView>
      </View>
    );
  }
}

CardDetail.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardDetail;
