import { render, screen, waitFor } from '@testing-library/react'
import { expect, it } from 'vitest'
import { useProducts } from '@/features/products/hooks/useProducts'
import { AppProviders } from './AppProviders'
import { QUERY_CACHE_STORAGE_KEY } from './constants'

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
    () => expect(localStorage.getItem(QUERY_CACHE_STORAGE_KEY)).toContain('Iconia Talk S'),
    { timeout: 2_000 },
  )
})
