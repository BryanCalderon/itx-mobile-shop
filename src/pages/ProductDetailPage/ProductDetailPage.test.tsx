import { cleanup, screen, waitFor, within } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { API_BASE_URL } from '@/api/apiConfig'
import { API_ENDPOINTS } from '@/api/endpoints'
import { renderApp } from '@/test/renderApp'
import { server } from '@/test/server'

describe('ProductDetailPage', () => {
  it('shows a loading state while the product is fetched', () => {
    renderApp('/product/acer-1')

    expect(screen.getByRole('status')).toHaveTextContent('Cargando producto')
  })

  it('shows the product image, name and price', async () => {
    renderApp('/product/acer-1')

    expect(await screen.findByRole('heading', { level: 1, name: 'Iconia Talk S' })).toBeVisible()
    expect(screen.getByRole('img', { name: 'Acer Iconia Talk S' })).toHaveAttribute(
      'src',
      'https://images.test/acer-1.jpg',
    )
    expect(screen.getAllByText('170,00 €').length).toBeGreaterThan(0)
    await waitFor(() => expect(document.title).toBe('Acer Iconia Talk S | Mobile Shop'))
  })

  it('describes the product with every required attribute', async () => {
    renderApp('/product/acer-1')

    const description = await screen.findByRole('region', { name: 'Características' })
    const labels = within(description)
      .getAllByRole('term')
      .map((term) => term.textContent)
    expect(labels).toEqual(
      expect.arrayContaining([
        'Marca',
        'Modelo',
        'Precio',
        'CPU',
        'RAM',
        'Sistema operativo',
        'Resolución de pantalla',
        'Batería',
        'Cámara principal',
        'Cámara frontal',
        'Dimensiones',
        'Peso',
      ]),
    )
  })

  it('selects by default the options that have no alternative', async () => {
    renderApp('/product/acer-1')

    const colors = await screen.findByRole('group', { name: 'Color' })
    expect(within(colors).getByRole('radio', { name: 'Black' })).toBeChecked()
    const storages = screen.getByRole('group', { name: 'Almacenamiento' })
    expect(within(storages).getByRole('radio', { name: '16 GB' })).not.toBeChecked()
    expect(within(storages).getByRole('radio', { name: '32 GB' })).not.toBeChecked()
  })

  it('lets the user choose among several options', async () => {
    const { user } = renderApp('/product/acer-1')

    await user.click(await screen.findByRole('radio', { name: '32 GB' }))

    expect(screen.getByRole('radio', { name: '32 GB' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '16 GB' })).not.toBeChecked()
  })

  it('shows the product in the breadcrumbs', async () => {
    renderApp('/product/acer-1')

    const breadcrumbs = screen.getByRole('navigation', { name: 'Ruta de navegación' })
    expect(within(breadcrumbs).getByRole('link', { name: 'Móviles' })).toHaveAttribute('href', '/')
    expect(
      await within(breadcrumbs).findByText('Acer Iconia Talk S', {
        selector: '[aria-current="page"]',
      }),
    ).toBeInTheDocument()
  })

  it('goes back to the list keeping the search', async () => {
    const { router, user } = renderApp(['/?search=iconia', '/product/acer-1'])

    await user.click(screen.getByRole('link', { name: /Volver al listado/ }))

    expect(router.state.location.pathname).toBe('/')
    expect(router.state.location.search).toBe('?search=iconia')
  })

  it('goes to the list when there is no previous page', async () => {
    const { router, user } = renderApp('/product/acer-1')

    await user.click(screen.getByRole('link', { name: /Volver al listado/ }))

    expect(router.state.location.pathname).toBe('/')
  })

  it('lets the user retry when the product cannot be loaded', async () => {
    renderApp('/product/unknown')

    expect(
      await screen.findByRole('heading', { name: 'No se ha podido cargar el producto' }),
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument()
  })

  it('opens from the product list', async () => {
    const { user } = renderApp('/')

    await user.click(await screen.findByRole('link', { name: /Iconia Talk S/ }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Iconia Talk S' })).toBeVisible()
  })

  describe('add to cart', () => {
    it('is not possible until every option is selected', async () => {
      const { user } = renderApp('/product/acer-1')

      const addButton = await screen.findByRole('button', { name: 'Añadir a la cesta' })
      expect(addButton).toBeDisabled()
      expect(addButton).toHaveAccessibleDescription('Selecciona el almacenamiento y el color.')

      await user.click(screen.getByRole('radio', { name: '32 GB' }))

      expect(addButton).toBeEnabled()
    })

    it('sends the product with the selected options and updates the cart count', async () => {
      let requestBody: unknown
      server.use(
        http.post(`${API_BASE_URL}${API_ENDPOINTS.cart}`, async ({ request }) => {
          requestBody = await request.json()
          return HttpResponse.json({ count: 1 })
        }),
      )
      const { user } = renderApp('/product/acer-1')
      expect(cartCount()).toHaveTextContent('Cesta: 0 productos')

      await user.click(await screen.findByRole('radio', { name: '32 GB' }))
      await user.click(screen.getByRole('button', { name: 'Añadir a la cesta' }))

      expect(await screen.findByText('Producto añadido a la cesta.')).toBeVisible()
      expect(requestBody).toEqual({ id: 'acer-1', colorCode: 1000, storageCode: 2001 })
      expect(cartCount()).toHaveTextContent('Cesta: 1 producto')
    })

    it('accumulates the products added', async () => {
      const { user } = renderApp('/product/acer-1')
      await user.click(await screen.findByRole('radio', { name: '16 GB' }))

      await user.click(screen.getByRole('button', { name: 'Añadir a la cesta' }))
      await screen.findByText('Producto añadido a la cesta.')
      await user.click(screen.getByRole('button', { name: 'Añadir a la cesta' }))

      await waitFor(() => expect(cartCount()).toHaveTextContent('Cesta: 2 productos'))
    })

    it('keeps the cart count across pages and reloads', async () => {
      const { user } = renderApp('/product/acer-1')
      await user.click(await screen.findByRole('radio', { name: '16 GB' }))
      await user.click(screen.getByRole('button', { name: 'Añadir a la cesta' }))
      await screen.findByText('Producto añadido a la cesta.')

      await user.click(screen.getByRole('link', { name: /Volver al listado/ }))
      expect(cartCount()).toHaveTextContent('Cesta: 1 producto')

      cleanup()
      renderApp('/')
      expect(cartCount()).toHaveTextContent('Cesta: 1 producto')
    })

    it('lets the user close the confirmation', async () => {
      const { user } = renderApp('/product/acer-1')
      await user.click(await screen.findByRole('radio', { name: '16 GB' }))
      await user.click(screen.getByRole('button', { name: 'Añadir a la cesta' }))
      await screen.findByText('Producto añadido a la cesta.')

      await user.click(screen.getByRole('button', { name: 'Cerrar notificación' }))

      expect(screen.queryByText('Producto añadido a la cesta.')).not.toBeInTheDocument()
    })

    it('tells the user when the product cannot be added', async () => {
      server.use(
        http.post(`${API_BASE_URL}${API_ENDPOINTS.cart}`, () =>
          HttpResponse.json({ message: 'Invalid parameters' }, { status: 400 }),
        ),
      )
      const { user } = renderApp('/product/acer-1')
      await user.click(await screen.findByRole('radio', { name: '16 GB' }))

      await user.click(screen.getByRole('button', { name: 'Añadir a la cesta' }))

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'No se ha podido añadir el producto. Inténtalo de nuevo.',
      )
      expect(cartCount()).toHaveTextContent('Cesta: 0 productos')
    })
  })
})

function cartCount() {
  return screen.getByText(/^Cesta:/)
}
