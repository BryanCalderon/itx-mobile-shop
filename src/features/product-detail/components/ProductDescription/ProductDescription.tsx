import { useId } from 'react'
import type { ProductDetail } from '@/entities/product/types'
import { getProductSpecs } from '../../utils/getProductSpecs'
import styles from './ProductDescription.module.css'

interface ProductDescriptionProps {
  product: ProductDetail
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  const titleId = useId()

  return (
    <section aria-labelledby={titleId} className={styles.description}>
      <h2 id={titleId} className={styles.title}>
        Características
      </h2>
      <dl className={styles.specs}>
        {getProductSpecs(product).map(({ label, value }) => (
          <div key={label} className={styles.spec}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
