import { useMutation } from '@tanstack/react-query'
import { addToCart } from '../api/cartApi'
import { incrementCartCount } from '../store/cartCountStore'

/**
 * Adds a product to the cart and updates the cart count. The API answers with the units just
 * added (always 1), not with the cart total, so the count is accumulated on the client.
 */
export function useAddToCart() {
  return useMutation({
    mutationFn: addToCart,
    onSuccess: (unitsAdded) => incrementCartCount(unitsAdded),
  })
}
