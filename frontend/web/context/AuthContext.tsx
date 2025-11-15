'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
// import { useMutation, useLazyQuery, ApolloError } from '@apollo/client'
import {
  useMutation,
  useLazyQuery,
} from '@apollo/client/react'
import { LOGIN, LOGOUT, REGISTER, VALIDATE_TOKEN } from '@/graphql/auth'

// User type based on backend GraphQL schema
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

// GraphQL response types
interface AuthResponse {
  token: string
  refreshToken: string
  user: User
}

interface LoginData {
  login: AuthResponse
}

interface RegisterData {
  register: AuthResponse
}

interface ValidateTokenData {
  validateToken: {
    valid: boolean
  }
}

// Auth context type
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Token management utilities
const TOKEN_KEY = 'conq_auth_token'
const REFRESH_TOKEN_KEY = 'conq_refresh_token'
const USER_KEY = 'conq_user_data'

const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

const setRefreshToken = (refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }
}

const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY)
  }
  return null
}

const removeTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }
}

const setUserData = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

const getUserData = (): User | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(USER_KEY)
    if (data) {
      try {
        return JSON.parse(data)
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error)
        localStorage.removeItem(USER_KEY)
        return null
      }
    }
  }
  return null
}

// AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // GraphQL mutations and queries
  const [loginMutation] = useMutation<LoginData>(LOGIN)
  const [registerMutation] = useMutation<RegisterData>(REGISTER, {
    onCompleted: (data) => {
      console.log('[AUTH] Mutation onCompleted:', data)
    },
    onError: (error: ApolloError) => {
      console.error('[AUTH] Mutation onError:', error)
      console.error('[AUTH] Error details:', {
        message: error.message,
        networkError: error.networkError,
        graphQLErrors: error.graphQLErrors,
      })
    },
  })
  const [logoutMutation] = useMutation(LOGOUT)
  const [validateToken] = useLazyQuery<ValidateTokenData>(VALIDATE_TOKEN)

  // Validate token and fetch user data on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken()
      const savedUser = getUserData()

      if (token && savedUser) {
        // Validate token with backend via GraphQL
        try {
          const { data, error } = await validateToken({
            variables: { token },
          })

          if (error || !data?.validateToken?.valid) {
            // Token invalid, clear storage
            removeTokens()
            setUser(null)
          } else {
            setUser(savedUser)
          }
        } catch (error) {
          console.error('Auth validation failed:', error)
          removeTokens()
          setUser(null)
        }
      }

      setIsLoading(false)
    }

    initAuth()
  }, [validateToken])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data } = await loginMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      })

      if (!data?.login) {
        throw new Error('Login failed')
      }

      const { token, refreshToken, user: userData } = data.login

      // Store tokens and user data
      setToken(token)
      setRefreshToken(refreshToken)
      setUserData(userData)
      setUser(userData)
    } catch (error) {
      console.error('Login error:', error)
      // Provide more user-friendly error messages
      if (error instanceof ApolloError) {
        if (error.networkError) {
          throw new Error(
            'Unable to connect to server. Please ensure the backend is running.'
          )
        }
        if (error.graphQLErrors.length > 0) {
          throw new Error(error.graphQLErrors[0].message)
        }
      }
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    console.log('[AUTH] register function called with:', { name, email })
    setIsLoading(true)
    try {
      console.log('[AUTH] Executing registerMutation with Apollo Client')
      console.log(
        '[AUTH] GraphQL URL:',
        process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8080/graphql'
      )

      const { data } = await registerMutation({
        variables: {
          input: {
            name,
            email,
            password,
          },
        },
      })

      console.log('[AUTH] Mutation response:', { data })

      if (!data?.register) {
        console.error('[AUTH] Registration failed: no data returned')
        throw new Error('Registration failed')
      }

      const { token, refreshToken, user: userData } = data.register
      console.log(
        '[AUTH] Registration successful, storing tokens and user data'
      )

      // Store tokens and user data
      setToken(token)
      setRefreshToken(refreshToken)
      setUserData(userData)
      setUser(userData)
      console.log('[AUTH] Tokens and user data stored successfully')
    } catch (error) {
      console.error('[AUTH] Registration error caught:', error)
      console.error(
        '[AUTH] Error type:',
        error instanceof Error ? error.constructor.name : typeof error
      )
      // Provide more user-friendly error messages
      if (error instanceof ApolloError) {
        console.error('[AUTH] Apollo Error details:', {
          message: error.message,
          networkError: error.networkError,
          graphQLErrors: error.graphQLErrors,
        })
        if (error.networkError) {
          throw new Error(
            'Unable to connect to server. Please ensure the backend is running.'
          )
        }
        if (error.graphQLErrors.length > 0) {
          throw new Error(error.graphQLErrors[0].message)
        }
      }
      if (error instanceof Error) {
        console.error('[AUTH] Error message:', error.message)
        console.error('[AUTH] Error stack:', error.stack)
        throw error
      }
      throw new Error('Registration failed. Please try again.')
    } finally {
      console.log('[AUTH] Register function completed')
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)
    try {
      // Call backend logout (will blacklist token)
      await logoutMutation().catch((err) =>
        console.error('Logout API call failed:', err)
      )
    } finally {
      // Always clear local state regardless of API call result
      removeTokens()
      setUser(null)
      setIsLoading(false)
    }
  }

  // Refresh auth state (useful after external changes)
  const refreshAuth = async () => {
    const token = getToken()
    const savedUser = getUserData()

    if (token && savedUser) {
      try {
        const { data, error } = await validateToken({
          variables: { token },
        })

        if (error || !data?.validateToken?.valid) {
          removeTokens()
          setUser(null)
        } else {
          setUser(savedUser)
        }
      } catch (error) {
        console.error('Token validation failed:', error)
        removeTokens()
        setUser(null)
      }
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// useAuth hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
