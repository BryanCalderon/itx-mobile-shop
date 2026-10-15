import { CURRENCY, LOCALE } from './constants'

const priceFormatter = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY })

export function formatPrice(price: number | null): string {
  return price === null ? 'Precio no disponible' : priceFormatter.format(price)
}
