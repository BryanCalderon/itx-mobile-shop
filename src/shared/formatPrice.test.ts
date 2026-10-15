import { expect, it } from 'vitest'
import { formatPrice } from './formatPrice'

it('formats prices in euros, with a non-breaking space before the symbol', () => {
  expect(formatPrice(170)).toBe('170,00\u00a0€')
  expect(formatPrice(1299.5)).toBe('1299,50\u00a0€')
})

it('reports products without price', () => {
  expect(formatPrice(null)).toBe('Precio no disponible')
})
