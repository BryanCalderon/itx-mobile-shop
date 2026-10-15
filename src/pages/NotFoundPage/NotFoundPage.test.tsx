import { screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { renderApp } from '@/test/renderApp'

it('shows a not found page for unknown routes', () => {
  renderApp('/unknown-page')

  expect(screen.getByRole('heading', { name: 'Página no encontrada' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Volver al listado' })).toHaveAttribute('href', '/')
})
