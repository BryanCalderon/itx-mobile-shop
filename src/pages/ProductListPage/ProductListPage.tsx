import { SlowLoadingNotice } from '@/components/SlowLoadingNotice/SlowLoadingNotice'
import { StatusMessage } from '@/components/StatusMessage/StatusMessage'
import { ProductGrid } from '@/features/products/components/ProductGrid/ProductGrid'
import { ProductGridSkeleton } from '@/features/products/components/ProductGridSkeleton/ProductGridSkeleton'
import { useProducts } from '@/features/products/hooks/useProducts'
import styles from './ProductListPage.module.css'

export function ProductListPage() {
  const { data: products, isPending, isError, refetch } = useProducts()

  if (isError) {
    return (
      <StatusMessage
        title="No se han podido cargar los productos"
        description="Comprueba tu conexión e inténtalo de nuevo."
        action={
          <button type="button" onClick={() => void refetch()}>
            Reintentar
          </button>
        }
      />
    )
  }

  return (
    <section aria-labelledby="product-list-title">
      <div className={styles.toolbar}>
        <h1 id="product-list-title" className={styles.title}>
          Móviles
        </h1>
        {products && <p className={styles.count}>{products.length} productos</p>}
      </div>
      {isPending ? (
        <>
          <SlowLoadingNotice />
          <ProductGridSkeleton />
        </>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  )
}
