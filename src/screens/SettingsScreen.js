import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
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
    paddingBottom: 64,
  },
  information: {
    borderColor: colors.lightGrayDark,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginBottom: 24,
    paddingTop: 24,
  },
  floatingControls: {
    backgroundColor: colors.lightGrayTranslucent,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    bottom: 0,
    left: 0,
    padding: 8,
    position: 'absolute',
    right: 0,
  },
  floatingControlsButton: {
    backgroundColor: colors.brand,
    borderRadius: 4,
    padding: 12,
  },
  floatingControlsButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
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

    this.resetScreen = this.resetScreen.bind(this);

    this.updateFilter = this.updateFilter.bind(this);
    this.updateFilterList = this.updateFilterList.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.removeAllFilters = this.removeAllFilters.bind(this);

    this.renderReset = this.renderReset.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      resetScreen: this.resetScreen,
    });
  }

  resetScreen() {
    this.scrollView.scrollTo(0);
  }

  visitWebpage() {
    SafariView.show({
      tintColor: colors.headerBackground,
      url: 'http://rdonnelly.com',
    });
  }

  updateFilter(setting, values) {
    const key = `filter_${setting}`;
    cardDatabase.addFilter(key, card => values.includes(card[setting]));
  }

  updateFilterList(setting, values) {
    const key = `filter_${setting}`;

    cardDatabase.addFilter(key, (card) => {
      if (values.length === 0) {
        return false;
      }

      if (card[setting].length === 0 && values.includes('none')) {
        return true;
      }

      return values.some(value => card[setting].includes(value));
    });
  }

  removeFilter(setting) {
    const key = `filter_${setting}`;
    cardDatabase.removeFilter(key);
  }

  removeAllFilters() {
    Alert.alert(
      'Reset Filters?',
      'This will reset all filters. Are you sure you want to continue?',
      [
        { text: 'Cancel' },
        {
          text: 'Reset',
          onPress: () => {
            cardDatabase.removeAllFilters();

            this.affiliationCloud.reset();
            this.factionCloud.reset();
            this.setCloud.reset();
            this.typeCloud.reset();
            this.subtypeCloud.reset();
            this.keywordCloud.reset();
            this.rarityCloud.reset();
          },
          style: 'destructive',
        },
      ],
    );
  }

  renderReset() {
    return (
      <View style={ styles.floatingControls }>
        <TouchableOpacity
          onPress={ this.removeAllFilters }
          style={ styles.floatingControlsButton }
        >
          <Text style={ styles.floatingControlsButtonText }>Reset Filters</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    // eslint-disable-next-line global-require
    const affiliationOptions = require('swdestinydb-json-data/affiliations.json');

    const affiliationCloud = (
      <FilterCloud
        label={ 'Affiliation' }
        setting={ 'affiliation' }
        options={ affiliationOptions }
        onCallback={ this.updateFilter }
        offCallback={ this.removeFilter }
        ref={ (component) => { this.affiliationCloud = component; } }
      />
    );

    const factionOptions =
      // eslint-disable-next-line global-require
      require('swdestinydb-json-data/factions.json')
        .map(faction => ({
          code: faction.code,
          name: faction.code.charAt(0).toUpperCase() + faction.code.slice(1),
        }));

    const factionCloud = (
      <FilterCloud
        label={ 'Faction' }
        setting={ 'faction' }
        options={ factionOptions }
        onCallback={ this.updateFilter }
        offCallback={ this.removeFilter }
        ref={ (component) => { this.factionCloud = component; } }
      />
    );

    // eslint-disable-next-line global-require
    const setOptions = require('swdestinydb-json-data/sets.json');

    const setCloud = (
      <FilterCloud
        label={ 'Sets' }
        setting={ 'set' }
        options={ setOptions }
        onCallback={ this.updateFilter }
        offCallback={ this.removeFilter }
        ref={ (component) => { this.setCloud = component; } }
      />
    );

    // eslint-disable-next-line global-require
    const typeOptions = require('swdestinydb-json-data/types.json');

    const typeCloud = (
      <FilterCloud
        label={ 'Types' }
        setting={ 'type' }
        options={ typeOptions }
        onCallback={ this.updateFilter }
        offCallback={ this.removeFilter }
        ref={ (component) => { this.typeCloud = component; } }
      />
    );

    // eslint-disable-next-line global-require
    const subtypeOptions = require('swdestinydb-json-data/subtypes.json');

    subtypeOptions.push({
      code: '',
      name: 'No Subtype',
    });

    const subtypeCloud = (
      <FilterCloud
        label={ 'Subtypes' }
        setting={ 'subtypes' }
        options={ subtypeOptions }
        onCallback={ this.updateFilterList }
        offCallback={ this.removeFilter }
        ref={ (component) => { this.subtypeCloud = component; } }
      />
    );

    const keywordOptions = [{
      code: 'ambush',
      name: 'Ambush',
    }, {
      code: 'guardian',
      name: 'Guardian',
    }, {
      code: 'redeploy',
      name: 'Redeploy',
    }, {
      code: 'unique',
      name: 'Unique',
    }, {
      code: 'none',
      name: 'No Keywords',
    }];

    const keywordCloud = (
      <FilterCloud
        label={ 'Keywords' }
        setting={ 'keywords' }
        options={ keywordOptions }
        onCallback={ this.updateFilterList }
        offCallback={ this.removeFilter }
        ref={ (component) => { this.keywordCloud = component; } }
      />
    );

    // eslint-disable-next-line global-require
    const rarityOptions = require('swdestinydb-json-data/rarities.json');

    const rarityCloud = (
      <FilterCloud
        label={ 'Rarity' }
        setting={ 'rarity' }
        options={ rarityOptions }
        onCallback={ this.updateFilter }
        offCallback={ this.removeFilter }
        ref={ (component) => { this.rarityCloud = component; } }
      />
    );

    return (
      <View style={ styles.container }>
        <ScrollView
          style={ styles.scrollView }
          ref={ (component) => { this.scrollView = component; } }
          contentContainerStyle={ styles.scrollViewContent }
        >
          { affiliationCloud }
          { factionCloud }
          { setCloud }
          { typeCloud }
          { subtypeCloud }
          { keywordCloud }
          { rarityCloud }

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
        { this.renderReset() }
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SettingsScreen;
