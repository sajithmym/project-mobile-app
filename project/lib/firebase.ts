import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { settings } from '@/constants';

// Initialize Firebase
const firebaseConfig = settings.firebase;
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Auth functions
export const loginWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async (): Promise<void> => {
  return signOut(auth);
};

export const resetPassword = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

export const updateUserProfile = async (displayName: string, photoURL?: string): Promise<void> => {
  const user = auth.currentUser;
  if (user) {
    return updateProfile(user, {
      displayName,
      photoURL: photoURL || user.photoURL
    });
  }
  throw new Error('No user is signed in');
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export { auth, app };