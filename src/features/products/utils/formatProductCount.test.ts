import { expect, it } from 'vitest'
import { formatProductCount } from './formatProductCount'

it('uses the singular only for one product', () => {
  expect(formatProductCount(0)).toBe('0 productos')
  expect(formatProductCount(1)).toBe('1 producto')
  expect(formatProductCount(100)).toBe('100 productos')
})
