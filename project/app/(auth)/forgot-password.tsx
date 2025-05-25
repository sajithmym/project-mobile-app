import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import Screen from '@/components/layout/Screen';
import { typography, spacing, strings, settings } from '@/constants';
import { Mail, ArrowLeft } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { resetPassword } from '@/lib/firebase';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate email
  const validateEmail = () => {
    if (!email) {
      setError(strings.auth.forgotPassword.errors.emailRequired);
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError(strings.auth.forgotPassword.errors.emailInvalid);
      return false;
    }
    
    setError('');
    return true;
  };

  // Handle reset password
  const handleResetPassword = async () => {
    if (!validateEmail()) return;
    
    setIsLoading(true);
    try {
      await resetPassword(email);
      setIsSuccess(true);
      Alert.alert(
        'Success',
        strings.auth.forgotPassword.emailSent,
        [{ text: 'OK', onPress: () => router.replace(settings.routes.auth.login) }]
      );
    } catch (err: any) {
      setError(strings.auth.forgotPassword.errors.emailNotFound);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen scrollable={false} style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Animated.View 
          entering={FadeInUp.delay(200).duration(800)}
          style={styles.headerContainer}
        >
          <Link href={settings.routes.auth.login} asChild>
            <TouchableOpacity style={styles.backButton}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          </Link>
          
          <Text style={[styles.title, { color: colors.text }]}>
            {strings.auth.forgotPassword.title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {strings.auth.forgotPassword.subtitle}
          </Text>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(400).duration(800)}
          style={styles.formContainer}
        >
          {error && (
            <View style={[styles.errorContainer, { backgroundColor: colors.error[50] }]}>
              <Text style={[styles.errorText, { color: colors.error[700] }]}>
                {error}
              </Text>
            </View>
          )}
          
          {isSuccess && (
            <View style={[styles.successContainer, { backgroundColor: colors.success[50] }]}>
              <Text style={[styles.successText, { color: colors.success[700] }]}>
                {strings.auth.forgotPassword.emailSent}
              </Text>
            </View>
          )}
          
          <TextInput
            label={strings.auth.forgotPassword.emailPlaceholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={error}
            leftIcon={<Mail size={20} color={colors.textSecondary} />}
          />
          
          <Button
            title={strings.auth.forgotPassword.resetPassword}
            onPress={handleResetPassword}
            loading={isLoading}
            style={styles.button}
          />
          
          <Link href={settings.routes.auth.login} asChild>
            <TouchableOpacity style={styles.backToLoginContainer}>
              <Text style={[styles.backToLoginText, { color: colors.primary[600] }]}>
                {strings.auth.forgotPassword.backToLogin}
              </Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: spacing.xl,
  },
  backButton: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.headingLarge,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodyLarge,
  },
  formContainer: {
    width: '100%',
  },
  errorContainer: {
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  errorText: {
    ...typography.bodyMedium,
  },
  successContainer: {
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  successText: {
    ...typography.bodyMedium,
  },
  button: {
    marginTop: spacing.lg,
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  backToLoginText: {
    ...typography.bodyMedium,
    fontFamily: typography.fontFamilies.semiBold,
  },
});