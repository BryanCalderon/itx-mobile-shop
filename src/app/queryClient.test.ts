import { describe, expect, it } from 'vitest'
import { ApiError } from '@/api/ApiError'
import { CACHE_TIME_MS } from './constants'
import { createQueryClient } from './queryClient'

describe('createQueryClient', () => {
  const defaults = createQueryClient().getDefaultOptions().queries!

  it('keeps API data fresh for one hour before revalidating it', () => {
    expect(CACHE_TIME_MS).toBe(3_600_000)
    expect(defaults.staleTime).toBe(CACHE_TIME_MS)
    expect(defaults.gcTime).toBe(CACHE_TIME_MS)
  })

  it('retries server and network errors but not client errors', () => {
    const retry = defaults.retry as (failureCount: number, error: Error) => boolean

    expect(retry(0, new ApiError(500, '/product'))).toBe(true)
    expect(retry(0, new TypeError('Failed to fetch'))).toBe(true)
    expect(retry(0, new ApiError(400, '/cart'))).toBe(false)
    expect(retry(2, new ApiError(500, '/product'))).toBe(false)
  })
})
