import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  FadeInUp,
  SlideInRight 
} from 'react-native-reanimated';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react-native';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { THEME } from '@/constants/settings';

export default function ForgotPasswordScreen() {
  const { resetPassword, error: authError, isLoading, clearError } = useAuth();
  const { translate } = useLanguage();
  const { isDark } = useTheme();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Handle reset password
  const handleResetPassword = async () => {
    // Clear previous errors
    setError(null);
    clearError();
    setIsSuccess(false);
    
    // Validate inputs
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    try {
      // Attempt to send reset password email
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err) {
      // Error is handled by the auth context
    }
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
            {translate('resetPassword')}
          </Text>
          <Text style={[styles.subtitle, { color: getSecondaryTextColor() }]}>
            Enter your email to receive a password reset link
          </Text>
        </Animated.View>
        
        {/* Reset password form */}
        <Animated.View entering={FadeInDown.duration(800).delay(200)}>
          <Card style={styles.card}>
            {/* Success message */}
            {isSuccess && (
              <Animated.View 
                entering={SlideInRight.duration(500)}
                style={styles.successContainer}
              >
                <CheckCircle size={20} color={THEME.colors.success.default} style={styles.successIcon} />
                <Text style={styles.successText}>
                  Reset link sent to your email
                </Text>
              </Animated.View>
            )}
            
            {/* Error messages */}
            {(error || authError) && !isSuccess && (
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
            
            {/* Reset password button */}
            <Button
              title={translate('resetPassword')}
              onPress={handleResetPassword}
              loading={isLoading}
              style={styles.button}
            />
            
            {/* Login link */}
            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: getSecondaryTextColor() }]}>
                Remember your password?
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
    </AppLayout>
  );
}

const styles = StyleSheet.create({
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
  successContainer: {
    backgroundColor: THEME.colors.success.light,
    borderRadius: THEME.borderRadius.m,
    padding: THEME.spacing.m,
    marginBottom: THEME.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  successIcon: {
    marginRight: THEME.spacing.s,
  },
  successText: {
    color: THEME.colors.success.dark,
    fontSize: THEME.typography.fontSize.s,
    fontFamily: THEME.typography.fontFamily.medium,
  },
});