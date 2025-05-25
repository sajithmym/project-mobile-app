import firebase from 'firebase/app';
import 'firebase/auth';
import { AsyncStorage } from 'react-native';
import { roles } from '../constants/roles';

const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const signUp = async (email, password) => {
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await AsyncStorage.setItem('userRole', roles.user); // Set default role
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        await firebase.auth().signOut();
        await AsyncStorage.removeItem('userRole'); // Clear user role on logout
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = () => {
    return firebase.auth().currentUser;
};

export const isAuthenticated = () => {
    return !!firebase.auth().currentUser;
};