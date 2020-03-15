import _has from 'lodash/has';

export const setCodes = {
  BLANK: '004A',
  DISCARD: '0047',
  DISRUPT: '0046',
  FOCUS: '0048',
  INDIRECT: '0043',
  MELEE: '0041',
  RANGED: '0042',
  RESOURCE: '0045',
  SHIELD: '0044',
  SPECIAL: '0049',
  UNIQUE: '000C',

  AW: '004B',
  AWAKENINGS: '004B',
  SoR: '004C',
  SOR: '004C',
  SPIRIT_OF_REBELLION: '004C',
  TPG: '004E',
  TWO_PLAYER_GAME: '004E',
  EaW: '004D',
  EAW: '004D',
  EMPIRE_AT_WAR: '004D',
  LEG: '004F',
  LEGACIES: '004F',
  RIV: '0050',
  RIVALS: '0050',
  WotF: '0051',
  WOTF: '0051',
  WAY_OF_THE_FORCE: '0051',
  AtG: '0052',
  ATG: '0052',
  ACROSS_THE_GALAXY: '0052',
  CONV: '0053',
  CONVERGENCE: '0053',
  AoN: '0054',
  AON: '0054',
  ALLIES_OF_NECESSITY: '0054',
  SoH: '0055',
  SOH: '0055',
  SPARK_OF_HOPE: '0055',
  CM: '0056',
  COVERT_MISSIONS: '0056',
};

export const typeCodes = {
  BATTLEFIELD: 'e947',
  CARDS: 'e90b',
  CHARACTER: 'e971',
  COLLECTORS: 'e90c',
  DIE: 'e90a',
  DOWNGRADE: 'e95e',
  EVENT: 'e9b5',
  PLOT: 'e912',
  SUPPORT: 'e9b4',
  UNIQUE: 'e909',
  UPGRADE: 'e916',
};

export const validateSetCode = (code) => _has(setCodes, code);
export const validateTypeCode = (code) => _has(typeCodes, code);
