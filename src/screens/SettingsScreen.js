import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SafariView from 'react-native-safari-view';

import FilterCloud from '../components/FilterCloud';

import { cardDatabase } from '../data';
import { colors } from '../styles';


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  information: {
    borderColor: colors.lightGrayDark,
    borderTopWidth: 1,
    marginBottom: 24,
    paddingTop: 24,
  },
  disclaimerText: {
    color: colors.gray,
    textAlign: 'center',
  },
  linkText: {
    color: colors.brand,
    textAlign: 'center',
  },
});


class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    SafariView.addEventListener(
      'onShow',
      () => {
        StatusBar.setBarStyle('dark-content');
      },
    );

    SafariView.addEventListener(
      'onDismiss',
      () => {
        StatusBar.setBarStyle('light-content');
      },
    );

    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  visitWebpage() {
    SafariView.show({
      tintColor: colors.headerBackground,
      url: 'http://rdonnelly.com',
    });
  }

  addFilter(setting, value) {
    const key = `${setting}_${value}`;
    console.log(setting, value);
    cardDatabase.addFilter(key, card => card[setting] !== value);
  }

  removeFilter(setting, value) {
    const key = `${setting}_${value}`;
    cardDatabase.removeFilter(key);
  }

  render() {
    // eslint-disable-next-line global-require
    const affiliationOptions = require('swdestinydb-json-data/affiliations.json');

    const affiliationCloud = (
      <FilterCloud
        label={ 'Affiliation' }
        setting={ 'affiliation' }
        options={ affiliationOptions }
        onCallback={ this.removeFilter }
        offCallback={ this.addFilter }
      />
    );

    // eslint-disable-next-line global-require
    const factionOptions = require('swdestinydb-json-data/factions.json');

    const factionCloud = (
      <FilterCloud
        label={ 'Faction' }
        setting={ 'faction' }
        options={ factionOptions }
        onCallback={ this.removeFilter }
        offCallback={ this.addFilter }
      />
    );

    // eslint-disable-next-line global-require
    const setOptions = require('swdestinydb-json-data/sets.json');

    const setCloud = (
      <FilterCloud
        label={ 'Sets' }
        setting={ 'set_code' }
        options={ setOptions }
        onCallback={ this.removeFilter }
        offCallback={ this.addFilter }
      />
    );

    // eslint-disable-next-line global-require
    const typeOptions = require('swdestinydb-json-data/types.json');

    const typeCloud = (
      <FilterCloud
        label={ 'Types' }
        setting={ 'type' }
        options={ typeOptions }
        onCallback={ this.removeFilter }
        offCallback={ this.addFilter }
      />
    );

    return (
      <View style={ styles.container }>
        <ScrollView
          style={ styles.scrollView }
          contentContainerStyle={ styles.scrollViewContent }
        >
          { affiliationCloud }
          { factionCloud }
          { setCloud }
          { typeCloud }

          <View style={ styles.information }>
            <Text style={ styles.disclaimerText }>
              The information presented in this app about Star Wars Destiny,
              both literal and graphical, is copyrighted by Fantasy Flight
              Games. This app is not produced by, endorsed by, supported by, or
              affiliated with Fantasy Flight Games.
            </Text>
          </View>

          <View style={ styles.information }>
            <TouchableOpacity onPress={ this.visitWebpage }>
              <Text style={ styles.linkText }>
                Designed and Developed by
              </Text>
              <Text style={ styles.linkText }>
                Ryan Donnelly
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <StatusBar animated={ true } barStyle="light-content" />
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SettingsScreen;
