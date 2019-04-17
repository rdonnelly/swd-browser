/* eslint-disable global-require */
import _get from 'lodash/get';
import _findIndex from 'lodash/findIndex';

import Card from './models/Card';


class CardDatabase {
  constructor() {
    this.cards = [];
    this.results = [];

    this.filters = {};
    this.filterListeners = [];
  }

  init() {
    this.cards = [].concat(
      require('swdestinydb-json-data/set/AW.json'),
      require('swdestinydb-json-data/set/SoR.json'),
      require('swdestinydb-json-data/set/EaW.json'),
      require('swdestinydb-json-data/set/TPG.json'),
      require('swdestinydb-json-data/set/LEG.json'),
      require('swdestinydb-json-data/set/RIV.json'),
      require('swdestinydb-json-data/set/WotF.json'),
      require('swdestinydb-json-data/set/AtG.json'),
      require('swdestinydb-json-data/set/CONV.json'),
      require('swdestinydb-json-data/set/AoN.json'),
      require('swdestinydb-json-data/set/SoH.json'),
    ).map((card) => new Card(card));

    this.results = this.cards;
  }

  reset() {
    this.init();
  }

  all() {
    return this.results;
  }

  count() {
    return this.results.length;
  }

  get(index) {
    return _get(this.results, index, null);
  }

  findIndex(id) {
    return _findIndex(this.results, { id });
  }

  find(id) {
    const index = this.findIndex(id);
    return this.get(index);
  }

  addFilterListener(callback) {
    this.filterListeners.push(callback);
  }

  addFilter(key, predicate) {
    this.filters[key] = predicate;

    return this.filter();
  }

  removeFilter(key) {
    delete this.filters[key];
    return this.filter();
  }

  removeAllFilters() {
    this.filters = {};
    return this.filter();
  }

  filter() {
    this.results = this.cards.filter((card) => Object.keys(this.filters).every((key) => {
      if (this.filters[key](card)) {
        return true;
      }

      return false;
    }));

    this.filterListeners.forEach((callback) => callback(this.results));

    return this.results;
  }
}

const cardDatabase = new CardDatabase();

export default cardDatabase;
