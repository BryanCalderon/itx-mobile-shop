import { describe, expect, it } from 'vitest'

import { productDetailDto } from '../../../test/fixtures'
import { toProductDetail, toProductSummary } from './productMappers'

describe('toProductSummary', () => {
  it('maps the price to a number', () => {
    expect(toProductSummary({ ...productDetailDto, price: '170' }).price).toBe(170)
  })

  it('maps a missing price to null', () => {
    expect(toProductSummary({ ...productDetailDto, price: '' }).price).toBeNull()
  })

  it('renames the image url', () => {
    expect(toProductSummary(productDetailDto).imageUrl).toBe('https://images.test/acer-1.jpg')
  })
})

describe('toProductDetail', () => {
  it('fixes the swapped screen size and resolution', () => {
    const product = toProductDetail(productDetailDto)

    expect(product.screenSize).toBe('7.0 inches (~69.8% screen-to-body ratio)')
    expect(product.screenResolution).toBe('720 x 1280 pixels (~210 ppi pixel density)')
  })

  it('reads the fields misspelled by the API', () => {
    const product = toProductDetail(productDetailDto)

    expect(product.dimensions).toBe('191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)')
    expect(product.secondaryCamera).toEqual(['2 MP', '720p'])
  })

  it('normalizes values that come either as text or as a list', () => {
    const product = toProductDetail({
      ...productDetailDto,
      os: ['Android 4.2.2 (Jelly Bean)', 'planned upgrade to 4.4'],
      primaryCamera: '5 MP',
    })

    expect(product.os).toBe('Android 4.2.2 (Jelly Bean), planned upgrade to 4.4')
    expect(product.primaryCamera).toEqual(['5 MP'])
  })

  it('maps empty or missing values to null or an empty list', () => {
    const product = toProductDetail({
      ...productDetailDto,
      weight: '',
      cpu: undefined,
      ram: '  ',
      secondaryCmera: [],
    })

    expect(product.weight).toBeNull()
    expect(product.cpu).toBeNull()
    expect(product.ram).toBeNull()
    expect(product.secondaryCamera).toEqual([])
  })

  it('keeps the color and storage options', () => {
    expect(toProductDetail(productDetailDto).options).toEqual(productDetailDto.options)
  })
})
