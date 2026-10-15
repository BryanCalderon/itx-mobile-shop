import { useCallback } from 'react'
import { useSearchParams } from 'react-router'
import { SEARCH_QUERY_PARAM } from '../constants'

/**
 * Product search kept in the URL, so it survives navigating to a product and back and can be
 * shared. Changes replace the current history entry instead of adding one per keystroke.
 */
export function useSearchQuery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get(SEARCH_QUERY_PARAM) ?? ''

  const setQuery = useCallback(
    (value: string) => {
      setSearchParams(
        (params) => {
          if (value) {
            params.set(SEARCH_QUERY_PARAM, value)
          } else {
            params.delete(SEARCH_QUERY_PARAM)
          }
          return params
        },
        // Synchronous update, so the search input, which shows the URL value, never lags behind
        // the user typing
        { replace: true, flushSync: true },
      )
    },
    [setSearchParams],
  )

  return [query, setQuery] as const
}
