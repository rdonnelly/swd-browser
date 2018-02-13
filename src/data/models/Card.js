import _isInteger from 'lodash/isInteger';

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
    return this.card.affiliation_code.charAt(0).toUpperCase() + this.card.affiliation_code.slice(1);
  }

  get faction() {
    return this.card.faction_code;
  }

  get type() {
    return this.card.type_code;
  }

  get displayType() {
    return this.card.type_code.charAt(0).toUpperCase() + this.card.type_code.slice(1);
  }

  get subtype() {
    return this.card.subtype_code || '';
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
    return this.card.points || null;
  }

  get pointsRegular() {
    const pointsSplit = this.card.points.split('/').map(v => parseInt(v, 10));
    return pointsSplit[0];
  }

  get pointsElite() {
    const pointsSplit = this.card.points.split('/').map(v => parseInt(v, 10));
    return pointsSplit[1];
  }

  get position() {
    return this.card.position;
  }

  get rarity() {
    return this.card.rarity_code;
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

  get reprintOf() {
    return this.card.reprint_of;
  }

  get keywords() {
    const keywords = [];

    if (/Ambush\./.test(this.card.text)) {
      keywords.push('ambush');
    }
    if (/Guardian\./.test(this.card.text)) {
      keywords.push('guardian');
    }
    if (/Redeploy\./.test(this.card.text)) {
      keywords.push('redeploy');
    }

    return keywords;
  }
}

export default Card;
