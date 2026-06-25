'use client';

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createIndexedDBPersister } from '../utils/persister';

export default function QueryProvider({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24, 
            staleTime: 1000 * 60 * 5,   
            networkMode: 'offlineFirst', 
            retry:3
          },
        },
      })
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  const persister = createIndexedDBPersister();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24, 
        buster: 'v1', 
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}