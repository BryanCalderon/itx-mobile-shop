import type { ProductDetail } from '@/entities/product/types'
import layout from '../../styles/productDetailLayout.module.css'
import type { AddToCartStatus, ProductSelection } from '../../types'
import { ProductActions } from '../ProductActions/ProductActions'
import { ProductDescription } from '../ProductDescription/ProductDescription'
import { ProductImage } from '../ProductImage/ProductImage'
import { ProductSummaryHeader } from '../ProductSummaryHeader/ProductSummaryHeader'

interface ProductDetailViewProps {
  product: ProductDetail
  addToCartStatus: AddToCartStatus
  onAddToCart: (selection: ProductSelection) => void
}

export function ProductDetailView({
  product,
  addToCartStatus,
  onAddToCart,
}: ProductDetailViewProps) {
  const productName = `${product.brand} ${product.model}`

  return (
    <article className={layout.layout}>
      <title>{`${productName} | Mobile Shop`}</title>
      <div className={layout.media}>
        <ProductImage src={product.imageUrl} alt={productName} />
      </div>
      <div className={layout.details}>
        <ProductSummaryHeader product={product} />
        <ProductDescription product={product} />
        <ProductActions
          product={product}
          addToCartStatus={addToCartStatus}
          onAddToCart={onAddToCart}
        />
      </div>
    </article>
  )
}
