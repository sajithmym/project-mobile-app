import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Chrome as Home, User, Settings } from 'lucide-react-native';
import { View, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { borderRadius, spacing } from '@/constants';

function TabBarIcon({ name, color }: { name: string; color: string }) {
  const size = 24;
  
  switch (name) {
    case 'home':
      return <Home size={size} color={color} />;
    case 'profile':
      return <User size={size} color={color} />;
    case 'settings':
      return <Settings size={size} color={color} />;
    default:
      return <Home size={size} color={color} />;
  }
}

export default function TabLayout() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60 + insets.bottom,
          backgroundColor: isDark ? colors.neutral[800] : colors.white,
          borderTopColor: colors.border,
          paddingHorizontal: spacing.md,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          height: 60,
        },
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, focused }) => {
          return (
            <Pressable style={styles.tabButton}>
              <Animated.View
                style={[
                  styles.tabIconContainer,
                  {
                    backgroundColor: focused
                      ? isDark
                        ? colors.neutral[700]
                        : colors.primary[50]
                      : 'transparent',
                  },
                ]}
              >
                <TabBarIcon name={route.name} color={color} />
              </Animated.View>
            </Pressable>
          );
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconContainer: {
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});