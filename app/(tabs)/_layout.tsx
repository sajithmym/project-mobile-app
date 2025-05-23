import React from 'react';
import { Tabs } from 'expo-router';
import { Home, User, Settings } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { THEME } from '@/constants/settings';
import { useAuth } from '@/context/AuthContext';

// Animated Tabs component for smooth transitions
const AnimatedTabs = Animated.createAnimatedComponent(Tabs);

export default function TabLayout() {
  const { isDark } = useTheme();
  const { translate } = useLanguage();
  const { user } = useAuth();
  
  // Redirect to login if not authenticated
  if (!user) {
    return null;
  }
  
  // Tab bar styles based on theme
  const tabBarStyle = {
    backgroundColor: isDark ? THEME.colors.card.dark : THEME.colors.card.light,
    borderTopColor: isDark ? THEME.colors.divider.dark : THEME.colors.divider.light,
    ...Platform.select({
      web: {
        boxShadow: isDark 
          ? '0 -2px 10px rgba(0, 0, 0, 0.2)' 
          : '0 -2px 10px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: isDark ? 0.2 : 0.1,
        shadowRadius: 3,
      },
    }),
  };

  return (
    <AnimatedTabs
      entering={FadeIn.duration(300)}
      screenOptions={{
        tabBarActiveTintColor: THEME.colors.primary[500],
        tabBarInactiveTintColor: isDark 
          ? THEME.colors.text.dark.tertiary 
          : THEME.colors.text.light.tertiary,
        tabBarStyle: tabBarStyle,
        tabBarLabelStyle: {
          fontFamily: THEME.typography.fontFamily.medium,
          fontSize: THEME.typography.fontSize.xs,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: translate('home'),
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: translate('profile'),
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: translate('settings'),
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </AnimatedTabs>
  );
}