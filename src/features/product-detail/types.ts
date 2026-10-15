/** Options chosen by the user to add a product to the cart */
export interface ProductSelection {
  storageCode: number
  colorCode: number
}

export type AddToCartStatus = 'idle' | 'pending' | 'success' | 'error'
