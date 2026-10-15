import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client'

import { ApiError } from '../api/httpClient'

/**
 * API responses are cached for one hour:
 * - `staleTime`: data is served from the cache for one hour and revalidated against the API after it.
 * - `gcTime` and `maxAge`: cached data is kept, in memory and in localStorage, for one hour.
 * The cache is persisted in localStorage, so it survives page reloads.
 */
export const CACHE_TIME_MS = 60 * 60 * 1000

const MAX_RETRIES = 2

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: CACHE_TIME_MS,
        gcTime: CACHE_TIME_MS,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => isRetryable(error) && failureCount < MAX_RETRIES,
      },
    },
  })
}

export function createPersistOptions(
  storage: Storage,
): Omit<PersistQueryClientOptions, 'queryClient'> {
  return {
    persister: createAsyncStoragePersister({ storage, key: 'mobile-shop:query-cache' }),
    maxAge: CACHE_TIME_MS,
    buster: __APP_VERSION__,
  }
}

/** Client errors won't change by retrying, server and network errors might. */
function isRetryable(error: Error): boolean {
  return !(error instanceof ApiError && error.status >= 400 && error.status < 500)
}
