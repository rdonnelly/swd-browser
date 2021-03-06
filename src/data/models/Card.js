import _isInteger from 'lodash/isInteger';

import { formats, rarities, starterPacks } from '../data';

class Card {
  constructor(card) {
    this.card = card;
  }

  get id() {
    return this.card.code;
  }

  get name() {
    return this.card.name;
  }

  get title() {
    return this.card.name;
  }

  get subtitle() {
    return this.card.subtitle;
  }

  get set() {
    return this.card.set_code;
  }

  get affiliation() {
    return this.card.affiliation_code;
  }

  get displayAffiliation() {
    return (
      this.card.affiliation_code.charAt(0).toUpperCase() +
      this.card.affiliation_code.slice(1)
    );
  }

  get faction() {
    return this.card.faction_code;
  }

  get displayFaction() {
    return (
      this.card.faction_code.charAt(0).toUpperCase() +
      this.card.faction_code.slice(1)
    );
  }

  get type() {
    return this.card.type_code;
  }

  get displayType() {
    return (
      this.card.type_code.charAt(0).toUpperCase() + this.card.type_code.slice(1)
    );
  }

  get subtypes() {
    return this.card.subtypes || [];
  }

  get text() {
    return this.card.text;
  }

  get health() {
    return _isInteger(this.card.health) ? this.card.health : null;
  }

  get cost() {
    return _isInteger(this.card.cost) ? this.card.cost : null;
  }

  get points() {
    if (!this.card.points) {
      return null;
    }

    return this.card.points;
  }

  get formats() {
    const sets = [];
    Object.values(formats).forEach((format) => {
      if (format.data.sets.includes(this.card.set_code)) {
        sets.push(format.code);
      }
    });
    return sets;
  }

  get pointsPerFormat() {
    return {
      printed: this.card.points,
      inf: formats.INF.data.balance[this.card.code] || this.card.points,
      std: formats.STD.data.balance[this.card.code] || this.card.points,
      tri: formats.TRI.data.balance[this.card.code] || this.card.points,
    };
  }

  get position() {
    return this.card.code.slice(2).replace(/^0+/, '');
  }

  get rarity() {
    return this.card.rarity_code;
  }

  get displayRarity() {
    return rarities[this.card.rarity_code].name;
  }

  get isUnique() {
    return this.card.is_unique;
  }

  get hasDie() {
    return this.card.has_die;
  }

  get sides() {
    return this.card.sides;
  }

  get hasErrata() {
    return this.card.has_errata;
  }

  get hasBalance() {
    return (
      this.card.code in formats.INF.data.balance ||
      this.card.code in formats.STD.data.balance ||
      this.card.code in formats.TRI.data.balance
    );
  }

  get reprintOf() {
    return this.card.reprint_of || null;
  }

  get starterSets() {
    const starters = starterPacks
      .filter((starter) => this.card.code in starter.slots)
      .map((starter) => starter.name);

    return starters.length ? starters : null;
  }

  get keywords() {
    const keywords = [];

    if (/Ambush\.|Ambush keyword/gi.test(this.card.text)) {
      keywords.push('ambush');
    }
    if (/Guardian\.|Guardian keyword/gi.test(this.card.text)) {
      keywords.push('guardian');
    }
    if (/Redeploy\.|Redeploy keyword/gi.test(this.card.text)) {
      keywords.push('redeploy');
    }
    if (this.card.is_unique) {
      keywords.push('unique');
    }

    return keywords;
  }
}

export default Card;
