/**
 * Products as returned by the API. Some fields have typos or mixed types; they are normalized
 * by the mappers so the rest of the application never deals with them.
 */
type TextOrList = string | string[]

export interface ProductSummaryDto {
  id: string
  brand: string
  model: string
  price: string
  imgUrl: string
}

export interface ProductDetailDto extends ProductSummaryDto {
  cpu?: TextOrList
  ram?: TextOrList
  os?: TextOrList
  /** Holds the screen size despite its name */
  displayResolution?: TextOrList
  /** Holds the screen resolution despite its name */
  displaySize?: TextOrList
  battery?: TextOrList
  primaryCamera?: TextOrList
  secondaryCmera?: TextOrList
  dimentions?: TextOrList
  weight?: string
  options: {
    colors: { code: number; name: string }[]
    storages: { code: number; name: string }[]
  }
}
