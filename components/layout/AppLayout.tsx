import React, { ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../context/ThemeContext';
import { THEME } from '../../constants/settings';

// AppLayout props
interface AppLayoutProps {
  children: ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
  noHorizontalPadding?: boolean;
  noVerticalPadding?: boolean;
  statusBarStyle?: 'auto' | 'light' | 'dark';
}

export function AppLayout({
  children,
  style,
  safeArea = true,
  noHorizontalPadding = false,
  noVerticalPadding = false,
  statusBarStyle = 'auto',
}: AppLayoutProps) {
  const { isDark } = useTheme();
  
  // Get background color based on theme
  const backgroundColor = isDark 
    ? THEME.colors.background.dark 
    : THEME.colors.background.light;
  
  // Container style
  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor,
    paddingHorizontal: noHorizontalPadding ? 0 : THEME.spacing.m,
    paddingVertical: noVerticalPadding ? 0 : THEME.spacing.m,
  };
  
  // Use SafeAreaView on native platforms if safeArea is true
  if (safeArea && Platform.OS !== 'web') {
    return (
      <SafeAreaView style={[styles.container, containerStyle, style]}>
        <StatusBar style={statusBarStyle} />
        {children}
      </SafeAreaView>
    );
  }
  
  return (
    <View style={[styles.container, containerStyle, style]}>
      <StatusBar style={statusBarStyle} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});