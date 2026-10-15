import { screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { renderApp } from '@/test/renderApp'

it('links the application title to the product list', () => {
  renderApp('/unknown-page')

  expect(screen.getByRole('link', { name: 'Mobile Shop' })).toHaveAttribute('href', '/')
})

it('shows the current page in the breadcrumbs', () => {
  renderApp('/')

  const breadcrumbs = screen.getByRole('navigation', { name: 'Ruta de navegación' })
  expect(breadcrumbs).toHaveTextContent('Móviles')
  expect(screen.getByText('Móviles', { selector: '[aria-current="page"]' })).toBeInTheDocument()
})
