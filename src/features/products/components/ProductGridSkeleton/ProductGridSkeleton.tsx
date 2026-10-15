import { PRODUCT_GRID_SKELETON_ITEMS } from '../../constants'
import layout from '../../styles/productGridLayout.module.css'
import styles from './ProductGridSkeleton.module.css'

export function ProductGridSkeleton() {
  return (
    <div role="status">
      <span className="visually-hidden">Cargando productos</span>
      <ul className={layout.grid} aria-hidden="true">
        {Array.from({ length: PRODUCT_GRID_SKELETON_ITEMS }, (_, index) => (
          <li key={index} className={styles.skeleton} />
        ))}
      </ul>
    </div>
  )
}
