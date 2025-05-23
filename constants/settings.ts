import { Platform } from 'react-native';

// App configuration
export const APP_CONFIG = {
  name: 'AuthApp',
  version: '1.0.0',
  description: 'A React Native app with Firebase authentication',
};

// Theme settings
export const THEME = {
  colors: {
    // Primary colors
    primary: {
      50: '#E8EAFF',
      100: '#C0CAFF',
      200: '#99A9FF',
      300: '#7188FF',
      400: '#4A67FF',
      500: '#3366FF', // Primary
      600: '#2952CC',
      700: '#1F3D99',
      800: '#142966',
      900: '#0A1433',
    },
    // Secondary colors
    secondary: {
      50: '#E0FFF8',
      100: '#B3FFE9',
      200: '#85FFDB',
      300: '#57FFCC',
      400: '#2AFABD',
      500: '#00BFA6', // Secondary
      600: '#009985',
      700: '#007264',
      800: '#004C43',
      900: '#002621',
    },
    // Accent colors
    accent: {
      50: '#F3EAFF',
      100: '#E1CDFF',
      200: '#CEAFFF',
      300: '#BB92FF',
      400: '#A874FF',
      500: '#7C4DFF', // Accent
      600: '#633DCC',
      700: '#4A2E99',
      800: '#321E66',
      900: '#190F33',
    },
    // Neutral colors
    neutral: {
      50: '#F7F7F7',
      100: '#E6E6E6',
      200: '#CCCCCC',
      300: '#B3B3B3',
      400: '#999999',
      500: '#808080',
      600: '#666666',
      700: '#4D4D4D',
      800: '#333333',
      900: '#1A1A1A',
    },
    // Feedback colors
    success: {
      light: '#E0FFF0',
      default: '#00C853',
      dark: '#009624',
    },
    warning: {
      light: '#FFF8E0',
      default: '#FFB300',
      dark: '#FF8F00',
    },
    error: {
      light: '#FFE0E0',
      default: '#FF3D00',
      dark: '#DD2C00',
    },
    // Additional colors
    background: {
      light: '#FFFFFF',
      dark: '#121212',
    },
    text: {
      light: {
        primary: '#1A1A1A',
        secondary: '#4D4D4D',
        tertiary: '#808080',
        disabled: '#B3B3B3',
      },
      dark: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0',
        tertiary: '#ABABAB',
        disabled: '#666666',
      },
    },
    card: {
      light: '#FFFFFF',
      dark: '#1E1E1E',
    },
    divider: {
      light: '#E6E6E6',
      dark: '#333333',
    },
  },
  
  // Spacing
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  borderRadius: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  
  // Typography
  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      bold: 'Inter-Bold',
    },
    fontSize: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
      xxxl: 30,
    },
    lineHeight: {
      body: 1.5,    // 150%
      heading: 1.2, // 120%
    },
  },
  
  // Shadows
  shadows: {
    light: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      },
    },
    dark: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
      },
    },
  },
  
  // Animations
  animation: {
    timing: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
  },
};

// Authentication settings
export const AUTH_CONFIG = {
  passwordMinLength: 8,
  sessionExpiration: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  userRoles: {
    USER: 'user',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
  },
  defaultRole: 'user',
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME_PREFERENCE: 'theme_preference',
  LANGUAGE_PREFERENCE: 'language_preference',
};

// API endpoints
export const API_ENDPOINTS = {
  // Add any additional API endpoints here
};

// App routes
export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
  },
  MAIN: {
    HOME: '/',
    PROFILE: '/profile',
    ACTIONS: '/actions',
    SETTINGS: '/settings',
  },
};

// Supported languages
export const LANGUAGES = {
  EN: {
    code: 'en',
    name: 'English',
  },
  ES: {
    code: 'es',
    name: 'Español',
  },
  FR: {
    code: 'fr',
    name: 'Français',
  },
};

// Default language
export const DEFAULT_LANGUAGE = LANGUAGES.EN;

// Platform-specific settings
export const PLATFORM_SETTINGS = {
  isWeb: Platform.OS === 'web',
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};