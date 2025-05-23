import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { THEME } from '../../constants/settings';

// Input props
interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  onBlur?: () => void;
  onFocus?: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  style,
  inputStyle,
  labelStyle,
  onBlur,
  onFocus,
  icon,
  iconPosition = 'left',
}: InputProps) {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const focusAnim = useSharedValue(0);

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withTiming(1, { duration: 200 });
    onFocus && onFocus();
  };

  // Handle blur
  const handleBlur = () => {
    setIsFocused(false);
    focusAnim.value = withTiming(0, { duration: 200 });
    onBlur && onBlur();
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Animated border color
  const borderStyle = useAnimatedStyle(() => {
    const borderColor = isDark
      ? interpolateColor(
          focusAnim.value,
          [0, 1],
          [THEME.colors.neutral[600], THEME.colors.primary[400]]
        )
      : interpolateColor(
          focusAnim.value,
          [0, 1],
          [THEME.colors.neutral[300], THEME.colors.primary[500]]
        );

    return {
      borderColor,
    };
  });

  // Helper function for color interpolation
  function interpolateColor(
    value: number,
    inputRange: number[],
    outputRange: string[]
  ) {
    // Simple interpolation for demo
    return value === 0 ? outputRange[0] : outputRange[1];
  }

  // Container style based on state
  const getContainerStyle = () => {
    let containerStyle: ViewStyle = {
      ...styles.container,
    };

    if (error) {
      containerStyle.borderColor = THEME.colors.error.default;
    } else if (disabled) {
      containerStyle.borderColor = isDark
        ? THEME.colors.neutral[700]
        : THEME.colors.neutral[300];
      containerStyle.backgroundColor = isDark
        ? THEME.colors.neutral[800]
        : THEME.colors.neutral[100];
      containerStyle.opacity = 0.7;
    }

    return containerStyle;
  };

  // Text color based on theme
  const getTextColor = (): TextStyle => {
    if (disabled) {
      return {
        color: isDark
          ? THEME.colors.text.dark.disabled
          : THEME.colors.text.light.disabled,
      };
    }

    return {
      color: isDark
        ? THEME.colors.text.dark.primary
        : THEME.colors.text.light.primary,
    };
  };

  // Placeholder color based on theme
  const getPlaceholderColor = () => {
    return isDark
      ? THEME.colors.text.dark.tertiary
      : THEME.colors.text.light.tertiary;
  };

  return (
    <View style={style}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: isDark ? THEME.colors.text.dark.secondary : THEME.colors.text.light.secondary },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <Animated.View
        style={[
          getContainerStyle(),
          !error && !disabled && borderStyle,
          multiline && styles.multiline,
        ]}
      >
        {icon && iconPosition === 'left' && (
          <View style={styles.iconContainer}>{icon}</View>
        )}
        <TextInput
          style={[
            styles.input,
            getTextColor(),
            icon && iconPosition === 'left' && styles.inputWithLeftIcon,
            (secureTextEntry || icon) && iconPosition === 'right' && styles.inputWithRightIcon,
            multiline && styles.multilineInput,
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={getPlaceholderColor()}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          maxLength={maxLength}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={togglePasswordVisibility}
            disabled={disabled}
          >
            {isPasswordVisible ? (
              <EyeOff
                size={20}
                color={isDark ? THEME.colors.text.dark.tertiary : THEME.colors.text.light.tertiary}
              />
            ) : (
              <Eye
                size={20}
                color={isDark ? THEME.colors.text.dark.tertiary : THEME.colors.text.light.tertiary}
              />
            )}
          </TouchableOpacity>
        )}
        {icon && iconPosition === 'right' && !secureTextEntry && (
          <View style={styles.iconContainer}>{icon}</View>
        )}
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: THEME.borderRadius.m,
    backgroundColor: 'transparent',
    paddingHorizontal: THEME.spacing.m,
  },
  multiline: {
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    paddingVertical: THEME.spacing.m,
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: THEME.typography.fontSize.m,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  inputWithLeftIcon: {
    paddingLeft: THEME.spacing.s,
  },
  inputWithRightIcon: {
    paddingRight: THEME.spacing.s,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  label: {
    fontFamily: THEME.typography.fontFamily.medium,
    fontSize: THEME.typography.fontSize.s,
    marginBottom: THEME.spacing.xs,
  },
  error: {
    fontFamily: THEME.typography.fontFamily.regular,
    fontSize: THEME.typography.fontSize.s,
    color: THEME.colors.error.default,
    marginTop: THEME.spacing.xs,
  },
  iconContainer: {
    padding: THEME.spacing.xs,
  },
});