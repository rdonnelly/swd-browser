import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import SafariView from 'react-native-safari-view';

import FilterCloud from '../components/FilterCloud';

import {
  cardDatabase,
  affiliations,
  factions,
  rarities,
  sets,
  subtypes,
  types,
} from '../data';

import { base, colors } from '../styles';

const styles = StyleSheet.create({
  container: {
    ...base.container,
    backgroundColor: colors.lightGray,
  },
  scrollViewContent: {
    paddingBottom: 76,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  floatingControls: {
    ...base.floatingControls,
  },
  floatingControlsButton: {
    ...base.button,
  },
  floatingControlsButtonText: {
    ...base.buttonText,
  },
  information: {
    borderColor: colors.lightGrayDark,
    borderTopWidth: StyleSheet.hairlineWidth,
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

    SafariView.addEventListener('onShow', () => {
      StatusBar.setBarStyle('dark-content');
    });

    SafariView.addEventListener('onDismiss', () => {
      StatusBar.setBarStyle('light-content');
    });

    if (props.navigation) {
      props.navigation.setParams({
        resetScreen: this.resetScreen,
      });
    }
  }

  static visitWebpage() {
    SafariView.show({
      tintColor: colors.headerBackground,
      url: 'http://rdonnelly.com',
    });
  }

  resetScreen = () => {
    if (this.scrollView) {
      this.scrollView.scrollTo({ y: 0 });
    }
  };

  updateFilter = (setting, values) => {
    const key = `filter_${setting}`;
    const predicate =
      (card) => {
        const filterValues = Object.keys(values).filter((k) => values[k]);
        if (Array.isArray(card[setting])) {
          if (values.length === 0) {
            return false;
          }

          if (card[setting].length === 0 && filterValues.includes('none')) {
            return true;
          }

          return filterValues.some((value) => card[setting].includes(value));
        }

        return filterValues.includes(card[setting]);
      };

    cardDatabase.addFilter(key, predicate);
  };

  removeAllFilters = () => {
    Alert.alert('Reset Filters?', 'This will reset all filters. Are you sure you want to continue?', [
      { text: 'Cancel' },
      {
        text: 'Reset',
        onPress: () => {
          ReactNativeHapticFeedback.trigger('impactHeavy');

          cardDatabase.removeAllFilters();

          this.affiliationCloud.reset();
          this.factionCloud.reset();
          this.setCloud.reset();
          this.typeCloud.reset();
          this.subtypeCloud.reset();
          this.keywordCloud.reset();
          this.rarityCloud.reset();

          this.resetScreen();
        },
        style: 'destructive',
      },
    ]);
  };

  renderReset = () => (
    <View style={styles.floatingControls}>
      <TouchableOpacity onPress={this.removeAllFilters} style={styles.floatingControlsButton}>
        <Text style={styles.floatingControlsButtonText}>Reset Filters</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const affiliationCloud = (
      <FilterCloud
        label={'Affiliation'}
        setting={'affiliation'}
        options={affiliations}
        callback={this.updateFilter}
        ref={(component) => {
          this.affiliationCloud = component;
        }}
      />
    );

    const factionCloud = (
      <FilterCloud
        label={'Faction'}
        setting={'faction'}
        options={factions}
        callback={this.updateFilter}
        ref={(component) => {
          this.factionCloud = component;
        }}
      />
    );

    const setCloud = (
      <FilterCloud
        label={'Sets'}
        setting={'set'}
        options={sets}
        callback={this.updateFilter}
        ref={(component) => {
          this.setCloud = component;
        }}
      />
    );

    const typeCloud = (
      <FilterCloud
        label={'Types'}
        setting={'type'}
        options={types}
        callback={this.updateFilter}
        ref={(component) => {
          this.typeCloud = component;
        }}
      />
    );

    const subtypeCloud = (
      <FilterCloud
        label={'Subtypes'}
        setting={'subtypes'}
        options={subtypes}
        callback={this.updateFilter}
        ref={(component) => {
          this.subtypeCloud = component;
        }}
      />
    );

    const keywordOptions = [
      {
        code: 'ambush',
        name: 'Ambush',
      },
      {
        code: 'guardian',
        name: 'Guardian',
      },
      {
        code: 'redeploy',
        name: 'Redeploy',
      },
      {
        code: 'unique',
        name: 'Unique',
      },
      {
        code: 'none',
        name: 'No Keywords',
      },
    ];

    const keywordCloud = (
      <FilterCloud
        label={'Keywords'}
        setting={'keywords'}
        options={keywordOptions}
        callback={this.updateFilter}
        ref={(component) => {
          this.keywordCloud = component;
        }}
      />
    );

    const rarityCloud = (
      <FilterCloud
        label={'Rarity'}
        setting={'rarity'}
        options={Object.values(rarities).reverse()}
        callback={this.updateFilter}
        ref={(component) => {
          this.rarityCloud = component;
        }}
      />
    );

    return (
      <View style={styles.container}>
        <ScrollView
          ref={(component) => {
            this.scrollView = component;
          }}
          contentContainerStyle={styles.scrollViewContent}
        >
          {affiliationCloud}
          {factionCloud}
          {setCloud}
          {typeCloud}
          {subtypeCloud}
          {keywordCloud}
          {rarityCloud}

          <View style={styles.information}>
            <Text style={styles.disclaimerText}>
              The information presented in this app about Star Wars Destiny,
              both literal and graphical, is copyrighted by Fantasy Flight
              Games. This app is not produced by, endorsed by, supported by,
              or affiliated with Fantasy Flight Games.
            </Text>
          </View>

          <View style={styles.information}>
            <TouchableOpacity onPress={SettingsScreen.visitWebpage}>
              <Text style={styles.linkText}>Designed and Developed by</Text>
              <Text style={styles.linkText}>Ryan Donnelly</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {this.renderReset()}
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SettingsScreen;
