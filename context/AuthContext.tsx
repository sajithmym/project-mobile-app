import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { router } from 'expo-router';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { auth } from '../config/firebase';
import { AUTH_CONFIG, STORAGE_KEYS } from '../constants/settings';

// Define the User type with additional fields
export interface User extends FirebaseUser {
  role?: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
  clearError: () => void;
  hasRole: (role: string) => boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updateUserProfile: async () => {},
  clearError: () => {},
  hasRole: () => false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Save user data to secure storage
  const saveUserToStorage = async (userData: User | null) => {
    try {
      if (userData) {
        const userString = JSON.stringify({
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          role: userData.role || AUTH_CONFIG.defaultRole,
        });
        
        if (Platform.OS === 'web') {
          localStorage.setItem(STORAGE_KEYS.USER_DATA, userString);
        } else {
          await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, userString);
        }
      } else {
        if (Platform.OS === 'web') {
          localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        } else {
          await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA);
        }
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Load user data from secure storage
  const loadUserFromStorage = async () => {
    try {
      let userString;
      
      if (Platform.OS === 'web') {
        userString = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      } else {
        userString = await SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA);
      }
      
      if (userString) {
        const userData = JSON.parse(userString);
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Error loading user data:', error);
      return null;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Load additional user data from storage
        const storedUser = await loadUserFromStorage();
        
        // Combine Firebase user with stored data
        const enhancedUser: User = {
          ...firebaseUser,
          role: storedUser?.role || AUTH_CONFIG.defaultRole,
        };
        
        setUser(enhancedUser);
        await saveUserToStorage(enhancedUser);
      } else {
        setUser(null);
        await saveUserToStorage(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Add default role if not present
      const enhancedUser: User = {
        ...userCredential.user,
        role: AUTH_CONFIG.defaultRole,
      };
      
      setUser(enhancedUser);
      await saveUserToStorage(enhancedUser);
      setError(null);
      router.replace('/(tabs)');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign in';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(userCredential.user, { displayName });
      
      // Add default role
      const enhancedUser: User = {
        ...userCredential.user,
        role: AUTH_CONFIG.defaultRole,
      };
      
      setUser(enhancedUser);
      await saveUserToStorage(enhancedUser);
      setError(null);
      router.replace('/(tabs)');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign up';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      await saveUserToStorage(null);
      setError(null);
      router.replace('/login');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to log out';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to reset password';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    setIsLoading(true);
    try {
      if (user) {
        await updateProfile(user, { 
          displayName: displayName || user.displayName, 
          photoURL: photoURL || user.photoURL 
        });
        
        // Update local user state
        const updatedUser: User = {
          ...user,
          displayName: displayName || user.displayName,
          photoURL: photoURL || user.photoURL,
        };
        
        setUser(updatedUser);
        await saveUserToStorage(updatedUser);
        setError(null);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update profile';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Check if user has a specific role
  const hasRole = (role: string) => {
    return user?.role === role;
  };

  const value = {
    user,
    isLoading,
    error,
    signIn,
    signUp,
    logout,
    resetPassword,
    updateUserProfile,
    clearError,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};