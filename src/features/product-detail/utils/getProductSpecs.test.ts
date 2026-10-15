import { describe, expect, it } from 'vitest'
import { toProductDetail } from '@/entities/product/api/productMappers'
import { productDetailDto } from '@/test/fixtures'
import { getProductSpecs } from './getProductSpecs'

const product = toProductDetail(productDetailDto)

function specsOf(...args: Parameters<typeof getProductSpecs>) {
  return Object.fromEntries(getProductSpecs(...args).map(({ label, value }) => [label, value]))
}

describe('getProductSpecs', () => {
  it('lists every attribute required for the description', () => {
    expect(specsOf(product)).toEqual({
      Marca: 'Acer',
      Modelo: 'Iconia Talk S',
      Precio: '170,00 €',
      CPU: 'Quad-core 1.3 GHz Cortex-A53',
      RAM: '2 GB RAM',
      'Sistema operativo': 'Android 6.0 (Marshmallow)',
      Pantalla: '7.0 inches (~69.8% screen-to-body ratio)',
      'Resolución de pantalla': '720 x 1280 pixels (~210 ppi pixel density)',
      Batería: 'Non-removable Li-Ion 3400 mAh battery (12.92 Wh)',
      'Cámara principal': '13 MP, autofocus',
      'Cámara frontal': '2 MP, 720p',
      Dimensiones: '191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)',
      Peso: '260 g',
    })
  })

  it('makes missing values explicit', () => {
    const specs = specsOf({ ...product, cpu: null, weight: null, secondaryCamera: [] })

    expect(specs.CPU).toBe('No disponible')
    expect(specs.Peso).toBe('No disponible')
    expect(specs['Cámara frontal']).toBe('No disponible')
  })
})
