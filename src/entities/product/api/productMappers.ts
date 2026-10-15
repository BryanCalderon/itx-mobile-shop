import type { ProductDetail, ProductSummary } from '../types'
import type { ProductDetailDto, ProductSummaryDto } from './productDto'

export function toProductSummary(dto: ProductSummaryDto): ProductSummary {
  return {
    id: dto.id,
    brand: dto.brand,
    model: dto.model,
    price: toNumber(dto.price),
    imageUrl: dto.imgUrl,
  }
}

export function toProductDetail(dto: ProductDetailDto): ProductDetail {
  return {
    ...toProductSummary(dto),
    cpu: toText(dto.cpu),
    ram: toText(dto.ram),
    os: toText(dto.os),
    screenSize: toText(dto.displayResolution),
    screenResolution: toText(dto.displaySize),
    battery: toText(dto.battery),
    primaryCamera: toList(dto.primaryCamera),
    secondaryCamera: toList(dto.secondaryCmera),
    dimensions: toText(dto.dimentions),
    weight: toNumber(dto.weight),
    options: {
      colors: dto.options.colors,
      storages: dto.options.storages,
    },
  }
}

function toList(value: string | string[] | undefined): string[] {
  const values = Array.isArray(value) ? value : [value ?? '']
  return values.map((item) => item.trim()).filter((item) => item !== '')
}

function toText(value: string | string[] | undefined): string | null {
  const values = toList(value)
  return values.length > 0 ? values.join(', ') : null
}

function toNumber(value: string | undefined): number | null {
  if (value === undefined || value.trim() === '') {
    return null
  }
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}
