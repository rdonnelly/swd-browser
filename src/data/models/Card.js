class Card {
  get color() {
    return this.faction.toLowerCase();
  }

  get hasDie() {
    return this.has_die;
  }

  get isUnique() {
    return this.is_unique;
  }
}

Card.schema = {
  name: 'Card',
  primaryKey: 'id',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    subtitle: { type: 'string', optional: true },
    set: { type: 'string', indexed: true },

    affiliation: { type: 'string', indexed: true },
    faction: { type: 'string', indexed: true },
    type: { type: 'string', indexed: true },
    subtype: { type: 'string', indexed: true, optional: true },

    text: { type: 'string' },

    has_die: { type: 'bool' },
    health: { type: 'int', optional: true },
    is_unique: { type: 'bool' },
    cost: { type: 'int', optional: true },
    points: { type: 'string', optional: true },
    position: { type: 'int' },
    rarity: { type: 'string' },

    sides: { type: 'string[]', optional: true },
  },
};

export default Card;
