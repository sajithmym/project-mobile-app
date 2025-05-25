import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';

interface SafeAreaWrapperProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Array<'top' | 'right' | 'bottom' | 'left'>;
  disableSafeArea?: boolean;
}

export default function SafeAreaWrapper({
  children,
  style,
  edges = ['top', 'right', 'bottom', 'left'],
  disableSafeArea = false,
}: SafeAreaWrapperProps) {
  const { colors, isDark } = useTheme();

  // Apply status bar color based on theme
  const statusBarStyle = isDark ? 'light-content' : 'dark-content';
  const statusBarColor = colors.background;

  if (disableSafeArea) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }, style]}>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={statusBarColor}
          translucent={Platform.OS === 'android'}
        />
        {children}
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }, style]}
      edges={edges}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarColor}
        translucent={Platform.OS === 'android'}
      />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});