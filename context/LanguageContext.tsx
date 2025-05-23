import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { STORAGE_KEYS, LANGUAGES, DEFAULT_LANGUAGE } from '../constants/settings';

// Define language types
type LanguageCode = 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  translate: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType>({
  language: DEFAULT_LANGUAGE.code as LanguageCode,
  setLanguage: () => {},
  translate: () => '',
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

// Simplified translations for demo purposes
const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    welcome: 'Welcome',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Password',
    home: 'Home',
    profile: 'Profile',
    actions: 'Actions',
    settings: 'Settings',
    logout: 'Logout',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    systemTheme: 'System Theme',
    language: 'Language',
    english: 'English',
    spanish: 'Spanish',
    french: 'French',
    save: 'Save',
    cancel: 'Cancel',
    editProfile: 'Edit Profile',
    name: 'Name',
    updateProfile: 'Update Profile',
    confirmPassword: 'Confirm Password',
    displayName: 'Display Name',
  },
  es: {
    welcome: 'Bienvenido',
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    forgotPassword: '¿Olvidó su Contraseña?',
    resetPassword: 'Restablecer Contraseña',
    home: 'Inicio',
    profile: 'Perfil',
    actions: 'Acciones',
    settings: 'Configuración',
    logout: 'Cerrar Sesión',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    systemTheme: 'Tema del Sistema',
    language: 'Idioma',
    english: 'Inglés',
    spanish: 'Español',
    french: 'Francés',
    save: 'Guardar',
    cancel: 'Cancelar',
    editProfile: 'Editar Perfil',
    name: 'Nombre',
    updateProfile: 'Actualizar Perfil',
    confirmPassword: 'Confirmar Contraseña',
    displayName: 'Nombre para mostrar',
  },
  fr: {
    welcome: 'Bienvenue',
    login: 'Connexion',
    signup: 'S\'inscrire',
    email: 'Email',
    password: 'Mot de passe',
    forgotPassword: 'Mot de passe oublié?',
    resetPassword: 'Réinitialiser le mot de passe',
    home: 'Accueil',
    profile: 'Profil',
    actions: 'Actions',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair',
    systemTheme: 'Thème du Système',
    language: 'Langue',
    english: 'Anglais',
    spanish: 'Espagnol',
    french: 'Français',
    save: 'Enregistrer',
    cancel: 'Annuler',
    editProfile: 'Modifier le Profil',
    name: 'Nom',
    updateProfile: 'Mettre à jour le profil',
    confirmPassword: 'Confirmer le mot de passe',
    displayName: 'Nom d\'affichage',
  },
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE.code as LanguageCode);

  // Load saved language preference
  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        let savedLanguage;
        
        if (Platform.OS === 'web') {
          savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE_PREFERENCE);
        } else {
          savedLanguage = await SecureStore.getItemAsync(STORAGE_KEYS.LANGUAGE_PREFERENCE);
        }
        
        if (savedLanguage && ['en', 'es', 'fr'].includes(savedLanguage)) {
          setLanguageState(savedLanguage as LanguageCode);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };

    loadLanguagePreference();
  }, []);

  // Save language preference
  const setLanguage = async (code: LanguageCode) => {
    setLanguageState(code);
    
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(STORAGE_KEYS.LANGUAGE_PREFERENCE, code);
      } else {
        await SecureStore.setItemAsync(STORAGE_KEYS.LANGUAGE_PREFERENCE, code);
      }
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  // Translate function
  const translate = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};