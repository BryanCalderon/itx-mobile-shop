import { describe, expect, it } from 'vitest'

import { ApiError } from '../../../api/httpClient'
import { fetchProduct, fetchProducts } from './productApi'

describe('productApi', () => {
  it('fetches and maps the product list', async () => {
    const products = await fetchProducts()

    expect(products).toHaveLength(3)
    expect(products[0]).toEqual({
      id: 'acer-1',
      brand: 'Acer',
      model: 'Iconia Talk S',
      price: 170,
      imageUrl: 'https://images.test/acer-1.jpg',
    })
  })

  it('fetches and maps a product detail', async () => {
    const product = await fetchProduct('acer-1')

    expect(product.model).toBe('Iconia Talk S')
    expect(product.screenResolution).toBe('720 x 1280 pixels (~210 ppi pixel density)')
  })

  it('fails with the response status when the API fails', async () => {
    await expect(fetchProduct('unknown')).rejects.toEqual(expect.any(ApiError))
    await expect(fetchProduct('unknown')).rejects.toMatchObject({ status: 500 })
  })
})
