import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { STORAGE_KEYS } from '../constants/settings';

// Define theme types
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'system',
  isDark: false,
  setThemeMode: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  // Calculate if the theme is dark based on mode and system preference
  const isDark = themeMode === 'system' 
    ? systemColorScheme === 'dark' 
    : themeMode === 'dark';

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        let savedTheme;
        
        if (Platform.OS === 'web') {
          savedTheme = localStorage.getItem(STORAGE_KEYS.THEME_PREFERENCE);
        } else {
          savedTheme = await SecureStore.getItemAsync(STORAGE_KEYS.THEME_PREFERENCE);
        }
        
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeModeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference
  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(STORAGE_KEYS.THEME_PREFERENCE, mode);
      } else {
        await SecureStore.setItemAsync(STORAGE_KEYS.THEME_PREFERENCE, mode);
      }
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode, isDark, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};