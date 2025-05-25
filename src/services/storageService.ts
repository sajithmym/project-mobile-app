import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@user_session';

const storageService = {
  saveSession: async (sessionData) => {
    try {
      const jsonValue = JSON.stringify(sessionData);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to save session data:', e);
    }
  },

  getSession: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Failed to retrieve session data:', e);
      return null;
    }
  },

  clearSession: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear session data:', e);
    }
  },
};

export default storageService;