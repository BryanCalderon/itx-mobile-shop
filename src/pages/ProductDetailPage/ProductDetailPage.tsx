import { useParams } from 'react-router'
import { PATHS } from '@/app/paths'
import { BackLink } from '@/components/BackLink/BackLink'
import { ErrorState } from '@/components/ErrorState/ErrorState'
import { ProductDetailLoading } from '@/features/products/components/ProductDetailLoading/ProductDetailLoading'
import { ProductDetailView } from '@/features/products/components/ProductDetailView/ProductDetailView'
import { useProduct } from '@/features/products/hooks/useProduct'

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
