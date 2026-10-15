import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { useState, type ReactNode } from 'react'

import { createPersistOptions, createQueryClient } from './queryClient'

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient)
  const [persistOptions] = useState(() => createPersistOptions(window.localStorage))

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      {children}
    </PersistQueryClientProvider>
  )
}
