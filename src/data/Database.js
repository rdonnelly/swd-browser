import Realm from 'realm';

export default class Database {
  constructor(schema, name) {
    this.name = name;
    this.realm = new Realm({ schema: [schema] });
    this.objects = this.realm.objects(name);
  }

  addListener(event, callback) {
    return this.realm.addListener(event, callback);
  }

  create(properties, update = false) {
    try {
      this.realm.write(() => {
        this.realm.create(this.name, properties, update);
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error creating realm object', this.name, properties, update);
    }
  }

  get(index) {
    return this.objects[index];
  }

  all() {
    return this.objects;
  }

  query(querySets) {
    let queryPredicate = '';
    let queryArgs = [];

    querySets.forEach(({ query, args }, index) => {
      if (queryPredicate) {
        queryPredicate += ' AND ';
      }

      queryPredicate += query.replace('$$', `$${index}`);
      queryArgs = [].concat(queryArgs, args);
    });

    return this.objects.filtered(queryPredicate, ...queryArgs);
  }

  find(callback) {
    return this.objects.find(callback);
  }

  findIndex(callback) {
    return this.objects.findIndex(callback);
  }

  count() {
    return this.objects.length;
  }
}
