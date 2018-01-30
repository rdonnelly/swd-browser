import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import _get from 'lodash/get';

import { swdestiny } from '../utils/SWDIconMap';

class SWDIcon extends PureComponent {
  render() {
    const {
      type, style, addSpace,
    } = this.props;

    const code = _get(swdestiny, type.toUpperCase());
    if (!code) {
      return null;
    }

    const codeString = String.fromCharCode(parseInt(code, 16));

    return (
      <Text style={[style, { fontFamily: 'swdestiny' }]}>
        { codeString }
        { addSpace ? ' ' : '' }
      </Text>
    );
  }
}

export default SWDIcon;

SWDIcon.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.any,
  addSpace: PropTypes.bool,
};
