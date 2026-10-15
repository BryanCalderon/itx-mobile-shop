import type { ProductDetail } from '@/entities/product/types'
import layout from '../../styles/productDetailLayout.module.css'
import { ProductActions } from '../ProductActions/ProductActions'
import { ProductDescription } from '../ProductDescription/ProductDescription'
import { ProductImage } from '../ProductImage/ProductImage'
import { ProductSummaryHeader } from '../ProductSummaryHeader/ProductSummaryHeader'

interface ProductDetailViewProps {
  product: ProductDetail
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const productName = `${product.brand} ${product.model}`

  return (
    <article className={layout.layout}>
      <title>{`${productName} | Mobile Shop`}</title>
      <ProductImage src={product.imageUrl} alt={productName} />
      <div className={layout.details}>
        <ProductSummaryHeader product={product} />
        <ProductDescription product={product} />
        <ProductActions product={product} />
      </div>
    </article>
  )
}
