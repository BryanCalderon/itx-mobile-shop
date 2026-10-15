import { useId } from 'react'
import styles from './AddToCartButton.module.css'

interface AddToCartButtonProps {
  /** Whether every option has been selected */
  isSelectionComplete: boolean
  isAdding: boolean
  onClick: () => void
}

export function AddToCartButton({ isSelectionComplete, isAdding, onClick }: AddToCartButtonProps) {
  const hintId = useId()

  return (
    <div className={styles.addToCart}>
      <button
        type="button"
        className={styles.button}
        disabled={!isSelectionComplete || isAdding}
        aria-describedby={isSelectionComplete ? undefined : hintId}
        onClick={onClick}
      >
        {isAdding ? 'Añadiendo…' : 'Añadir a la cesta'}
      </button>
      {!isSelectionComplete && (
        <p id={hintId} className={styles.hint}>
          Selecciona el almacenamiento y el color.
        </p>
      )}
    </div>
  )
}
