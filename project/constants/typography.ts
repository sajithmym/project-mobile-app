import { Platform } from 'react-native';

// Define font families with proper web fallbacks
const fontFamilies = {
  regular: Platform.select({
    web: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    default: 'Inter-Regular',
  }),
  medium: Platform.select({
    web: 'Inter-Medium, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    default: 'Inter-Medium',
  }),
  semiBold: Platform.select({
    web: 'Inter-SemiBold, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    default: 'Inter-SemiBold',
  }),
  bold: Platform.select({
    web: 'Inter-Bold, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    default: 'Inter-Bold',
  }),
};

// Define consistent font sizes with their line heights
// Using 8px spacing system, each font size is a multiple of 2
export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
  '6xl': 48,
};

// Define line heights using a factor of the font size
// 150% for body text (1.5), 120% for headings (1.2)
export const lineHeights = {
  xs: fontSizes.xs * 1.5,
  sm: fontSizes.sm * 1.5,
  md: fontSizes.md * 1.5,
  lg: fontSizes.lg * 1.5,
  xl: fontSizes.xl * 1.2,
  '2xl': fontSizes['2xl'] * 1.2,
  '3xl': fontSizes['3xl'] * 1.2,
  '4xl': fontSizes['4xl'] * 1.2,
  '5xl': fontSizes['5xl'] * 1.2,
  '6xl': fontSizes['6xl'] * 1.2,
};

// Typography styles for different text variants
export const typography = {
  headingLarge: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights['4xl'],
    letterSpacing: -0.4,
  },
  headingMedium: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights['3xl'],
    letterSpacing: -0.3,
  },
  headingSmall: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights['2xl'],
    letterSpacing: -0.2,
  },
  titleLarge: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes['xl'],
    lineHeight: lineHeights['xl'],
    letterSpacing: -0.1,
  },
  titleMedium: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    letterSpacing: 0,
  },
  titleSmall: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    letterSpacing: 0,
  },
  caption: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    letterSpacing: 0.2,
  },
  button: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.md,
    lineHeight: fontSizes.md * 1.25, // Custom for buttons
    letterSpacing: 0.2,
  },
  buttonSmall: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * 1.25, // Custom for buttons
    letterSpacing: 0.2,
  },
};

export default {
  ...typography,
  fontFamilies,
  fontSizes,
  lineHeights,
};