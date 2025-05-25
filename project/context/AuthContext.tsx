import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { auth, getCurrentUser, loginWithEmail, signUpWithEmail, logoutUser } from '@/lib/firebase';
import * as SecureStore from 'expo-secure-store';
import { User, onAuthStateChanged } from 'firebase/auth';
import { settings } from '@/constants';
import { router } from 'expo-router';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  error: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          // Store user token in secure storage
          await SecureStore.setItemAsync(
            settings.storage.userToken,
            await firebaseUser.getIdToken()
          );
          
          // Store minimal user info in secure storage
          await SecureStore.setItemAsync(
            settings.storage.userInfo,
            JSON.stringify({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            })
          );
        } catch (error) {
          console.error('Error storing user data:', error);
        }
      } else {
        setUser(null);
        try {
          // Clear user data from secure storage
          await SecureStore.deleteItemAsync(settings.storage.userToken);
          await SecureStore.deleteItemAsync(settings.storage.userInfo);
        } catch (error) {
          console.error('Error clearing user data:', error);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await loginWithEmail(email, password);
      router.replace(settings.routes.app.home);
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const userCredential = await signUpWithEmail(email, password);
      
      // Update profile with name
      await auth.currentUser?.updateProfile({
        displayName: name,
      });
      
      // Refresh user data
      setUser({ ...userCredential.user, displayName: name });
      router.replace(settings.routes.app.home);
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    setError(null);
    try {
      await logoutUser();
      router.replace(settings.routes.auth.login);
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      setError(error.message);
    }
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}