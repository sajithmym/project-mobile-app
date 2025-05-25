import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import Screen from '@/components/layout/Screen';
import { typography, spacing, strings, settings } from '@/constants';
import { Lock, Mail } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function LoginScreen() {
  const { signIn, error: authError, isLoading } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Validate form
  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = strings.auth.login.errors.emailRequired;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = strings.auth.login.errors.emailInvalid;
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = strings.auth.login.errors.passwordRequired;
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = strings.auth.login.errors.passwordTooShort;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle login
  const handleLogin = async () => {
    if (validateForm()) {
      await signIn(email, password);
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
          <Text style={[styles.title, { color: colors.text }]}>
            {strings.auth.login.title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {strings.auth.login.subtitle}
          </Text>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(400).duration(800)}
          style={styles.formContainer}
        >
          {authError && (
            <View style={[styles.errorContainer, { backgroundColor: colors.error[50] }]}>
              <Text style={[styles.errorText, { color: colors.error[700] }]}>
                {strings.auth.login.errors.invalidCredentials}
              </Text>
            </View>
          )}
          
          <TextInput
            label={strings.auth.login.emailPlaceholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon={<Mail size={20} color={colors.textSecondary} />}
          />
          
          <TextInput
            label={strings.auth.login.passwordPlaceholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
            leftIcon={<Lock size={20} color={colors.textSecondary} />}
          />
          
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.forgotPasswordText, { color: colors.primary[600] }]}>
              {strings.auth.login.forgotPassword}
            </Text>
          </TouchableOpacity>
          
          <Button
            title={strings.auth.login.signIn}
            onPress={handleLogin}
            loading={isLoading}
            style={styles.button}
          />
          
          <View style={styles.signupContainer}>
            <Text style={[styles.signupText, { color: colors.textSecondary }]}>
              {strings.auth.login.noAccount}
            </Text>
            <Link href={settings.routes.auth.signUp} asChild>
              <TouchableOpacity>
                <Text style={[styles.signupLink, { color: colors.primary[600] }]}>
                  {strings.auth.login.signUp}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
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
  forgotPasswordText: {
    ...typography.bodySmall,
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.md,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  signupText: {
    ...typography.bodyMedium,
    marginRight: spacing.xs,
  },
  signupLink: {
    ...typography.bodyMedium,
    fontFamily: typography.fontFamilies.semiBold,
  },
});