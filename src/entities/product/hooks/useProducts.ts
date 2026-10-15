import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/productApi'
import { productKeys } from './productKeys'

export function useProducts() {
  return useQuery({ queryKey: productKeys.list(), queryFn: fetchProducts })
}
