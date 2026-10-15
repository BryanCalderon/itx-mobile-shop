import type { ProductDetail } from '@/entities/product/types'
import { formatPrice } from '@/shared/formatPrice'
import styles from './ProductSummaryHeader.module.css'

interface ProductSummaryHeaderProps {
  product: ProductDetail
}

export function ProductSummaryHeader({ product }: ProductSummaryHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.brand}>{product.brand}</p>
      <h1 className={styles.model}>{product.model}</h1>
      <p className={styles.price}>{formatPrice(product.price)}</p>
    </header>
  )
}
