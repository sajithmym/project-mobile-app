import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Platform, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { THEME } from '@/constants/settings';

export default function HomeScreen() {
  const { user } = useAuth();
  const { translate } = useLanguage();
  const { isDark } = useTheme();
  const { width } = useWindowDimensions();
  
  // Responsive layout based on screen width
  const isSmallScreen = width < 768;
  const isMediumScreen = width >= 768 && width < 1024;
  
  // Get text color based on theme
  const getTextColor = () => {
    return isDark ? THEME.colors.text.dark.primary : THEME.colors.text.light.primary;
  };
  
  // Get secondary text color based on theme
  const getSecondaryTextColor = () => {
    return isDark ? THEME.colors.text.dark.secondary : THEME.colors.text.light.secondary;
  };
  
  // Example content for feature cards
  const featureCards = [
    {
      id: '1',
      title: 'Secure Authentication',
      description: 'Firebase authentication with email and password keeps your data secure.',
      color: THEME.colors.primary[500],
    },
    {
      id: '2',
      title: 'Dark Mode Support',
      description: 'Switch between light and dark themes for comfortable viewing in any environment.',
      color: THEME.colors.secondary[500],
    },
    {
      id: '3',
      title: 'Multilingual',
      description: 'Support for multiple languages makes the app accessible to a global audience.',
      color: THEME.colors.accent[500],
    },
  ];
  
  return (
    <AppLayout>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Welcome header */}
        <Animated.View 
          entering={FadeIn.duration(800)}
          style={styles.headerContainer}
        >
          <Text style={[styles.welcomeText, { color: getTextColor() }]}>
            {translate('welcome')}, {user?.displayName || 'User'}!
          </Text>
          <Text style={[styles.subtitle, { color: getSecondaryTextColor() }]}>
            Explore the features of your new app
          </Text>
        </Animated.View>
        
        {/* Features grid */}
        <View style={[
          styles.featuresContainer,
          isSmallScreen ? styles.featuresContainerSmall : 
          isMediumScreen ? styles.featuresContainerMedium : 
          styles.featuresContainerLarge
        ]}>
          {featureCards.map((feature, index) => (
            <Animated.View
              key={feature.id}
              entering={FadeInDown.duration(800).delay(index * 200)}
              style={[
                styles.featureCardWrapper,
                isSmallScreen ? styles.featureCardWrapperSmall : 
                isMediumScreen ? styles.featureCardWrapperMedium : 
                styles.featureCardWrapperLarge
              ]}
            >
              <Card style={styles.featureCard}>
                <View style={[styles.featureHeader, { backgroundColor: feature.color }]}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                </View>
                <Text style={[styles.featureDescription, { color: getSecondaryTextColor() }]}>
                  {feature.description}
                </Text>
              </Card>
            </Animated.View>
          ))}
        </View>
        
        {/* App overview */}
        <Animated.View
          entering={FadeInDown.duration(800).delay(600)}
        >
          <Card style={styles.overviewCard}>
            <Text style={[styles.overviewTitle, { color: getTextColor() }]}>
              About This App
            </Text>
            <Text style={[styles.overviewDescription, { color: getSecondaryTextColor() }]}>
              This React Native application demonstrates a complete authentication flow with Firebase. 
              It features a modern UI design with responsive layouts, dark mode support, and 
              multilingual capabilities.
            </Text>
            <Text style={[styles.overviewDescription, { color: getSecondaryTextColor() }]}>
              Explore the Profile tab to manage your user information and the Settings tab to 
              customize your app experience.
            </Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: THEME.spacing.xl,
  },
  headerContainer: {
    marginVertical: THEME.spacing.xl,
  },
  welcomeText: {
    fontSize: THEME.typography.fontSize.xxl,
    fontFamily: THEME.typography.fontFamily.bold,
    marginBottom: THEME.spacing.xs,
  },
  subtitle: {
    fontSize: THEME.typography.fontSize.m,
    fontFamily: THEME.typography.fontFamily.regular,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: THEME.spacing.l,
  },
  featuresContainerSmall: {
    flexDirection: 'column',
  },
  featuresContainerMedium: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featuresContainerLarge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureCardWrapper: {
    marginBottom: THEME.spacing.m,
  },
  featureCardWrapperSmall: {
    width: '100%',
  },
  featureCardWrapperMedium: {
    width: '48%',
    marginRight: '2%',
  },
  featureCardWrapperLarge: {
    width: '31%',
    marginRight: '2%',
  },
  featureCard: {
    overflow: 'hidden',
    height: 200,
  },
  featureHeader: {
    padding: THEME.spacing.m,
    marginHorizontal: -THEME.spacing.m,
    marginTop: -THEME.spacing.m,
    marginBottom: THEME.spacing.m,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: THEME.typography.fontSize.l,
    fontFamily: THEME.typography.fontFamily.bold,
  },
  featureDescription: {
    fontSize: THEME.typography.fontSize.m,
    fontFamily: THEME.typography.fontFamily.regular,
    lineHeight: THEME.typography.fontSize.m * THEME.typography.lineHeight.body,
  },
  overviewCard: {
    marginTop: THEME.spacing.m,
  },
  overviewTitle: {
    fontSize: THEME.typography.fontSize.xl,
    fontFamily: THEME.typography.fontFamily.bold,
    marginBottom: THEME.spacing.m,
  },
  overviewDescription: {
    fontSize: THEME.typography.fontSize.m,
    fontFamily: THEME.typography.fontFamily.regular,
    lineHeight: THEME.typography.fontSize.m * THEME.typography.lineHeight.body,
    marginBottom: THEME.spacing.m,
  },
});