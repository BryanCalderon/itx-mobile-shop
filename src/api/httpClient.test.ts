import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

it('reads the API base url from the environment', async () => {
  const { API_BASE_URL } = await import('./httpClient')

  expect(API_BASE_URL).toBe(import.meta.env.VITE_API_BASE_URL)
})

it('fails fast when the API base url is not configured', async () => {
  vi.stubEnv('VITE_API_BASE_URL', '')

  await expect(import('./httpClient')).rejects.toThrow('VITE_API_BASE_URL is not defined')
})
