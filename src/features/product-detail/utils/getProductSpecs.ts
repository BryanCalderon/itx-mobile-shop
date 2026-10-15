import type { ProductDetail } from '@/entities/product/types'
import { NOT_AVAILABLE } from '@/shared/constants'
import { formatPrice } from '@/shared/formatPrice'

export interface ProductSpec {
  label: string
  value: string
}

/** Attributes shown in the product description, with missing values made explicit. */
export function getProductSpecs(product: ProductDetail): ProductSpec[] {
  return [
    { label: 'Marca', value: product.brand },
    { label: 'Modelo', value: product.model },
    { label: 'Precio', value: formatPrice(product.price) },
    { label: 'CPU', value: orNotAvailable(product.cpu) },
    { label: 'RAM', value: orNotAvailable(product.ram) },
    { label: 'Sistema operativo', value: orNotAvailable(product.os) },
    { label: 'Pantalla', value: orNotAvailable(product.screenSize) },
    { label: 'Resolución de pantalla', value: orNotAvailable(product.screenResolution) },
    { label: 'Batería', value: orNotAvailable(product.battery) },
    { label: 'Cámara principal', value: joinOrNotAvailable(product.primaryCamera) },
    { label: 'Cámara frontal', value: joinOrNotAvailable(product.secondaryCamera) },
    { label: 'Dimensiones', value: orNotAvailable(product.dimensions) },
    { label: 'Peso', value: product.weight === null ? NOT_AVAILABLE : `${product.weight} g` },
  ]
}

function orNotAvailable(value: string | null): string {
  return value ?? NOT_AVAILABLE
}

function joinOrNotAvailable(values: string[]): string {
  return values.length > 0 ? values.join(', ') : NOT_AVAILABLE
}
