'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {getDatabase,ref,set} from 'firebase/database';
import {defaultUserData} from "@/data/defaultUserData";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home');
      return true;
    } catch (error) {
      console.error('Login error:', error.message);
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Add user data to Realtime Database
      const db = getDatabase();
      await set(ref(db, `users/${userId}`), defaultUserData);

      router.push('/home');
      return true;
    } catch (error) {
      console.error('Registration error:', error.message);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
