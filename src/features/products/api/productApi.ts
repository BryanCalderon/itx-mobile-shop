import { getJson } from '../../../api/httpClient'
import type { ProductDetail, ProductSummary } from '../types'
import type { ProductDetailDto, ProductSummaryDto } from './productDto'
import { toProductDetail, toProductSummary } from './productMappers'

export async function fetchProducts(): Promise<ProductSummary[]> {
  const products = await getJson<ProductSummaryDto[]>('/product')
  return products.map(toProductSummary)
}

export async function fetchProduct(id: string): Promise<ProductDetail> {
  const product = await getJson<ProductDetailDto>(`/product/${encodeURIComponent(id)}`)
  return toProductDetail(product)
}
