import layout from '../../styles/productDetailLayout.module.css'
import styles from './ProductDetailSkeleton.module.css'

export function ProductDetailSkeleton() {
  return (
    <div role="status">
      <span className="visually-hidden">Cargando producto</span>
      <div className={layout.layout} aria-hidden="true">
        <div className={styles.image} />
        <div className={layout.details}>
          <div className={styles.title} />
          <div className={styles.block} />
          <div className={styles.block} />
        </div>
      </div>
    </div>
  )
}
