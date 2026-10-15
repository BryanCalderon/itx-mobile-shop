import type { ProductDetail } from '@/entities/product/types'
import { useOptionSelection } from '../../hooks/useOptionSelection'
import type { AddToCartStatus, ProductSelection } from '../../types'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
import { OptionSelector } from '../OptionSelector/OptionSelector'
import styles from './ProductActions.module.css'

interface ProductActionsProps {
  product: ProductDetail
  addToCartStatus: AddToCartStatus
  onAddToCart: (selection: ProductSelection) => void
}

export function ProductActions({ product, addToCartStatus, onAddToCart }: ProductActionsProps) {
  const [storageCode, setStorageCode] = useOptionSelection(product.options.storages)
  const [colorCode, setColorCode] = useOptionSelection(product.options.colors)
  const selection = storageCode !== null && colorCode !== null ? { storageCode, colorCode } : null

  return (
    <section aria-label="Opciones de compra" className={styles.actions}>
      <OptionSelector
        legend="Almacenamiento"
        options={product.options.storages}
        selectedCode={storageCode}
        onChange={setStorageCode}
      />
      <OptionSelector
        legend="Color"
        options={product.options.colors}
        selectedCode={colorCode}
        onChange={setColorCode}
      />
      <AddToCartButton
        isSelectionComplete={selection !== null}
        isAdding={addToCartStatus === 'pending'}
        onClick={() => selection && onAddToCart(selection)}
      />
    </section>
  )
}
