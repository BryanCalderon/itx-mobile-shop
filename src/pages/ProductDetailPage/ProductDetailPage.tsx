import { useParams } from 'react-router'
import { BackLink } from '@/components/BackLink/BackLink'
import { ErrorState } from '@/components/ErrorState/ErrorState'
import { useAddToCart } from '@/entities/cart/hooks/useAddToCart'
import { useProduct } from '@/entities/product/hooks/useProduct'
import { AddToCartFeedback } from '@/features/product-detail/components/AddToCartFeedback/AddToCartFeedback'
import { ProductDetailLoading } from '@/features/product-detail/components/ProductDetailLoading/ProductDetailLoading'
import { ProductDetailView } from '@/features/product-detail/components/ProductDetailView/ProductDetailView'
import { PATHS } from '@/shared/routing/paths'

export function ProductDetailPage() {
  const { id = '' } = useParams()
  const { data: product, isPending, isError, refetch } = useProduct(id)
  const addToCart = useAddToCart()

  return (
    <>
      <BackLink fallbackTo={PATHS.home}>Volver al listado</BackLink>
      {/* A failed background refetch keeps the product, which is still worth showing */}
      {isError && !product && (
        <ErrorState title="No se ha podido cargar el producto" onRetry={() => void refetch()} />
      )}
      {isPending && <ProductDetailLoading />}
      {product && (
        <ProductDetailView
          product={product}
          addToCartStatus={addToCart.status}
          onAddToCart={(selection) => addToCart.mutate({ productId: product.id, ...selection })}
        />
      )}
      <AddToCartFeedback status={addToCart.status} onDismiss={addToCart.reset} />
    </>
  )
}
