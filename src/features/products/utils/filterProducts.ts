import { normalizeText } from '@/shared/normalizeText'
import type { ProductSummary } from '../types'

/**
 * Keeps the products whose brand or model contain every word of the query, ignoring case and
 * accents. An empty query keeps every product.
 */
export function filterProducts(products: ProductSummary[], query: string): ProductSummary[] {
  const words = normalizeText(query).split(/\s+/).filter(Boolean)

  if (words.length === 0) {
    return products
  }

  return products.filter((product) => {
    const searchableText = normalizeText(`${product.brand} ${product.model}`)
    return words.every((word) => searchableText.includes(word))
  })
}
