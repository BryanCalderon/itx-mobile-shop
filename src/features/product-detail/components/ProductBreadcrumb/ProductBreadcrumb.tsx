import { useProduct } from '@/entities/product/hooks/useProduct'

interface ProductBreadcrumbProps {
  productId: string
}

/** Product name for the breadcrumbs, read from the same cached query as the detail page. */
export function ProductBreadcrumb({ productId }: ProductBreadcrumbProps) {
  const { data: product } = useProduct(productId)
  return product ? `${product.brand} ${product.model}` : 'Producto'
}
