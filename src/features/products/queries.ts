import { useQuery } from '@tanstack/react-query'
import { fetchProduct, fetchProducts } from './api/productApi'

export const productKeys = {
  all: ['products'] as const,
  list: () => [...productKeys.all, 'list'] as const,
  detail: (id: string) => [...productKeys.all, 'detail', id] as const,
}

export function useProducts() {
  return useQuery({ queryKey: productKeys.list(), queryFn: fetchProducts })
}

export function useProduct(id: string) {
  return useQuery({ queryKey: productKeys.detail(id), queryFn: () => fetchProduct(id) })
}
