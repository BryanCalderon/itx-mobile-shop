import { screen, within } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { API_BASE_URL } from '@/api/apiConfig'
import { API_ENDPOINTS } from '@/api/endpoints'
import { renderApp } from '@/test/renderApp'
import { server } from '@/test/server'

describe('ProductListPage', () => {
  it('shows a loading state while the products are fetched', () => {
    renderApp('/')

    expect(screen.getByRole('status')).toHaveTextContent('Cargando productos')
  })

  it('shows every product with its image, brand, model and price', async () => {
    renderApp('/')

    const items = within(await findProductList()).getAllByRole('listitem')
    expect(items).toHaveLength(3)
    const firstProduct = within(items[0]!)
    expect(firstProduct.getByRole('img', { name: 'Acer Iconia Talk S' })).toHaveAttribute(
      'src',
      'https://images.test/acer-1.jpg',
    )
    expect(firstProduct.getByText('Acer')).toBeInTheDocument()
    expect(firstProduct.getByRole('heading', { name: 'Iconia Talk S' })).toBeInTheDocument()
    expect(firstProduct.getByText('170,00 €')).toBeInTheDocument()
    expect(screen.getByText('3 productos')).toBeInTheDocument()
  })

  it('tells when a product has no price', async () => {
    renderApp('/')

    const product = await screen.findByRole('link', { name: /Liquid Jade 2/ })
    expect(product).toHaveTextContent('Precio no disponible')
  })

  it('links each product to its detail page', async () => {
    renderApp('/')

    expect(await screen.findByRole('link', { name: /Iconia Talk S/ })).toHaveAttribute(
      'href',
      '/product/acer-1',
    )
  })

  it('lets the user retry when the products cannot be loaded', async () => {
    server.use(
      http.get(`${API_BASE_URL}${API_ENDPOINTS.products}`, () => HttpResponse.error(), {
        once: true,
      }),
    )
    const { user } = renderApp('/')

    await user.click(await screen.findByRole('button', { name: 'Reintentar' }))

    expect(within(await findProductList()).getAllByRole('listitem')).toHaveLength(3)
  })

  describe('search', () => {
    it('filters the products by brand and model while the user types', async () => {
      const { user } = renderApp('/')
      await findProductList()

      await user.type(searchInput(), 'acer')
      expect(await findProductNames()).toEqual(['Iconia Talk S', 'Liquid Jade 2'])
      expect(screen.getByRole('status')).toHaveTextContent('2 productos')

      await user.type(searchInput(), ' jade')
      expect(await findProductNames()).toEqual(['Liquid Jade 2'])
      expect(screen.getByRole('status')).toHaveTextContent('1 producto')
    })

    it('tells when no product matches the search', async () => {
      const { user } = renderApp('/')
      await findProductList()

      await user.type(searchInput(), 'nokia')

      expect(await screen.findByText('No hay productos que coincidan con «nokia».')).toBeVisible()
      expect(screen.getByRole('status')).toHaveTextContent('0 productos')
    })

    it('keeps the search in the URL', async () => {
      const { router, user } = renderApp('/')
      await findProductList()

      await user.type(searchInput(), 'pop')

      expect(router.state.location.search).toBe('?search=pop')
    })

    it('restores the search from the URL', async () => {
      renderApp('/?search=alcatel')

      expect(await findProductNames()).toEqual(['Pop 4'])
      expect(searchInput()).toHaveValue('alcatel')
    })

    it('shows every product again when the search is cleared', async () => {
      const { router, user } = renderApp('/?search=alcatel')
      await findProductList()

      await user.clear(searchInput())

      expect(await findProductNames()).toHaveLength(3)
      expect(router.state.location.search).toBe('')
    })
  })
})

function findProductList() {
  return screen.findByRole('list', { name: 'Productos' })
}

async function findProductNames() {
  const productList = await findProductList()
  return within(productList)
    .getAllByRole('heading')
    .map((heading) => heading.textContent)
}

function searchInput() {
  return screen.getByRole('searchbox', { name: 'Buscar por marca o modelo' })
}
