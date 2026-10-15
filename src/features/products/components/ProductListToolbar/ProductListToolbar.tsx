import { ProductCount } from '../ProductCount/ProductCount'
import { SearchBar } from '../SearchBar/SearchBar'
import styles from './ProductListToolbar.module.css'

interface ProductListToolbarProps {
  titleId: string
  /** Number of products shown, or `undefined` while they are loading */
  productCount: number | undefined
  query: string
  onQueryChange: (query: string) => void
}

export function ProductListToolbar({
  titleId,
  productCount,
  query,
  onQueryChange,
}: ProductListToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.heading}>
        <h1 id={titleId} className={styles.title}>
          Móviles
        </h1>
        {productCount !== undefined && <ProductCount count={productCount} />}
      </div>
      <SearchBar value={query} onChange={onQueryChange} />
    </div>
  )
}
