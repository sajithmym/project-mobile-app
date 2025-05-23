import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  interpolate, 
} from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { THEME } from '../../constants/settings';

// Animated TouchableOpacity
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// Button variants
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

// Button sizes
type ButtonSize = 'small' | 'medium' | 'large';

// Button props
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const { isDark } = useTheme();
  const scale = useSharedValue(1);
  
  // Button press animation
  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };
  
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Get styles based on variant, size, and theme
  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...(fullWidth && styles.fullWidth),
    };
    
    // Size styles
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      small: styles.buttonSmall,
      medium: styles.buttonMedium,
      large: styles.buttonLarge,
    };
    
    // Variant styles based on theme
    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: THEME.colors.primary[500],
        borderColor: THEME.colors.primary[500],
      },
      secondary: {
        backgroundColor: THEME.colors.secondary[500],
        borderColor: THEME.colors.secondary[500],
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: isDark ? THEME.colors.neutral[400] : THEME.colors.neutral[300],
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      danger: {
        backgroundColor: THEME.colors.error.default,
        borderColor: THEME.colors.error.default,
      },
    };
    
    // Disabled styles
    const disabledStyle: ViewStyle = {
      backgroundColor: isDark ? THEME.colors.neutral[700] : THEME.colors.neutral[200],
      borderColor: isDark ? THEME.colors.neutral[700] : THEME.colors.neutral[200],
      opacity: 0.7,
    };
    
    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...(disabled ? disabledStyle : variantStyles[variant]),
    };
  };
  
  // Get text styles based on variant, size, and theme
  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = styles.text;
    
    // Size styles
    const sizeStyles: Record<ButtonSize, TextStyle> = {
      small: styles.textSmall,
      medium: styles.textMedium,
      large: styles.textLarge,
    };
    
    // Variant styles based on theme
    const variantTextStyles: Record<ButtonVariant, TextStyle> = {
      primary: {
        color: '#FFFFFF',
      },
      secondary: {
        color: '#FFFFFF',
      },
      outline: {
        color: isDark ? THEME.colors.text.dark.primary : THEME.colors.text.light.primary,
      },
      ghost: {
        color: isDark ? THEME.colors.text.dark.primary : THEME.colors.text.light.primary,
      },
      danger: {
        color: '#FFFFFF',
      },
    };
    
    // Disabled text style
    const disabledTextStyle: TextStyle = {
      color: isDark ? THEME.colors.text.dark.disabled : THEME.colors.text.light.disabled,
    };
    
    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...(disabled ? disabledTextStyle : variantTextStyles[variant]),
    };
  };

  // Render loading indicator
  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          size="small" 
          color={
            variant === 'outline' || variant === 'ghost'
              ? (isDark ? THEME.colors.text.dark.primary : THEME.colors.text.light.primary)
              : '#FFFFFF'
          } 
        />
      );
    }
    
    return (
      <>
        {icon && iconPosition === 'left' && icon}
        <Text style={[getTextStyles(), textStyle, icon && (iconPosition === 'left' ? styles.textWithLeftIcon : styles.textWithRightIcon)]}>
          {title}
        </Text>
        {icon && iconPosition === 'right' && icon}
      </>
    );
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[getButtonStyles(), animatedStyle, style]}
      activeOpacity={0.8}
    >
      {renderContent()}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: THEME.borderRadius.m,
    borderWidth: 1,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
        transitionProperty: 'all',
        transitionDuration: '200ms',
      },
    }),
  },
  buttonSmall: {
    paddingVertical: THEME.spacing.xs,
    paddingHorizontal: THEME.spacing.m,
    minHeight: 36,
  },
  buttonMedium: {
    paddingVertical: THEME.spacing.s,
    paddingHorizontal: THEME.spacing.l,
    minHeight: 44,
  },
  buttonLarge: {
    paddingVertical: THEME.spacing.m,
    paddingHorizontal: THEME.spacing.xl,
    minHeight: 52,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontFamily: THEME.typography.fontFamily.medium,
    textAlign: 'center',
  },
  textSmall: {
    fontSize: THEME.typography.fontSize.s,
  },
  textMedium: {
    fontSize: THEME.typography.fontSize.m,
  },
  textLarge: {
    fontSize: THEME.typography.fontSize.l,
  },
  textWithLeftIcon: {
    marginLeft: THEME.spacing.s,
  },
  textWithRightIcon: {
    marginRight: THEME.spacing.s,
  },
});