import { gql } from '@apollo/client';

// Fragment for User fields
export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    email
    avatar
    role
    createdAt
    updatedAt
  }
`;

// Mutation: Register new user
export const REGISTER = gql`
  ${USER_FIELDS}
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      refreshToken
      user {
        ...UserFields
      }
    }
  }
`;

// Mutation: Login user
export const LOGIN = gql`
  ${USER_FIELDS}
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      refreshToken
      user {
        ...UserFields
      }
    }
  }
`;

// Mutation: Logout user
export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

// Query: Validate token
export const VALIDATE_TOKEN = gql`
  ${USER_FIELDS}
  query ValidateToken($token: String!) {
    validateToken(token: $token) {
      valid
      message
      user {
        ...UserFields
      }
    }
  }
`;

// TypeScript types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}
