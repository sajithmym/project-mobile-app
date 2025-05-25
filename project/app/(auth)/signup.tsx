import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';
import Screen from '../../components/layout/Screen';
import { typography, spacing, strings, settings } from '../../constants';
import { Lock, Mail, User } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function SignUpScreen() {
  const { signUp, error: authError, isLoading } = useAuth();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Validate form
  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    // Name validation
    if (!name) {
      newErrors.name = strings.auth.signUp.errors.nameRequired;
      isValid = false;
    }

    // Email validation
    if (!email) {
      newErrors.email = strings.auth.signUp.errors.emailRequired;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = strings.auth.signUp.errors.emailInvalid;
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = strings.auth.signUp.errors.passwordRequired;
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = strings.auth.signUp.errors.passwordTooShort;
      isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = strings.auth.signUp.errors.passwordsDontMatch;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle sign up
  const handleSignUp = async () => {
    if (validateForm()) {
      await signUp(email, password, name);
    }
  };

  return (
    <Screen scrollable={true} style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <Animated.View 
          entering={FadeInUp.delay(200).duration(800)}
          style={styles.headerContainer}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            {strings.auth.signUp.title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {strings.auth.signUp.subtitle}
          </Text>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(400).duration(800)}
          style={styles.formContainer}
        >
          {authError && (
            <View style={[styles.errorContainer, { backgroundColor: colors.error[50] }]}>
              <Text style={[styles.errorText, { color: colors.error[700] }]}>
                {strings.auth.signUp.errors.emailInUse}
              </Text>
            </View>
          )}
          
          <TextInput
            label={strings.auth.signUp.namePlaceholder}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            error={errors.name}
            leftIcon={<User size={20} color={colors.textSecondary} />}
          />
          
          <TextInput
            label={strings.auth.signUp.emailPlaceholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon={<Mail size={20} color={colors.textSecondary} />}
          />
          
          <TextInput
            label={strings.auth.signUp.passwordPlaceholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
            leftIcon={<Lock size={20} color={colors.textSecondary} />}
          />
          
          <TextInput
            label={strings.auth.signUp.confirmPasswordPlaceholder}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
            leftIcon={<Lock size={20} color={colors.textSecondary} />}
          />
          
          <Button
            title={strings.auth.signUp.createAccount}
            onPress={handleSignUp}
            loading={isLoading}
            style={styles.button}
          />
          
          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              {strings.auth.signUp.haveAccount}
            </Text>
            <Link href={settings.routes.auth.login} asChild>
              <TouchableOpacity>
                <Text style={[styles.loginLink, { color: colors.primary[600] }]}>
                  {strings.auth.signUp.signIn}
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
  button: {
    marginTop: spacing.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  loginText: {
    ...typography.bodyMedium,
    marginRight: spacing.xs,
  },
  loginLink: {
    ...typography.bodyMedium,
    fontFamily: typography.fontFamilies.semiBold,
  },
});