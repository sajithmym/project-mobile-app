import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { 
  Moon, 
  Sun, 
  Monitor, 
  LogOut, 
  Globe, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react-native';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { THEME, LANGUAGES } from '@/constants/settings';

export default function SettingsScreen() {
  const { logout, isLoading } = useAuth();
  const { language, setLanguage, translate } = useLanguage();
  const { themeMode, setThemeMode, isDark } = useTheme();
  
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  
  // Handle logout
  const handleLogout = async () => {
    await logout();
  };
  
  // Handle theme change
  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
  };
  
  // Handle language change
  const handleLanguageChange = (code: 'en' | 'es' | 'fr') => {
    setLanguage(code);
    setLanguageMenuOpen(false);
  };
  
  // Toggle language menu
  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };
  
  // Get text color based on theme
  const getTextColor = () => {
    return isDark ? THEME.colors.text.dark.primary : THEME.colors.text.light.primary;
  };
  
  // Get secondary text color based on theme
  const getSecondaryTextColor = () => {
    return isDark ? THEME.colors.text.dark.secondary : THEME.colors.text.light.secondary;
  };
  
  // Get card color based on theme and active state
  const getCardColor = (isActive: boolean) => {
    if (isActive) {
      return isDark ? THEME.colors.primary[800] : THEME.colors.primary[100];
    }
    return undefined;
  };
  
  // Get card text color based on theme and active state
  const getCardTextColor = (isActive: boolean) => {
    if (isActive) {
      return isDark ? '#FFFFFF' : THEME.colors.primary[900];
    }
    return getTextColor();
  };
  
  return (
    <AppLayout>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Animated.View 
          entering={FadeIn.duration(800)}
          style={styles.header}
        >
          <Text style={[styles.title, { color: getTextColor() }]}>
            {translate('settings')}
          </Text>
        </Animated.View>
        
        {/* Theme settings */}
        <Animated.View 
          entering={FadeInDown.duration(800).delay(200)}
        >
          <Card style={styles.card}>
            <Text style={[styles.sectionTitle, { color: getTextColor() }]}>
              {translate('darkMode')}
            </Text>
            <Text style={[styles.sectionDescription, { color: getSecondaryTextColor() }]}>
              Choose your preferred theme mode
            </Text>
            
            <View style={styles.themeModeContainer}>
              <TouchableOpacity
                style={[
                  styles.themeModeCard,
                  { backgroundColor: getCardColor(themeMode === 'light') }
                ]}
                onPress={() => handleThemeChange('light')}
              >
                <Sun 
                  size={24} 
                  color={getCardTextColor(themeMode === 'light')} 
                  style={styles.themeModeIcon}
                />
                <Text style={[
                  styles.themeModeText,
                  { color: getCardTextColor(themeMode === 'light') }
                ]}>
                  {translate('lightMode')}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.themeModeCard,
                  { backgroundColor: getCardColor(themeMode === 'dark') }
                ]}
                onPress={() => handleThemeChange('dark')}
              >
                <Moon 
                  size={24} 
                  color={getCardTextColor(themeMode === 'dark')} 
                  style={styles.themeModeIcon}
                />
                <Text style={[
                  styles.themeModeText,
                  { color: getCardTextColor(themeMode === 'dark') }
                ]}>
                  {translate('darkMode')}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.themeModeCard,
                  { backgroundColor: getCardColor(themeMode === 'system') }
                ]}
                onPress={() => handleThemeChange('system')}
              >
                <Monitor 
                  size={24} 
                  color={getCardTextColor(themeMode === 'system')} 
                  style={styles.themeModeIcon}
                />
                <Text style={[
                  styles.themeModeText,
                  { color: getCardTextColor(themeMode === 'system') }
                ]}>
                  {translate('systemTheme')}
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </Animated.View>
        
        {/* Language settings */}
        <Animated.View 
          entering={FadeInDown.duration(800).delay(300)}
        >
          <Card style={styles.card}>
            <Text style={[styles.sectionTitle, { color: getTextColor() }]}>
              {translate('language')}
            </Text>
            <Text style={[styles.sectionDescription, { color: getSecondaryTextColor() }]}>
              Choose your preferred language
            </Text>
            
            <TouchableOpacity
              style={[
                styles.languageSelector,
                { borderColor: isDark ? THEME.colors.divider.dark : THEME.colors.divider.light }
              ]}
              onPress={toggleLanguageMenu}
            >
              <View style={styles.languageSelectorContent}>
                <Globe 
                  size={20} 
                  color={isDark ? THEME.colors.text.dark.tertiary : THEME.colors.text.light.tertiary} 
                  style={styles.languageIcon}
                />
                <Text style={[styles.languageText, { color: getTextColor() }]}>
                  {language === 'en' ? translate('english') : 
                   language === 'es' ? translate('spanish') : 
                   translate('french')}
                </Text>
              </View>
              {languageMenuOpen ? 
                <ChevronUp size={20} color={getSecondaryTextColor()} /> :
                <ChevronDown size={20} color={getSecondaryTextColor()} />
              }
            </TouchableOpacity>
            
            {languageMenuOpen && (
              <View style={[
                styles.languageMenu,
                { backgroundColor: isDark ? THEME.colors.card.dark : THEME.colors.card.light }
              ]}>
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    language === 'en' && { 
                      backgroundColor: isDark ? THEME.colors.primary[900] : THEME.colors.primary[50]
                    }
                  ]}
                  onPress={() => handleLanguageChange('en')}
                >
                  <Text style={[
                    styles.languageOptionText,
                    { color: getTextColor() },
                    language === 'en' && { 
                      color: isDark ? THEME.colors.primary[200] : THEME.colors.primary[800],
                      fontFamily: THEME.typography.fontFamily.medium
                    }
                  ]}>
                    {translate('english')}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    language === 'es' && { 
                      backgroundColor: isDark ? THEME.colors.primary[900] : THEME.colors.primary[50]
                    }
                  ]}
                  onPress={() => handleLanguageChange('es')}
                >
                  <Text style={[
                    styles.languageOptionText,
                    { color: getTextColor() },
                    language === 'es' && { 
                      color: isDark ? THEME.colors.primary[200] : THEME.colors.primary[800],
                      fontFamily: THEME.typography.fontFamily.medium
                    }
                  ]}>
                    {translate('spanish')}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    language === 'fr' && { 
                      backgroundColor: isDark ? THEME.colors.primary[900] : THEME.colors.primary[50]
                    }
                  ]}
                  onPress={() => handleLanguageChange('fr')}
                >
                  <Text style={[
                    styles.languageOptionText,
                    { color: getTextColor() },
                    language === 'fr' && { 
                      color: isDark ? THEME.colors.primary[200] : THEME.colors.primary[800],
                      fontFamily: THEME.typography.fontFamily.medium
                    }
                  ]}>
                    {translate('french')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Card>
        </Animated.View>
        
        {/* Logout button */}
        <Animated.View 
          entering={FadeInDown.duration(800).delay(400)}
        >
          <Card style={styles.card}>
            <Button
              title={translate('logout')}
              onPress={handleLogout}
              loading={isLoading}
              variant="danger"
              icon={<LogOut size={20} color="#FFFFFF" />}
            />
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
  header: {
    marginVertical: THEME.spacing.xl,
  },
  title: {
    fontSize: THEME.typography.fontSize.xxl,
    fontFamily: THEME.typography.fontFamily.bold,
    marginBottom: THEME.spacing.m,
  },
  card: {
    marginBottom: THEME.spacing.l,
  },
  sectionTitle: {
    fontSize: THEME.typography.fontSize.l,
    fontFamily: THEME.typography.fontFamily.bold,
    marginBottom: THEME.spacing.xs,
  },
  sectionDescription: {
    fontSize: THEME.typography.fontSize.s,
    fontFamily: THEME.typography.fontFamily.regular,
    marginBottom: THEME.spacing.m,
  },
  themeModeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -THEME.spacing.xs,
  },
  themeModeCard: {
    flex: 1,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: THEME.spacing.m,
    borderRadius: THEME.borderRadius.m,
    margin: THEME.spacing.xs,
  },
  themeModeIcon: {
    marginBottom: THEME.spacing.s,
  },
  themeModeText: {
    fontSize: THEME.typography.fontSize.s,
    fontFamily: THEME.typography.fontFamily.medium,
    textAlign: 'center',
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: THEME.spacing.m,
    borderWidth: 1,
    borderRadius: THEME.borderRadius.m,
  },
  languageSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIcon: {
    marginRight: THEME.spacing.m,
  },
  languageText: {
    fontSize: THEME.typography.fontSize.m,
    fontFamily: THEME.typography.fontFamily.medium,
  },
  languageMenu: {
    marginTop: THEME.spacing.s,
    borderRadius: THEME.borderRadius.m,
    overflow: 'hidden',
  },
  languageOption: {
    padding: THEME.spacing.m,
  },
  languageOptionText: {
    fontSize: THEME.typography.fontSize.m,
    fontFamily: THEME.typography.fontFamily.regular,
  },
});