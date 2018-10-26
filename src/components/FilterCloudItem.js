import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

import { base as baseStyles, colors } from '../styles';


const styles = StyleSheet.create({
  button: {
    ...baseStyles.button,
    backgroundColor: colors.whiteTranslucent,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  buttonOn: {
    backgroundColor: colors.white,
  },
  text: {
    ...baseStyles.buttonText,
    color: colors.grayDark,
    fontSize: 15,
  },
  textOn: {
    color: colors.brand,
  },
});

class FilterCloudItem extends PureComponent {
  static defaultProps = {
    value: true,
  };

  state = {
    value: this.props.value,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  onValueChange = () => {
    this.setState({ value: !this.state.value });
    this.props.callback(this.props.setting, !this.state.value);
  }

  render() {
    const containerStyles = [styles.container];
    if (this.state.value) {
      containerStyles.push(styles.containerOn);
    }

    const textStyles = [styles.text];
    if (this.state.value) {
      textStyles.push(styles.textOn);
    }

    return (
      <TouchableOpacity
        onPress={ this.onValueChange }
        style={ containerStyles }
      >
        <Text style={ textStyles }>
          { this.props.label }
        </Text>
      </TouchableOpacity>
    );
  }
}

FilterCloudItem.propTypes = {
  value: PropTypes.bool.isRequired,
  setting: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,

  callback: PropTypes.func,
};

export default FilterCloudItem;
