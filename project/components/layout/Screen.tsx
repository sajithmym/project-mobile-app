import React, { ReactNode } from 'react';
import { StyleSheet, View, ScrollView, ViewStyle, StyleProp } from 'react-native';
import { spacing } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import SafeAreaWrapper from './SafeAreaWrapper';

interface ScreenProps {
  children: ReactNode;
  scrollable?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  safeAreaEdges?: Array<'top' | 'right' | 'bottom' | 'left'>;
  disableSafeArea?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
}

export default function Screen({
  children,
  scrollable = true,
  paddingHorizontal = spacing.lg,
  paddingVertical = spacing.md,
  style,
  contentContainerStyle,
  safeAreaEdges = ['top', 'right', 'bottom', 'left'],
  disableSafeArea = false,
  keyboardShouldPersistTaps = 'handled',
}: ScreenProps) {
  const { colors } = useTheme();

  const containerStyle = {
    backgroundColor: colors.background,
    paddingHorizontal,
    paddingVertical,
  };

  return (
    <SafeAreaWrapper edges={safeAreaEdges} disableSafeArea={disableSafeArea}>
      {scrollable ? (
        <ScrollView
          style={[styles.scrollView, style]}
          contentContainerStyle={[containerStyle, contentContainerStyle]}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.container, containerStyle, style]}>
          {children}
        </View>
      )}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});