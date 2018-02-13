import _uniq from 'lodash/uniq';
import _without from 'lodash/without';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FilterCloudItem from './FilterCloudItem';
import { colors } from '../styles';


const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  labelWrapper: {
    marginRight: 8,
  },
  label: {
    color: colors.darkGray,
    fontSize: 20,
    fontWeight: '800',
  },
  controlsWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  control: {
    backgroundColor: colors.lightGrayTranslucent,
    borderRadius: 4,
    paddingVertical: 4,
    marginLeft: 8,
    width: 48,
  },
  controlText: {
    color: colors.darkGray,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    // textDecorationLine: 'underline',
  },
  optionsWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

class FilterCloud extends Component {
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
    this.selectAll = this.selectAll.bind(this);
    this.selectNone = this.selectNone.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.values.length === nextState.values.length) {
      return false;
    }

    return true;
  }

  onValueChange(code, value) {
    let { values } = this.state;

    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }

    if (value) {
      values = _without(values, code);
    } else {
      values.push(code);
      values = _uniq(values);
    }

    const timeoutId = setTimeout(() => {
      if (values.length === 0) {
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

  selectAll() {
    const values = [];

    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }

    const timeoutId = setTimeout(() => {
      this.props.offCallback(this.props.setting);
      this.setState({ timeoutId: null });
    }, 750);

    this.setState({
      timeoutId,
      values,
    });
  }

  selectNone() {
    const values = [];

    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }

    this.props.options.forEach(({ code }) => { values.push(code); });

    const timeoutId = setTimeout(() => {
      this.props.onCallback(this.props.setting, values);
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
        <View style={ styles.header }>
          <View style={ styles.labelWrapper }>
            <Text style={ styles.label }>
              { this.props.label }
            </Text>
          </View>
          <View style={ styles.controlsWrapper }>
            <TouchableOpacity
              onPress={ this.selectAll }
              style={ styles.control }
            >
              <Text style={ styles.controlText }>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ this.selectNone }
              style={ styles.control }
            >
              <Text style={ styles.controlText }>None</Text>
            </TouchableOpacity>
          </View>
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
