'use client';
import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const login = (username, password) => {
    // Hardcoded credentials
    if (username === 'student' && password === '1234') {
      setIsLoggedIn(true);
      router.push('/home');
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
