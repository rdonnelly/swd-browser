import _uniq from 'lodash/uniq';
import _without from 'lodash/without';
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

    this.state = {
      values,
      timeoutId: null,
    };

    this.onValueChange = this.onValueChange.bind(this);
  }

  componentDidUpdate() {

  }

  onValueChange(code, value) {
    let { timeoutId, values } = this.state;

    if (timeoutId) {
      clearTimeout(this.state.timeoutId);
    }

    if (value) {
      values = _without(values, code);
    } else {
      values.push(code);
      values = _uniq(values);
    }

    timeoutId = setTimeout(() => {
      if (values.length === this.props.options.length) {
        this.props.offCallback(this.props.setting);
      } else {
        this.props.onCallback(this.props.setting, values);
      }

      this.setState({ timeoutId: null });
    }, 750);

    this.setState({
      timeoutId,
      values,
    });
  }

  render() {
    const optionItems = this.props.options.map(option => (
      <FilterCloudItem
        key={ `settingclouditem__${this.props.setting}__${option.code}` }
        value={ !this.state.values.includes(option.code) }
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
