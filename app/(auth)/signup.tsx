import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  FadeInUp 
} from 'react-native-reanimated';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react-native';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { THEME, AUTH_CONFIG } from '@/constants/settings';

export default function SignupScreen() {
  const { signUp, error: authError, isLoading, clearError } = useAuth();
  const { translate } = useLanguage();
  const { isDark } = useTheme();
  
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Handle sign up
  const handleSignUp = async () => {
    // Clear previous errors
    setError(null);
    clearError();
    
    // Validate inputs
    if (!displayName.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    if (password.length < AUTH_CONFIG.passwordMinLength) {
      setError(`Password must be at least ${AUTH_CONFIG.passwordMinLength} characters`);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Attempt sign up
    await signUp(email, password, displayName);
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
            {/* Back button */}
            <Animated.View 
              entering={FadeIn.duration(500)}
              style={styles.backButtonContainer}
            >
              <Link href="/login" asChild>
                <TouchableOpacity style={styles.backButton}>
                  <ArrowLeft size={24} color={getTextColor()} />
                </TouchableOpacity>
              </Link>
            </Animated.View>
            
            {/* Header */}
            <Animated.View 
              entering={FadeIn.duration(800)}
              style={styles.header}
            >
              <Text style={[styles.title, { color: getTextColor() }]}>
                {translate('signup')}
              </Text>
              <Text style={[styles.subtitle, { color: getSecondaryTextColor() }]}>
                Create a new account
              </Text>
            </Animated.View>
            
            {/* Sign up form */}
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
                
                {/* Name input */}
                <Input
                  label={translate('displayName')}
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="John Doe"
                  icon={<User size={20} color={isDark ? THEME.colors.text.dark.tertiary : THEME.colors.text.light.tertiary} />}
                  style={styles.input}
                />
                
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
                
                {/* Confirm password input */}
                <Input
                  label={translate('confirmPassword')}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••"
                  secureTextEntry
                  icon={<Lock size={20} color={isDark ? THEME.colors.text.dark.tertiary : THEME.colors.text.light.tertiary} />}
                  style={styles.input}
                />
                
                {/* Sign up button */}
                <Button
                  title={translate('signup')}
                  onPress={handleSignUp}
                  loading={isLoading}
                  style={styles.button}
                />
                
                {/* Login link */}
                <View style={styles.loginContainer}>
                  <Text style={[styles.loginText, { color: getSecondaryTextColor() }]}>
                    Already have an account?
                  </Text>
                  <Link href="/login" asChild>
                    <TouchableOpacity>
                      <Text style={[styles.loginLink, { color: THEME.colors.primary[500] }]}>
                        {translate('login')}
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: THEME.spacing.m,
    position: 'relative',
  },
  backButtonContainer: {
    position: 'absolute',
    top: THEME.spacing.m,
    left: THEME.spacing.m,
    zIndex: 10,
  },
  backButton: {
    padding: THEME.spacing.s,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: THEME.spacing.l,
  },
  loginText: {
    fontSize: THEME.typography.fontSize.s,
    fontFamily: THEME.typography.fontFamily.regular,
    marginRight: THEME.spacing.xs,
  },
  loginLink: {
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