import Database from './Database';

import Card from './models/Card';

class CardDatabase {
  constructor() {
    this.database = new Database(Card, 'Card');
    this.filterListeners = [];

    this.reset();
  }

  addFilterListener(callback) {
    this.filterListeners.push(callback);
  }

  get(index) {
    return this.results[index] || null;
  }

  count() {
    return this.results.length;
  }

  all() {
    return this.results;
  }

  addFilter(key, query, args) {
    this.filters = this.filters.filter(filter => filter.key !== key);

    this.filters.push({
      key,
      query,
      args,
    });

    return this.filter();
  }

  removeFilter(key) {
    this.filters = this.filters.filter(filter => filter.key !== key);

    return this.filter();
  }

  filter() {
    if (this.filters.length) {
      this.results = this.database.query(this.filters);
    } else {
      this.reset();
    }

    this.filterListeners.forEach(callback => callback(this.results));

    return this.results;
  }

  reset() {
    this.results = this.database.all();
    this.filters = [];

    return this.results;
  }

  findIndex(callback) {
    return this.results.findIndex(callback);
  }

  create(properties, update = false) {
    return this.database.create(properties, update);
  }
}

const cardDatabase = new CardDatabase();

export default cardDatabase;
