import factionsRaw from 'swdestinydb-json-data/factions.json';
import formatsRaw from 'swdestinydb-json-data/formats.json';
import raritiesRaw from 'swdestinydb-json-data/rarities.json';
import subtypesRaw from 'swdestinydb-json-data/subtypes.json';
import typesRaw from 'swdestinydb-json-data/types.json';

export const factions = factionsRaw.map((faction) => ({
  code: faction.code,
  name: faction.code.charAt(0).toUpperCase() + faction.code.slice(1),
}));

export const formats = formatsRaw.reduce(
  (formatsObject, format) => ({
    [format.code]: format,
    ...formatsObject,
  }),
  {},
);

export const rarities = raritiesRaw.reduce(
  (raritiesObject, rarity) => ({
    [rarity.code]: rarity,
    ...raritiesObject,
  }),
  {},
);

export const subtypes = [...subtypesRaw, { code: 'none', name: 'No Subtype' }];

export const types = [...typesRaw].sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }

  if (a.name > b.name) {
    return 1;
  }

  return 0;
});

export {
  default as affiliations,
} from 'swdestinydb-json-data/affiliations.json';
export { default as sets } from 'swdestinydb-json-data/sets.json';
export {
  default as starterPacks,
} from 'swdestinydb-json-data/starterPacks.json';
