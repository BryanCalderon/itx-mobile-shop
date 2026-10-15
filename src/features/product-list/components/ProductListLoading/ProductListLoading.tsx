import { SlowLoadingNotice } from '@/components/SlowLoadingNotice/SlowLoadingNotice'
import { ProductGridSkeleton } from '../ProductGridSkeleton/ProductGridSkeleton'

export function ProductListLoading() {
  return (
    <>
      <SlowLoadingNotice />
      <ProductGridSkeleton />
    </>
  )
}
