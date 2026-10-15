import { useState } from 'react'
import type { ProductOption } from '@/entities/product/types'

/** Selected option code. A single option is selected from the start, as there is nothing to choose. */
export function useOptionSelection(options: ProductOption[]) {
  return useState<number | null>(() => (options.length === 1 ? options[0]!.code : null))
}
