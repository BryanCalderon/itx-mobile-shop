import { generatePath, Link } from 'react-router'
import { PRODUCT_IMAGE_SIZE } from '@/entities/product/constants'
import type { ProductSummary } from '@/entities/product/types'
import { formatPrice } from '@/shared/formatPrice'
import { PATHS } from '@/shared/routing/paths'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: ProductSummary
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={generatePath(PATHS.productDetail, { id: product.id })} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.imageUrl}
          alt={`${product.brand} ${product.model}`}
          width={PRODUCT_IMAGE_SIZE.width}
          height={PRODUCT_IMAGE_SIZE.height}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <h2 className={styles.model}>{product.model}</h2>
        <p className={styles.price}>{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
