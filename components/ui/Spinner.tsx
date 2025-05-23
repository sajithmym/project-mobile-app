import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { THEME } from '../../constants/settings';

// Spinner sizes
type SpinnerSize = 'small' | 'medium' | 'large';

// Spinner props
interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  style?: ViewStyle;
  useActivityIndicator?: boolean;
}

export function Spinner({
  size = 'medium',
  color,
  style,
  useActivityIndicator = false,
}: SpinnerProps) {
  const { isDark } = useTheme();
  
  // Default color based on theme
  const defaultColor = isDark ? THEME.colors.primary[400] : THEME.colors.primary[500];
  const spinnerColor = color || defaultColor;
  
  // Use native ActivityIndicator if specified
  if (useActivityIndicator) {
    const getSize = (): number | 'small' | 'large' => {
      switch (size) {
        case 'small':
          return 'small';
        case 'large':
          return 'large';
        default:
          return 'small';
      }
    };
    
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator size={getSize()} color={spinnerColor} />
      </View>
    );
  }
  
  // Use custom animated spinner
  const rotation = useSharedValue(0);
  const opacity1 = useSharedValue(0.1);
  const opacity2 = useSharedValue(0.3);
  const opacity3 = useSharedValue(0.5);
  
  // Get dot size based on size prop
  const getDotSize = (): number => {
    switch (size) {
      case 'small':
        return 6;
      case 'large':
        return 12;
      default:
        return 8;
    }
  };
  
  // Get spacing based on size prop
  const getSpacing = (): number => {
    switch (size) {
      case 'small':
        return 2;
      case 'large':
        return 6;
      default:
        return 4;
    }
  };
  
  // Start animations
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1, // Infinite
      false
    );
    
    // Animate opacity with delays
    const animate = (value: Animated.SharedValue<number>, delay: number) => {
      'worklet';
      value.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, { duration: 800 }),
          -1, // Infinite
          true // Reverse
        )
      );
    };
    
    animate(opacity1, 0);
    animate(opacity2, 200);
    animate(opacity3, 400);
  }, []);
  
  // Rotation animation style
  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  
  // Opacity animation styles
  const dot1Style = useAnimatedStyle(() => {
    return { opacity: opacity1.value };
  });
  
  const dot2Style = useAnimatedStyle(() => {
    return { opacity: opacity2.value };
  });
  
  const dot3Style = useAnimatedStyle(() => {
    return { opacity: opacity3.value };
  });
  
  const dotSize = getDotSize();
  const spacing = getSpacing();
  
  return (
    <View style={[styles.container, style]}>
      <Animated.View style={rotationStyle}>
        <View style={styles.dotsContainer}>
          <Animated.View
            style={[
              styles.dot,
              { width: dotSize, height: dotSize, marginRight: spacing, backgroundColor: spinnerColor },
              dot1Style,
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              { width: dotSize, height: dotSize, marginRight: spacing, backgroundColor: spinnerColor },
              dot2Style,
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              { width: dotSize, height: dotSize, backgroundColor: spinnerColor },
              dot3Style,
            ]}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: THEME.spacing.m,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: THEME.borderRadius.full,
  },
});