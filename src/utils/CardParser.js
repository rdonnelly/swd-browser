import React from 'react';
import SWDIcon from '../components/SWDIcon';

const ICON_REPLACEMENTS = Object.freeze({
  '[blank]': '<icon name="blank"></icon>',
  '[discard]': '<icon name="discard"></icon>',
  '[disrupt]': '<icon name="disrupt"></icon>',
  '[focus]': '<icon name="focus"></icon>',
  '[melee]': '<icon name="melee"></icon>',
  '[ranged]': '<icon name="ranged"></icon>',
  '[indirect]': '<icon name="indirect"></icon>',
  '[shield]': '<icon name="shield"></icon>',
  '[resource]': '<icon name="resource"></icon>',
  '[special]': '<icon name="special"></icon>',
  '[unique]': '<icon name="unique"></icon>',
  '[AW]': '<icon name="aw"></icon>',
  '[SoR]': '<icon name="sor"></icon>',
  '[EaW]': '<icon name="eaw"></icon>',
  '[TPG]': '<icon name="tpg"></icon>',
  '[LEG]': '<icon name="leg"></icon>',
  '[RIV]': '<icon name="riv"></icon>',
});

export default {
  iconRenderer(htmlAttributes) {
    const iconName = htmlAttributes.name || null;

    // TODO hacky way to generate a key
    const rand = Math.floor(Math.random() * 1000);

    return (
      <SWDIcon type={ iconName } key={ `html-icon-${rand}` } />
    );
  },

  replaceIconPlaceholders(text) {
    let newText = text;
    Object.keys(ICON_REPLACEMENTS).forEach((key) => {
      newText = newText.replace(new RegExp(key, 'gi'), ICON_REPLACEMENTS[key]);
    });

    return newText;
  },

  replaceLineBreaks(text) {
    return text.replace(/[\r\n]+/, '<br><br>');
  },
};
