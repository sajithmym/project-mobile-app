import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { colors, typography, spacing, borderRadius } from '@/constants';
import { Eye, EyeOff } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url';
  multiline?: boolean;
  numberOfLines?: number;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export function TextInput({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  secureTextEntry = false,
  autoCapitalize = 'none',
  autoCorrect = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  leftIcon,
  rightIcon,
  onFocus,
  onBlur,
}: TextInputProps) {
  const { colors: themeColors, isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  
  // Animation values
  const borderColorValue = useSharedValue(0);
  const labelPositionY = useSharedValue(value ? -spacing.lg : 0);
  const labelScale = useSharedValue(value ? 0.85 : 1);
  
  // Animated styles
  const animatedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderColorValue.value,
      [0, 1, 2],
      [
        themeColors.border,
        colors.primary[500],
        colors.error[500],
      ]
    );
    
    return {
      borderColor,
    };
  });
  
  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: labelPositionY.value },
        { scale: labelScale.value }
      ],
    };
  });
  
  // Handle focus and blur
  const handleFocus = () => {
    setIsFocused(true);
    borderColorValue.value = withTiming(1, { duration: 200 });
    if (!value) {
      labelPositionY.value = withTiming(-spacing.lg, { duration: 200 });
      labelScale.value = withTiming(0.85, { duration: 200 });
    }
    onFocus?.();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    if (error) {
      borderColorValue.value = withTiming(2, { duration: 200 });
    } else {
      borderColorValue.value = withTiming(0, { duration: 200 });
    }
    
    if (!value) {
      labelPositionY.value = withTiming(0, { duration: 200 });
      labelScale.value = withTiming(1, { duration: 200 });
    }
    onBlur?.();
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  
  // Effect to update border color when error changes
  React.useEffect(() => {
    if (error) {
      borderColorValue.value = withTiming(2, { duration: 200 });
    } else if (isFocused) {
      borderColorValue.value = withTiming(1, { duration: 200 });
    } else {
      borderColorValue.value = withTiming(0, { duration: 200 });
    }
  }, [error, isFocused, borderColorValue]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Animated.Text
          style={[
            styles.label,
            { color: error ? colors.error[500] : themeColors.textSecondary },
            animatedLabelStyle,
            labelStyle,
          ]}
        >
          {label}
        </Animated.Text>
      )}
      
      <AnimatedView
        style={[
          styles.inputContainer,
          {
            backgroundColor: themeColors.inputBackground,
            borderWidth: 1,
          },
          animatedBorderStyle,
          multiline && styles.multilineContainer,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={isFocused || !label ? placeholder : ''}
          placeholderTextColor={themeColors.textSecondary}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            {
              color: themeColors.text,
              textAlignVertical: multiline ? 'top' : 'center',
              paddingLeft: leftIcon ? spacing.xl : spacing.md,
              paddingRight: rightIcon || secureTextEntry ? spacing.xl : spacing.md,
            },
            inputStyle,
          ]}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={themeColors.textSecondary} />
            ) : (
              <Eye size={20} color={themeColors.textSecondary} />
            )}
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </AnimatedView>
      
      {error && (
        <Text
          style={[
            styles.error,
            { color: colors.error[500] },
            errorStyle,
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    minHeight: 48,
    position: 'relative',
  },
  multilineContainer: {
    minHeight: 100,
    paddingTop: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? spacing.sm : 0,
    ...typography.bodyMedium,
  },
  label: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.md,
    zIndex: 10,
    backgroundColor: 'transparent',
    ...typography.bodyMedium,
  },
  error: {
    marginTop: spacing.xs,
    ...typography.caption,
  },
  leftIcon: {
    position: 'absolute',
    left: spacing.sm,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: spacing.sm,
    zIndex: 1,
  },
});

export default TextInput;