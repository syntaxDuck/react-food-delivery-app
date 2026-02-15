import { type FirebaseOptions,initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const getFirebaseConfig = (): FirebaseOptions => {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  
  if (!projectId || !apiKey) {
    throw new Error('Missing required Firebase configuration. Check your .env.local file.');
  }
  
  return {
    apiKey,
    authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) ?? `${projectId}.firebaseapp.com`,
    projectId,
    storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) ?? `${projectId}.appspot.com`,
    messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) ?? '',
    appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) ?? ''
  };
};

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
