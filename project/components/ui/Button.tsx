import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle 
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { colors, typography, spacing, borderRadius } from '@/constants';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const { colors: themeColors, isDark } = useTheme();
  const scale = useSharedValue(1);
  
  // Handle press animation
  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };
  
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Determine styles based on variant, size, and state
  const getBackgroundColor = () => {
    if (disabled) return isDark ? colors.neutral[700] : colors.neutral[200];
    
    switch (variant) {
      case 'primary':
        return colors.primary[500];
      case 'secondary':
        return colors.secondary[500];
      case 'outline':
      case 'text':
        return 'transparent';
      default:
        return colors.primary[500];
    }
  };

  const getTextColor = () => {
    if (disabled) return isDark ? colors.neutral[500] : colors.neutral[500];
    
    switch (variant) {
      case 'primary':
      case 'secondary':
        return colors.white;
      case 'outline':
        return colors.primary[500];
      case 'text':
        return colors.primary[500];
      default:
        return colors.white;
    }
  };

  const getBorderColor = () => {
    if (disabled) return isDark ? colors.neutral[700] : colors.neutral[200];
    
    switch (variant) {
      case 'outline':
        return colors.primary[500];
      default:
        return 'transparent';
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: spacing.xs, paddingHorizontal: spacing.md };
      case 'lg':
        return { paddingVertical: spacing.md, paddingHorizontal: spacing.xl };
      default:
        return { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg };
    }
  };

  const getTextStyle = () => {
    switch (size) {
      case 'sm':
        return typography.buttonSmall;
      case 'lg':
        return { ...typography.button, fontSize: typography.fontSizes.lg };
      default:
        return typography.button;
    }
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
          ...getPadding(),
        },
        animatedStyle,
        style,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getTextColor()}
          style={styles.loader}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Animated.View style={styles.iconLeft}>{icon}</Animated.View>
          )}
          <Text
            style={[
              getTextStyle(),
              { color: getTextColor() },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Animated.View style={styles.iconRight}>{icon}</Animated.View>
          )}
        </>
      )}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  loader: {
    marginRight: spacing.xxs,
  },
  iconLeft: {
    marginRight: spacing.xs,
  },
  iconRight: {
    marginLeft: spacing.xs,
  },
});

export default Button;