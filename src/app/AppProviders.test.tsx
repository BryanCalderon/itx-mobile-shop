import { render, screen, waitFor } from '@testing-library/react'
import { expect, it } from 'vitest'

import { useProducts } from '../features/products/queries'
import { AppProviders } from './AppProviders'

function ProductCount() {
  const { data } = useProducts()
  return <p>{data ? `${data.length} products` : 'Loading'}</p>
}

it('persists API responses in localStorage', async () => {
  render(
    <AppProviders>
      <ProductCount />
    </AppProviders>,
  )

  expect(await screen.findByText('3 products')).toBeInTheDocument()
  await waitFor(
    () => expect(localStorage.getItem('mobile-shop:query-cache')).toContain('Iconia Talk S'),
    { timeout: 2_000 },
  )
})
