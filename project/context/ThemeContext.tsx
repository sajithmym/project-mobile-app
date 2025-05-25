import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { settings, lightThemeColors, darkThemeColors } from '@/constants';

export type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  colors: typeof lightThemeColors | typeof darkThemeColors;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  colors: lightThemeColors,
  setTheme: () => {},
  isDark: false,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeType>('system');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await SecureStore.getItemAsync(settings.storage.theme);
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeState(savedTheme as ThemeType);
        } else {
          // Default to system
          setThemeState('system');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      } finally {
        setIsInitialized(true);
      }
    }

    loadTheme();
  }, []);

  // Determine if we're in dark mode based on theme choice and system setting
  const isDark = 
    theme === 'dark' || 
    (theme === 'system' && systemColorScheme === 'dark');

  // Get the right color set based on dark mode state
  const colors = isDark ? darkThemeColors : lightThemeColors;

  // Set and save theme preference
  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      await SecureStore.setItemAsync(settings.storage.theme, newTheme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Don't render anything until we've loaded the saved theme
  if (!isInitialized) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}