import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from '@/test/renderApp'

describe('Layout', () => {
  it('lets keyboard users skip the header', async () => {
    const { user } = renderApp('/')

    await user.tab()
    expect(screen.getByRole('link', { name: 'Saltar al contenido' })).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('moves the focus to the new page content after navigating', async () => {
    const { user } = renderApp('/')

    await user.click(await screen.findByRole('link', { name: /Iconia Talk S/ }))

    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('keeps the focus in the search input while the search changes the URL', async () => {
    const { user } = renderApp('/')
    const searchInput = await screen.findByRole('searchbox', { name: 'Buscar por marca o modelo' })

    await user.type(searchInput, 'acer')

    expect(searchInput).toHaveFocus()
  })
})
