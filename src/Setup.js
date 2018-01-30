/* eslint-disable global-require */

import { cardDatabase } from './data';


export default class Setup {
  static init() {
    const databaseCount = cardDatabase.count();

    if (!databaseCount) {
      Setup.load(require('swdestinydb-json-data/set/AW.json'));
      Setup.load(require('swdestinydb-json-data/set/SoR.json'));
      Setup.load(require('swdestinydb-json-data/set/EaW.json'));
      Setup.load(require('swdestinydb-json-data/set/TPG.json'));
      Setup.load(require('swdestinydb-json-data/set/LEG.json'));
      Setup.load(require('swdestinydb-json-data/set/RIV.json'));
    }
  }

  static load(cards) {
    cards.forEach((card) => {
      cardDatabase.create(
        {
          id: card.code,
          name: card.name,
          subtitle: card.subtitle,
          set: card.set_code,

          affiliation: card.affiliation_code,
          faction: card.faction_code,
          type: card.type_code,
          subtype: card.subtype_code,

          text: card.text || '',

          has_die: card.has_die || false,
          health: card.health,
          is_unique: card.is_unique,
          cost: card.cost,
          points: card.points || null,
          position: card.position,
          rarity: card.rarity_code,

          sides: card.sides || [],
        },
        true, // update!
      );
    });
  }
}
