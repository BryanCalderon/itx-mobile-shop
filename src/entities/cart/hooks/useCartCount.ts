import { useSyncExternalStore } from 'react'
import { getCartCount, subscribeToCartCount } from '../store/cartCountStore'

export function useCartCount(): number {
  return useSyncExternalStore(subscribeToCartCount, getCartCount)
}
