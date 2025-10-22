'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client/react';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  VALIDATE_TOKEN
} from '@/graphql/auth';

// User type based on backend GraphQL schema
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
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token management utilities
const TOKEN_KEY = 'conq_auth_token';
const REFRESH_TOKEN_KEY = 'conq_refresh_token';
const USER_KEY = 'conq_user_data';

const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

const setRefreshToken = (refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

const removeTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
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

  // GraphQL mutations and queries
  const [loginMutation] = useMutation(LOGIN);
  const [registerMutation] = useMutation(REGISTER);
  const [logoutMutation] = useMutation(LOGOUT);
  const [validateToken] = useLazyQuery(VALIDATE_TOKEN);

  // Validate token and fetch user data on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      const savedUser = getUserData();

      if (token && savedUser) {
        // Validate token with backend via GraphQL
        try {
          const { data, error } = await validateToken({
            variables: { token },
          });

          if (error || !data?.validateToken?.valid) {
            // Token invalid, clear storage
            removeTokens();
            setUser(null);
          } else {
            setUser(savedUser);
          }
        } catch (error) {
          console.error('Auth validation failed:', error);
          removeTokens();
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, [validateToken]);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, errors } = await loginMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      if (errors || !data?.login) {
        throw new Error(errors?.[0]?.message || 'Login failed');
      }

      const { token, refreshToken, user: userData } = data.login;

      // Store tokens and user data
      setToken(token);
      setRefreshToken(refreshToken);
      setUserData(userData);
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      // Provide more user-friendly error messages
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          throw new Error('Unable to connect to server. Please ensure the backend is running.');
        }
        throw error;
      }
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, errors } = await registerMutation({
        variables: {
          input: {
            name,
            email,
            password,
          },
        },
      });

      if (errors || !data?.register) {
        throw new Error(errors?.[0]?.message || 'Registration failed');
      }

      const { token, refreshToken, user: userData } = data.register;

      // Store tokens and user data
      setToken(token);
      setRefreshToken(refreshToken);
      setUserData(userData);
      setUser(userData);
    } catch (error) {
      console.error('Registration error:', error);
      // Provide more user-friendly error messages
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          throw new Error('Unable to connect to server. Please ensure the backend is running.');
        }
        throw error;
      }
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      // Call backend logout (will blacklist token)
      await logoutMutation().catch(err =>
        console.error('Logout API call failed:', err)
      );
    } finally {
      // Always clear local state regardless of API call result
      removeTokens();
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
        const { data, error } = await validateToken({
          variables: { token },
        });

        if (error || !data?.validateToken?.valid) {
          removeTokens();
          setUser(null);
        } else {
          setUser(savedUser);
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        removeTokens();
        setUser(null);
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
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
