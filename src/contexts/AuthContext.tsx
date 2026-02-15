import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  type User
} from 'firebase/auth';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState} from 'react';

import { auth } from '../firebase/config';

type AuthUser = User;

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAnonymous: boolean;
  isExternalAuthInProgress: boolean;
  signInAnonymous: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  linkWithGoogle: () => Promise<void>;
  linkWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExternalAuthInProgress, setIsExternalAuthInProgress] = useState(false);

  const isAuthenticated = user !== null;
  const isAnonymous = user?.isAnonymous ?? false;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => { unsubscribe(); };
  }, []);

  const signInAnonymous = async (): Promise<void> => {
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    setIsExternalAuthInProgress(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setIsExternalAuthInProgress(false);
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<void> => {
    setIsExternalAuthInProgress(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
    } finally {
      setIsExternalAuthInProgress(false);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    setIsExternalAuthInProgress(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } finally {
      setIsExternalAuthInProgress(false);
    }
  };

  const linkWithGoogle = async (): Promise<void> => {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in');
    }
    const provider = new GoogleAuthProvider();
    await linkWithPopup(auth.currentUser, provider);
  };

  const linkWithEmail = async (email: string, password: string): Promise<void> => {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in');
    }
    const credential = EmailAuthProvider.credential(email, password);
    await linkWithCredential(auth.currentUser, credential);
  };

  const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth);
  };

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated,
    isAnonymous,
    isExternalAuthInProgress,
    signInAnonymous,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    linkWithGoogle,
    linkWithEmail,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
