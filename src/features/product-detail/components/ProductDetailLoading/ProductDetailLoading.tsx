import { SlowLoadingNotice } from '@/components/SlowLoadingNotice/SlowLoadingNotice'
import { ProductDetailSkeleton } from '../ProductDetailSkeleton/ProductDetailSkeleton'

export function ProductDetailLoading() {
  return (
    <>
      <SlowLoadingNotice />
      <ProductDetailSkeleton />
    </>
  )
}
