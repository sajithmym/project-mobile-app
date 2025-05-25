export * from './colors';
export * from './typography';
export * from './spacing';
export * from './strings';
export * from './settings';

import colorStyles from './colors';
import typographyStyles from './typography';
import spacingStyles from './spacing';
import stringValues from './strings';
import settingValues from './settings';

export default {
  colors: colorStyles,
  typography: typographyStyles,
  spacing: spacingStyles,
  strings: stringValues,
  settings: settingValues,
};