import { useId } from 'react'
import { ErrorState } from '@/components/ErrorState/ErrorState'
import { ProductListLoading } from '@/features/products/components/ProductListLoading/ProductListLoading'
import { ProductListToolbar } from '@/features/products/components/ProductListToolbar/ProductListToolbar'
import { ProductSearchResults } from '@/features/products/components/ProductSearchResults/ProductSearchResults'
import { useProducts } from '@/features/products/hooks/useProducts'
import { useProductSearch } from '@/features/products/hooks/useProductSearch'

export function ProductListPage() {
  const titleId = useId()
  const { data: products, isPending, isError, refetch } = useProducts()
  const { query, setQuery, searchedQuery, results } = useProductSearch(products)

  if (isError) {
    return (
      <ErrorState title="No se han podido cargar los productos" onRetry={() => void refetch()} />
    )
  }

  return (
    <section aria-labelledby={titleId}>
      <ProductListToolbar
        titleId={titleId}
        productCount={isPending ? undefined : results.length}
        query={query}
        onQueryChange={setQuery}
      />
      {isPending ? (
        <ProductListLoading />
      ) : (
        <ProductSearchResults products={results} query={searchedQuery} />
      )}
    </section>
  )
}
