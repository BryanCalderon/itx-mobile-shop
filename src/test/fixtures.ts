import type { ProductDetailDto, ProductSummaryDto } from '@/features/products/api/productDto'

export const productSummaryDtos: ProductSummaryDto[] = [
  {
    id: 'acer-1',
    brand: 'Acer',
    model: 'Iconia Talk S',
    price: '170',
    imgUrl: 'https://images.test/acer-1.jpg',
  },
  {
    id: 'acer-2',
    brand: 'Acer',
    model: 'Liquid Jade 2',
    price: '',
    imgUrl: 'https://images.test/acer-2.jpg',
  },
  {
    id: 'alcatel-1',
    brand: 'Alcatel',
    model: 'Pop 4',
    price: '90',
    imgUrl: 'https://images.test/alcatel-1.jpg',
  },
]

export const productDetailDto: ProductDetailDto = {
  id: 'acer-1',
  brand: 'Acer',
  model: 'Iconia Talk S',
  price: '170',
  imgUrl: 'https://images.test/acer-1.jpg',
  cpu: 'Quad-core 1.3 GHz Cortex-A53',
  ram: '2 GB RAM',
  os: 'Android 6.0 (Marshmallow)',
  displayResolution: '7.0 inches (~69.8% screen-to-body ratio)',
  displaySize: '720 x 1280 pixels (~210 ppi pixel density)',
  battery: 'Non-removable Li-Ion 3400 mAh battery (12.92 Wh)',
  primaryCamera: ['13 MP', 'autofocus'],
  secondaryCmera: ['2 MP', '720p'],
  dimentions: '191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)',
  weight: '260',
  options: {
    colors: [{ code: 1000, name: 'Black' }],
    storages: [
      { code: 2000, name: '16 GB' },
      { code: 2001, name: '32 GB' },
    ],
  },
}
