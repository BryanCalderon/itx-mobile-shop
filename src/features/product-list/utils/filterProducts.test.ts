import { describe, expect, it } from 'vitest'
import type { ProductSummary } from '@/entities/product/types'
import { filterProducts } from './filterProducts'

const products: ProductSummary[] = [
  { id: '1', brand: 'Acer', model: 'Iconia Talk S', price: 170, imageUrl: '' },
  { id: '2', brand: 'Acer', model: 'Liquid Jade 2', price: null, imageUrl: '' },
  { id: '3', brand: 'Alcatel', model: 'Pop 4', price: 90, imageUrl: '' },
]

function filteredIds(query: string) {
  return filterProducts(products, query).map((product) => product.id)
}

describe('filterProducts', () => {
  it('keeps every product when the query is empty', () => {
    expect(filteredIds('')).toEqual(['1', '2', '3'])
    expect(filteredIds('   ')).toEqual(['1', '2', '3'])
  })

  it('matches the brand', () => {
    expect(filteredIds('alcatel')).toEqual(['3'])
  })

  it('matches the model', () => {
    expect(filteredIds('jade')).toEqual(['2'])
  })

  it('ignores case and accents', () => {
    expect(filteredIds('ÁCER')).toEqual(['1', '2'])
  })

  it('requires every word of the query, in brand or model', () => {
    expect(filteredIds('acer liquid')).toEqual(['2'])
    expect(filteredIds('liquid alcatel')).toEqual([])
  })
})
