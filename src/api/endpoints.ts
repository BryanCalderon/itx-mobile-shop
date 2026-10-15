export const API_ENDPOINTS = {
  products: '/product',
  product: (id: string) => `/product/${encodeURIComponent(id)}`,
  cart: '/cart',
} as const
