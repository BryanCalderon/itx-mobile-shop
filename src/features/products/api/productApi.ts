import { API_ENDPOINTS } from '@/api/endpoints'
import { getJson } from '@/api/httpClient'
import type { ProductDetail, ProductSummary } from '../types'
import type { ProductDetailDto, ProductSummaryDto } from './productDto'
import { toProductDetail, toProductSummary } from './productMappers'

export async function fetchProducts(): Promise<ProductSummary[]> {
  const products = await getJson<ProductSummaryDto[]>(API_ENDPOINTS.products)
  return products.map(toProductSummary)
}

export async function fetchProduct(id: string): Promise<ProductDetail> {
  const product = await getJson<ProductDetailDto>(API_ENDPOINTS.product(id))
  return toProductDetail(product)
}
