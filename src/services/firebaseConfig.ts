import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { settings } from '../constants/settings';

const firebaseConfig = {
  apiKey: settings.FIREBASE_API_KEY,
  authDomain: settings.FIREBASE_AUTH_DOMAIN,
  projectId: settings.FIREBASE_PROJECT_ID,
  storageBucket: settings.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: settings.FIREBASE_MESSAGING_SENDER_ID,
  appId: settings.FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();