export interface ProductSummary {
  id: string
  brand: string
  model: string
  /** `null` when the product has no price */
  price: number | null
  imageUrl: string
}

export interface ProductOption {
  code: number
  name: string
}

export interface ProductDetail extends ProductSummary {
  cpu: string | null
  ram: string | null
  os: string | null
  screenSize: string | null
  screenResolution: string | null
  battery: string | null
  primaryCamera: string[]
  secondaryCamera: string[]
  dimensions: string | null
  /** Grams */
  weight: number | null
  options: {
    colors: ProductOption[]
    storages: ProductOption[]
  }
}
