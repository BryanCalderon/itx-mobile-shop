import type { ProductDetail } from '@/entities/product/types'
import { useOptionSelection } from '../../hooks/useOptionSelection'
import { OptionSelector } from '../OptionSelector/OptionSelector'
import styles from './ProductActions.module.css'

interface ProductActionsProps {
  product: ProductDetail
}

export function ProductActions({ product }: ProductActionsProps) {
  const [storageCode, setStorageCode] = useOptionSelection(product.options.storages)
  const [colorCode, setColorCode] = useOptionSelection(product.options.colors)

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
    </section>
  )
}
