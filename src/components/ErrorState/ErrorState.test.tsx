import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { ErrorState } from './ErrorState'

it('lets the user retry the failed action', async () => {
  const onRetry = vi.fn()
  render(<ErrorState title="No se ha podido cargar" onRetry={onRetry} />)

  await userEvent.click(screen.getByRole('button', { name: 'Reintentar' }))

  expect(screen.getByRole('heading', { name: 'No se ha podido cargar' })).toBeInTheDocument()
  expect(onRetry).toHaveBeenCalledOnce()
})
