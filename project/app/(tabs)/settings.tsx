import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Screen from '../../components/layout/Screen';
import Button from '../../components/ui/Button';
import { typography, spacing, strings, shadows, borderRadius, settings as appSettings } from '../../constants';
import { Moon, Sun, Globe, Bell, LogOut, Info, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';

const SettingsItem = ({ icon, title, value, onPress, showChevron = true, rightElement }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.settingsItem,
        { borderBottomColor: colors.border },
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingsItemLeft}>
        <View style={[styles.settingsItemIcon, { backgroundColor: colors.primary[50] }]}>
          {icon}
        </View>
        <Text style={[styles.settingsItemTitle, { color: colors.text }]}>
          {title}
        </Text>
      </View>
      
      <View style={styles.settingsItemRight}>
        {value && (
          <Text style={[styles.settingsItemValue, { color: colors.textSecondary }]}>
            {value}
          </Text>
        )}
        
        {rightElement}
        
        {showChevron && onPress && (
          <ChevronRight size={18} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const { colors, theme, setTheme, isDark } = useTheme();
  const [language, setLanguage] = useState('English');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // Handle theme change
  const handleThemeChange = () => {
    Alert.alert(
      strings.app.settings.appearance.title,
      'Choose your preferred theme',
      [
        {
          text: strings.app.settings.appearance.light,
          onPress: () => setTheme('light'),
        },
        {
          text: strings.app.settings.appearance.dark,
          onPress: () => setTheme('dark'),
        },
        {
          text: strings.app.settings.appearance.system,
          onPress: () => setTheme('system'),
        },
        {
          text: strings.common.cancel,
          style: 'cancel',
        },
      ]
    );
  };
  
  // Handle language change
  const handleLanguageChange = () => {
    Alert.alert(
      strings.app.settings.languages.title,
      'Choose your preferred language',
      [
        {
          text: strings.app.settings.languages.english,
          onPress: () => setLanguage('English'),
        },
        {
          text: strings.app.settings.languages.spanish,
          onPress: () => setLanguage('Spanish'),
        },
        {
          text: strings.app.settings.languages.french,
          onPress: () => setLanguage('French'),
        },
        {
          text: strings.app.settings.languages.german,
          onPress: () => setLanguage('German'),
        },
        {
          text: strings.common.cancel,
          style: 'cancel',
        },
      ]
    );
  };
  
  // Handle notifications toggle
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };
  
  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: signOut,
          style: 'destructive',
        },
      ]
    );
  };
  
  // Get current theme text
  const getThemeText = () => {
    switch (theme) {
      case 'light':
        return strings.app.settings.appearance.light;
      case 'dark':
        return strings.app.settings.appearance.dark;
      default:
        return strings.app.settings.appearance.system;
    }
  };
  
  return (
    <Screen style={styles.container}>
      <Animated.View 
        entering={FadeInDown.delay(100).duration(500)}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {strings.app.settings.title}
        </Text>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInUp.delay(200).duration(500)}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {strings.app.settings.preferences}
        </Text>
        
        <View
          style={[
            styles.settingsCard,
            {
              backgroundColor: colors.card,
              ...shadows.sm,
            },
          ]}
        >
          <SettingsItem
            icon={isDark ? <Moon size={20} color={colors.primary[600]} /> : <Sun size={20} color={colors.primary[600]} />}
            title={strings.app.settings.theme}
            value={getThemeText()}
            onPress={handleThemeChange}
          />
          
          <SettingsItem
            icon={<Globe size={20} color={colors.primary[600]} />}
            title={strings.app.settings.language}
            value={language}
            onPress={handleLanguageChange}
          />
          
          <SettingsItem
            icon={<Bell size={20} color={colors.primary[600]} />}
            title={strings.app.settings.notifications}
            showChevron={false}
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: colors.neutral[300], true: colors.primary[400] }}
                thumbColor={notificationsEnabled ? colors.primary[600] : colors.neutral[100]}
              />
            }
          />
        </View>
      </Animated.View>
      
      <Animated.View 
        entering={FadeInUp.delay(300).duration(500)}
        style={styles.sectionContainer}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {strings.app.settings.about}
        </Text>
        
        <View
          style={[
            styles.settingsCard,
            {
              backgroundColor: colors.card,
              ...shadows.sm,
            },
          ]}
        >
          <SettingsItem
            icon={<Info size={20} color={colors.primary[600]} />}
            title="App Version"
            value={appSettings.app.version}
            showChevron={false}
          />
        </View>
      </Animated.View>
      
      <View style={styles.footerContainer}>
        <Button
          title={strings.app.settings.logout}
          onPress={handleLogout}
          variant="outline"
          icon={<LogOut size={20} color={colors.error[500]} />}
          textStyle={{ color: colors.error[500] }}
          style={[styles.logoutButton, { borderColor: colors.error[500] }]}
        />
        
        <Text style={[styles.copyright, { color: colors.textSecondary }]}>
          © {appSettings.app.copyrightYear} {appSettings.app.name}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: spacing.xl,
  },
  headerTitle: {
    ...typography.headingMedium,
  },
  sectionContainer: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.titleMedium,
    marginBottom: spacing.md,
  },
  settingsCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingsItemTitle: {
    ...typography.bodyMedium,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemValue: {
    ...typography.bodySmall,
    marginRight: spacing.sm,
  },
  footerContainer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    marginBottom: spacing.md,
  },
  copyright: {
    ...typography.caption,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
});