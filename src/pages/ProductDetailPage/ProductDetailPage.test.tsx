import { screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from '@/test/renderApp'

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
})
