import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FilterCloudItem from './FilterCloudItem';
import { colors } from '../styles';


const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    width: '100%',
  },
  labelWrapper: {
    marginBottom: 8,
  },
  label: {
    color: colors.darkGray,
    fontSize: 18,
    fontWeight: '700',
  },
  optionsWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

class FilterCloud extends PureComponent {
  static defaultProps = {
    value: true,
  };

  constructor(props) {
    super(props);

    const values = [];

    this.props.options.forEach(({ code }) => { values.push(code); });

    this.state = {
      values,
    };

    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(code, value) {
    if (value) {
      if (this.props.onCallback) {
        setTimeout(() => {
          this.props.onCallback(this.props.setting, code);
        }, 0);
      }
    } else if (this.props.offCallback) {
      setTimeout(() => {
        this.props.offCallback(this.props.setting, code);
      }, 0);
    }
  }

  render() {
    const optionItems = this.props.options.map(option => (
      <FilterCloudItem
        key={ `settingclouditem__${this.props.setting}__${option.code}` }
        value={ this.state.values.includes(option.code) }
        setting={ option.code }
        label={ option.name }
        callback={ this.onValueChange }
      />
    ));

    return (
      <View style={ styles.container }>
        <View style={ styles.labelWrapper }>
          <Text style={ styles.label }>
            { this.props.label }
          </Text>
        </View>
        <View style={ styles.optionsWrapper }>
          { optionItems }
        </View>
      </View>
    );
  }
}

FilterCloud.propTypes = {
  label: PropTypes.string.isRequired,
  setting: PropTypes.string.isRequired,

  options: PropTypes.array.isRequired,

  onCallback: PropTypes.func,
  offCallback: PropTypes.func,
};

export default FilterCloud;
