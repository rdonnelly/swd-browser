import factionsRaw from 'swdestinydb-json-data/factions.json';
import subtypesRaw from 'swdestinydb-json-data/subtypes.json';

export const factions = factionsRaw.map((faction) => ({
  code: faction.code,
  name: faction.code.charAt(0).toUpperCase() + faction.code.slice(1),
}));

export const subtypes = [...subtypesRaw, { code: '', name: 'No Subtype' }];

export { default as affiliations } from 'swdestinydb-json-data/affiliations.json';
export { default as rarities } from 'swdestinydb-json-data/rarities.json';
export { default as sets } from 'swdestinydb-json-data/sets.json';
export { default as types } from 'swdestinydb-json-data/types.json';

export { default as cardDatabase } from './cardDatabase';
