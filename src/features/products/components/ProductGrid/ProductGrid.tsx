import layout from '../../styles/productGridLayout.module.css'
import type { ProductSummary } from '../../types'
import { ProductCard } from '../ProductCard/ProductCard'

interface ProductGridProps {
  products: ProductSummary[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className={layout.grid} aria-label="Productos">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
