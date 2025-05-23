import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { THEME } from '../../constants/settings';

// Card props
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  noPadding?: boolean;
}

export function Card({
  children,
  style,
  elevation = 'medium',
  noPadding = false,
}: CardProps) {
  const { isDark } = useTheme();
  
  // Get elevation style based on theme and elevation prop
  const getElevationStyle = (): ViewStyle => {
    if (elevation === 'none') {
      return {};
    }
    
    return isDark
      ? THEME.shadows.dark[elevation]
      : THEME.shadows.light[elevation];
  };
  
  // Get background color based on theme
  const getBackgroundColor = (): string => {
    return isDark ? THEME.colors.card.dark : THEME.colors.card.light;
  };
  
  // Get border color based on theme
  const getBorderColor = (): string => {
    return isDark ? THEME.colors.divider.dark : THEME.colors.divider.light;
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
        getElevationStyle(),
        noPadding && styles.noPadding,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: THEME.borderRadius.m,
    borderWidth: 1,
    padding: THEME.spacing.m,
    ...Platform.select({
      web: {
        transitionProperty: 'all',
        transitionDuration: '200ms',
      },
    }),
  },
  noPadding: {
    padding: 0,
  },
});