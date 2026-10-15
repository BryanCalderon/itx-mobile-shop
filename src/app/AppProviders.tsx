import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { type ReactNode, useState } from 'react'
import { createPersistOptions, createQueryClient } from './queryClient'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(createQueryClient)
  const [persistOptions] = useState(() => createPersistOptions(window.localStorage))

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      {children}
    </PersistQueryClientProvider>
  )
}
