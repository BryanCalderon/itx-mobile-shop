import { useParams } from 'react-router'
import { BackLink } from '@/components/BackLink/BackLink'
import { ErrorState } from '@/components/ErrorState/ErrorState'
import { useProduct } from '@/entities/product/hooks/useProduct'
import { ProductDetailLoading } from '@/features/product-detail/components/ProductDetailLoading/ProductDetailLoading'
import { ProductDetailView } from '@/features/product-detail/components/ProductDetailView/ProductDetailView'
import { PATHS } from '@/shared/routing/paths'

export function ProductDetailPage() {
  const { id = '' } = useParams()
  const { data: product, isPending, isError, refetch } = useProduct(id)

  return (
    <>
      <BackLink fallbackTo={PATHS.home}>Volver al listado</BackLink>
      {/* A failed background refetch keeps the product, which is still worth showing */}
      {isError && !product && (
        <ErrorState title="No se ha podido cargar el producto" onRetry={() => void refetch()} />
      )}
      {isPending && <ProductDetailLoading />}
      {product && <ProductDetailView product={product} />}
    </>
  )
}
