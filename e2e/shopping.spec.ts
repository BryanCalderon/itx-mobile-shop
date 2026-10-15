import { expect, test } from '@playwright/test'
import { mockApi } from './support/mockApi'

test('searches a product, adds it to the cart and keeps the cart count', async ({ page }) => {
  const { cartRequests } = await mockApi(page)
  await page.goto('/')

  await page.getByRole('searchbox', { name: 'Buscar por marca o modelo' }).fill('iconia')
  await expect(page.getByRole('list', { name: 'Productos' }).getByRole('listitem')).toHaveCount(1)
  await page.getByRole('link', { name: /Iconia Talk S/ }).click()

  await expect(page.getByRole('heading', { level: 1, name: 'Iconia Talk S' })).toBeVisible()
  await expect(page.getByRole('radio', { name: 'Black' })).toBeChecked()
  await page.getByText('32 GB').click()
  await page.getByRole('button', { name: 'Añadir a la cesta' }).click()

  await expect(page.getByText('Producto añadido a la cesta.')).toBeVisible()
  await expect(page.getByText('Cesta: 1 producto')).toBeAttached()
  expect(cartRequests).toEqual([{ id: 'acer-1', colorCode: 1000, storageCode: 2001 }])

  await page.reload()
  await expect(page.getByText('Cesta: 1 producto')).toBeAttached()

  await page.getByRole('link', { name: /Volver al listado/ }).click()
  await expect(page).toHaveURL('/?search=iconia')
  await expect(page.getByRole('searchbox')).toHaveValue('iconia')
})

test('keeps every character and the cursor position while typing fast', async ({ page }) => {
  await mockApi(page)
  await page.goto('/')
  const searchInput = page.getByRole('searchbox', { name: 'Buscar por marca o modelo' })
  await expect(page.getByRole('list', { name: 'Productos' })).toBeVisible()

  await searchInput.pressSequentially('acer jade', { delay: 0 })
  await searchInput.press('Home')
  await searchInput.press('ArrowRight')
  await searchInput.pressSequentially('X', { delay: 0 })

  await expect(searchInput).toHaveValue('aXcer jade')
  await expect(page).toHaveURL('/?search=aXcer+jade')
})

test('lets the user retry when a product cannot be loaded', async ({ page }) => {
  await mockApi(page)
  await page.goto('/product/unknown')

  await expect(
    page.getByRole('heading', { name: 'No se ha podido cargar el producto' }),
  ).toBeVisible({
    timeout: 15_000,
  })
  await expect(page.getByRole('button', { name: 'Reintentar' })).toBeVisible()
})
