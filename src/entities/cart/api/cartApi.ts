import { API_ENDPOINTS } from '@/api/endpoints'
import { postJson } from '@/api/httpClient'
import type { CartItem } from '../types'
import type { AddToCartRequestDto, AddToCartResponseDto } from './cartDto'

/** Adds a product to the cart and returns the number of units added. */
export async function addToCart(item: CartItem): Promise<number> {
  const body: AddToCartRequestDto = {
    id: item.productId,
    colorCode: item.colorCode,
    storageCode: item.storageCode,
  }
  const { count } = await postJson<AddToCartResponseDto>(API_ENDPOINTS.cart, body)
  return count
}
