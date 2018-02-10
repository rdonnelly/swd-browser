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

  get faction() {
    return this.card.faction_code;
  }

  get type() {
    return this.card.type_code;
  }

  get subtype() {
    return this.card.subtype_code || '';
  }

  get text() {
    return this.card.text;
  }

  get health() {
    return this.card.health;
  }

  get cost() {
    return this.card.cost;
  }

  get points() {
    return this.card.points;
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
