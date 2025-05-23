import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  FadeInUp 
} from 'react-native-reanimated';
import { Mail, Lock } from 'lucide-react-native';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { THEME } from '@/constants/settings';

export default function LoginScreen() {
  const { signIn, error: authError, isLoading, clearError } = useAuth();
  const { translate } = useLanguage();
  const { isDark } = useTheme();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Handle login
  const handleLogin = async () => {
    // Clear previous errors
    setError(null);
    clearError();
    
    // Validate inputs
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    // Attempt login
    await signIn(email, password);
  };
  
  // Get text color based on theme
  const getTextColor = () => {
    return isDark ? THEME.colors.text.dark.primary : THEME.colors.text.light.primary;
  };
  
  // Get secondary text color based on theme
  const getSecondaryTextColor = () => {
    return isDark ? THEME.colors.text.dark.secondary : THEME.colors.text.light.secondary;
  };

  return (
    <AppLayout>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Logo and welcome text */}
            <Animated.View 
              entering={FadeIn.duration(800)}
              style={styles.header}
            >
              <Text style={[styles.title, { color: getTextColor() }]}>
                {translate('welcome')}
              </Text>
              <Text style={[styles.subtitle, { color: getSecondaryTextColor() }]}>
                {translate('login')} to continue
              </Text>
            </Animated.View>
            
            {/* Login form */}
            <Animated.View entering={FadeInDown.duration(800).delay(200)}>
              <Card style={styles.card}>
                {/* Error messages */}
                {(error || authError) && (
                  <Animated.View 
                    entering={FadeInUp.duration(300)}
                    style={styles.errorContainer}
                  >
                    <Text style={styles.errorText}>{error || authError}</Text>
                  </Animated.View>
                )}
                
                {/* Email input */}
                <Input
                  label={translate('email')}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="email@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon={<Mail size={20} color={isDark ? THEME.colors.text.dark.tertiary : THEME.colors.text.light.tertiary} />}
                  style={styles.input}
                />
                
                {/* Password input */}
                <Input
                  label={translate('password')}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                  icon={<Lock size={20} color={isDark ? THEME.colors.text.dark.tertiary : THEME.colors.text.light.tertiary} />}
                  style={styles.input}
                />
                
                {/* Forgot password link */}
                <Link href="/forgot-password" asChild>
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={[styles.forgotPasswordText, { color: THEME.colors.primary[500] }]}>
                      {translate('forgotPassword')}
                    </Text>
                  </TouchableOpacity>
                </Link>
                
                {/* Login button */}
                <Button
                  title={translate('login')}
                  onPress={handleLogin}
                  loading={isLoading}
                  style={styles.button}
                />
                
                {/* Sign up link */}
                <View style={styles.signupContainer}>
                  <Text style={[styles.signupText, { color: getSecondaryTextColor() }]}>
                    Don't have an account?
                  </Text>
                  <Link href="/signup" asChild>
                    <TouchableOpacity>
                      <Text style={[styles.signupLink, { color: THEME.colors.primary[500] }]}>
                        {translate('signup')}
                      </Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </Card>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: THEME.spacing.m,
  },
  header: {
    marginBottom: THEME.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: THEME.typography.fontSize.xxxl,
    fontFamily: THEME.typography.fontFamily.bold,
    marginBottom: THEME.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: THEME.typography.fontSize.m,
    fontFamily: THEME.typography.fontFamily.regular,
    marginBottom: THEME.spacing.m,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    marginBottom: THEME.spacing.m,
  },
  button: {
    marginTop: THEME.spacing.m,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: THEME.spacing.m,
  },
  forgotPasswordText: {
    fontSize: THEME.typography.fontSize.s,
    fontFamily: THEME.typography.fontFamily.medium,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: THEME.spacing.l,
  },
  signupText: {
    fontSize: THEME.typography.fontSize.s,
    fontFamily: THEME.typography.fontFamily.regular,
    marginRight: THEME.spacing.xs,
  },
  signupLink: {
    fontSize: THEME.typography.fontSize.s,
    fontFamily: THEME.typography.fontFamily.medium,
  },
  errorContainer: {
    backgroundColor: THEME.colors.error.light,
    borderRadius: THEME.borderRadius.m,
    padding: THEME.spacing.m,
    marginBottom: THEME.spacing.m,
  },
  errorText: {
    color: THEME.colors.error.dark,
    fontSize: THEME.typography.fontSize.s,
    fontFamily: THEME.typography.fontFamily.medium,
  },
});