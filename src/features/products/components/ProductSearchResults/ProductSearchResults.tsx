import type { ProductSummary } from '../../types'
import { EmptySearchResults } from '../EmptySearchResults/EmptySearchResults'
import { ProductGrid } from '../ProductGrid/ProductGrid'

interface ProductSearchResultsProps {
  products: ProductSummary[]
  query: string
}

export function ProductSearchResults({ products, query }: ProductSearchResultsProps) {
  if (products.length === 0) {
    return <EmptySearchResults query={query} />
  }
  return <ProductGrid products={products} />
}
