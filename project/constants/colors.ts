// A comprehensive color system with 6 color ramps plus neutral tones
// Each color has multiple shades for proper hierarchical application

type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export const colors = {
  // Primary colors - Blue family
  primary: {
    50: '#EBF8FF',
    100: '#D1EEFC',
    200: '#A7D8F0',
    300: '#7CC1E4',
    400: '#55AAD4',
    500: '#3994C1',
    600: '#2D749A',
    700: '#255D7B',
    800: '#1B4560',
    900: '#112A3A',
  } as ColorScale,

  // Secondary colors - Purple family
  secondary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  } as ColorScale,

  // Accent colors - Coral family
  accent: {
    50: '#FFF5F5',
    100: '#FED7D7',
    200: '#FEB2B2',
    300: '#FC8181',
    400: '#F56565',
    500: '#E53E3E',
    600: '#C53030',
    700: '#9B2C2C',
    800: '#822727',
    900: '#63171B',
  } as ColorScale,

  // Success colors - Green family
  success: {
    50: '#F0FFF4',
    100: '#C6F6D5',
    200: '#9AE6B4',
    300: '#68D391',
    400: '#48BB78',
    500: '#38A169',
    600: '#2F855A',
    700: '#276749',
    800: '#22543D',
    900: '#1C4532',
  } as ColorScale,

  // Warning colors - Yellow family
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  } as ColorScale,

  // Error colors - Red family
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  } as ColorScale,

  // Neutral colors - Gray family
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  } as ColorScale,

  // Special cases
  transparent: 'transparent',
  current: 'currentColor',
  black: '#000000',
  white: '#FFFFFF',
};

export const lightThemeColors = {
  background: colors.white,
  card: colors.white,
  text: colors.neutral[900],
  textSecondary: colors.neutral[600],
  border: colors.neutral[200],
  notification: colors.accent[500],
  shadow: 'rgba(0, 0, 0, 0.1)',
  inputBackground: colors.neutral[50],
  headerBackground: colors.white,
};

export const darkThemeColors = {
  background: colors.neutral[900],
  card: colors.neutral[800],
  text: colors.white,
  textSecondary: colors.neutral[400],
  border: colors.neutral[700],
  notification: colors.accent[400],
  shadow: 'rgba(0, 0, 0, 0.3)',
  inputBackground: colors.neutral[800],
  headerBackground: colors.neutral[900],
};

export default {
  colors,
  light: lightThemeColors,
  dark: darkThemeColors,
};