import _difference from 'lodash/difference';
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


const INTERACTION_DELAY = 750;

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
  },
  optionsWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

class FilterCloud extends Component {
  constructor(props) {
    super(props);

    this.timeoutId = null;

    this.state = {
      values: this.props.options.map(option => option.code),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_difference(this.state.values, nextState.values).length) {
      return true;
    }
    if (_difference(nextState.values, this.state.values).length) {
      return true;
    }
    return false;
  }

  reset = () => {
    this.selectAll();
  }

  onPressItem = (code, value) => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    let values = this.state.values.slice(0);

    if (value) {
      values.push(code);
      values = _uniq(values);
    } else {
      values = _without(values, code);
    }

    this.timeoutId = setTimeout(() => {
      if (values.length === this.props.options.length) {
        this.props.offCallback(this.props.setting);
      } else {
        this.props.onCallback(this.props.setting, values);
      }
    }, INTERACTION_DELAY);

    this.setState({
      values,
    });
  }

  onLongPressItem = (code) => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    const values = [code];

    this.timeoutId = setTimeout(() => {
      if (values.length === this.props.options.length) {
        this.props.offCallback(this.props.setting);
      } else {
        this.props.onCallback(this.props.setting, values);
      }
    }, INTERACTION_DELAY);

    this.setState({
      values,
    });
  }

  selectAll = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    const values = this.props.options.map(option => option.code);

    this.timeoutId = setTimeout(() => {
      this.props.offCallback(this.props.setting);
    }, INTERACTION_DELAY);

    this.setState({
      values,
    });
  }

  selectNone = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    const values = [];

    this.timeoutId = setTimeout(() => {
      this.props.onCallback(this.props.setting, values);
    }, INTERACTION_DELAY);

    this.setState({
      values,
    });
  }

  render() {
    const optionItems = this.props.options.map(option => (
      <FilterCloudItem
        key={ `settingclouditem-${this.props.setting}-${option.code}` }
        value={ this.state.values.includes(option.code) }
        setting={ option.code }
        label={ option.name }
        handlePress={ this.onPressItem }
        handleLongPress={ this.onLongPressItem }
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
