'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User type based on backend MongoDB schema
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token management utilities
const TOKEN_KEY = 'conq_auth_token';
const USER_KEY = 'conq_user_data';

const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

const setUserData = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

const getUserData = (): User | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

// AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Validate token and fetch user data on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      const savedUser = getUserData();

      if (token && savedUser) {
        // Validate token with backend
        try {
          const response = await fetch('http://localhost:8080/auth/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setUser(savedUser);
          } else {
            // Token invalid, clear storage
            removeToken();
          }
        } catch (error) {
          console.error('Auth validation failed:', error);
          removeToken();
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();

      // Store token and user data
      setToken(data.token);
      const userData: User = {
        id: data.user.id || data.user._id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
        role: data.user.role,
      };
      setUserData(userData);
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      // Provide more user-friendly error messages
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please ensure the backend is running.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      if (token) {
        // Call backend logout (will blacklist token)
        await fetch('http://localhost:8080/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).catch(err => console.error('Logout API call failed:', err));
      }
    } finally {
      // Always clear local state regardless of API call result
      removeToken();
      setUser(null);
      setIsLoading(false);
    }
  };

  // Refresh auth state (useful after external changes)
  const refreshAuth = async () => {
    const token = getToken();
    const savedUser = getUserData();

    if (token && savedUser) {
      try {
        const response = await fetch('http://localhost:8080/auth/validate', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setUser(savedUser);
        } else {
          removeToken();
          setUser(null);
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        removeToken();
        setUser(null);
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
