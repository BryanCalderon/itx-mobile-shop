import { useQuery } from '@tanstack/react-query'
import { fetchProduct } from '../api/productApi'
import { productKeys } from './productKeys'

export function useProduct(id: string) {
  return useQuery({ queryKey: productKeys.detail(id), queryFn: () => fetchProduct(id) })
}
