import { useDeferredValue, useMemo } from 'react'
import type { ProductSummary } from '../types'
import { filterProducts } from '../utils/filterProducts'
import { useSearchQuery } from './useSearchQuery'

/**
 * Search over a product list. The input shows `query` as typed, while the results are computed
 * from a deferred copy of it, so typing stays responsive even if filtering takes a while.
 */
export function useProductSearch(products: ProductSummary[] | undefined) {
  const [query, setQuery] = useSearchQuery()
  const searchedQuery = useDeferredValue(query)
  const results = useMemo(
    () => (products ? filterProducts(products, searchedQuery) : []),
    [products, searchedQuery],
  )

  return { query, setQuery, searchedQuery, results }
}
