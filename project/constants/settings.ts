export const settings = {
  // App configuration
  app: {
    name: 'FirebaseAuth',
    version: '1.0.0',
    description: 'A React Native app with Firebase authentication',
    copyrightYear: new Date().getFullYear(),
  },

  // Firebase configuration
  firebase: {
    // These would come from your firebase console
    // In a real app, these should be in environment variables
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },

  // Secure storage keys
  storage: {
    userToken: 'user_token',
    userInfo: 'user_info',
    theme: 'app_theme',
    language: 'app_language',
  },

  // Animation timing
  animation: {
    fast: 200,
    medium: 300,
    slow: 500,
  },

  // Default user preferences
  defaults: {
    theme: 'system', // 'light', 'dark', or 'system'
    language: 'en', // 'en', 'es', 'fr', 'de', 'ja'
    notifications: true,
  },

  // API endpoints (if any)
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 10000, // 10 seconds
  },

  // Validation constraints
  validation: {
    name: {
      minLength: 2,
      maxLength: 50,
    },
    email: {
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    password: {
      minLength: 6,
      maxLength: 100,
    },
  },

  // User roles and permissions
  roles: {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
  },
  
  // Route paths for navigation
  routes: {
    auth: {
      login: '/(auth)/login',
      signUp: '/(auth)/signup',
      forgotPassword: '/(auth)/forgot-password',
    },
    app: {
      home: '/(tabs)',
      profile: '/(tabs)/profile',
      settings: '/(tabs)/settings',
      actions: '/(tabs)/actions',
    },
  },
};

export default settings;