import { useCartCount } from '../../hooks/useCartCount'
import styles from './CartCount.module.css'

/** Number of products in the cart, announced to screen readers whenever it changes. */
export function CartCount() {
  const count = useCartCount()

  return (
    <p className={styles.cartCount} aria-live="polite">
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 7h12l-1 13H7L6 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      <span className="visually-hidden">
        Cesta: {count} {count === 1 ? 'producto' : 'productos'}
      </span>
      <span className={styles.count} aria-hidden="true">
        {count}
      </span>
    </p>
  )
}
