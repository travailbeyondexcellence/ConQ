'use client';

import { ApolloProvider } from '@apollo/client/react';
import { AuthProvider } from '@/context/AuthContext';
import client from '@/lib/apollo-client';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ApolloProvider>
  );
}
