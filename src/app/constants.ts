/** API responses are cached for one hour, after which they are revalidated against the API. */
export const CACHE_TIME_MS = 60 * 60 * 1000

export const MAX_QUERY_RETRIES = 2

export const QUERY_CACHE_STORAGE_KEY = 'mobile-shop:query-cache'
