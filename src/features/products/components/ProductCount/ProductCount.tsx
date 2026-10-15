import { formatProductCount } from '../../utils/formatProductCount'
import styles from './ProductCount.module.css'

interface ProductCountProps {
  count: number
}

/** Product count, announced to screen readers whenever it changes. */
export function ProductCount({ count }: ProductCountProps) {
  return (
    <p role="status" className={styles.count}>
      {formatProductCount(count)}
    </p>
  )
}
