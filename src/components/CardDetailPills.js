import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { base, colors } from '../styles';

const styles = StyleSheet.create({
  container: {
    ...base.container,
    flexDirection: 'row',
    marginBottom: 16,
  },
  pill: {
    alignItems: 'center',
    backgroundColor: colors.lightGrayTranslucent,
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pillLast: {
    marginRight: 0,
  },
});

class CardDetailPills extends PureComponent {
  render() {
    const { info } = this.props;
    const pills = info.map((content, i) => {
      const pillStyles = [styles.pill];

      if (info.length - 1 === i) {
        pillStyles.push(styles.pillLast);
      }

      return (
        <View key={`pill_${i}`} style={pillStyles}>
          <Text>{content}</Text>
        </View>
      );
    });

    return <View style={styles.container}>{pills}</View>;
  }
}

export default CardDetailPills;

CardDetailPills.propTypes = {
  info: PropTypes.array.isRequired,
};
