import { expect, it } from 'vitest'
import { normalizeText } from './normalizeText'

it('ignores case and accents', () => {
  expect(normalizeText('Teléfono MÓVIL')).toBe('telefono movil')
})
