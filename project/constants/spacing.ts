// Following an 8px spacing system
// All spacing values are multiples of 8 or 4 (half-step)

export const spacing = {
  xxs: 2,   // Micro adjustment
  xs: 4,    // Very small spacing
  sm: 8,    // Small spacing
  md: 16,   // Medium spacing
  lg: 24,   // Large spacing
  xl: 32,   // Extra large spacing
  xxl: 40,  // Double extra large spacing
  '3xl': 48, // Triple extra large spacing
  '4xl': 64, // Quadruple extra large spacing
  '5xl': 80, // Quintuple extra large spacing
  '6xl': 96, // Sextuple extra large spacing
};

// Consistent border radius values
export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Consistent shadow values
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

export default {
  spacing,
  borderRadius,
  shadows,
};