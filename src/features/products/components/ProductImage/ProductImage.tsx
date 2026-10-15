import { PRODUCT_DETAIL_IMAGE_SCALE, PRODUCT_IMAGE_SIZE } from '../../constants'
import styles from './ProductImage.module.css'

interface ProductImageProps {
  src: string
  alt: string
}

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className={styles.imageWrapper}>
      <img
        src={src}
        alt={alt}
        width={PRODUCT_IMAGE_SIZE.width * PRODUCT_DETAIL_IMAGE_SCALE}
        height={PRODUCT_IMAGE_SIZE.height * PRODUCT_DETAIL_IMAGE_SCALE}
      />
    </div>
  )
}
