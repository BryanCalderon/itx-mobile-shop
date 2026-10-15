import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'
import { mockApi } from './support/mockApi'

const WCAG_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

// Without animations, so colors are checked as they end up and not halfway through a transition
test.use({ reducedMotion: 'reduce' })

async function expectNoAccessibilityViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_AA).analyze()
  expect(violations).toEqual([])
}

test.beforeEach(async ({ page }) => {
  await mockApi(page)
})

test('product list has no accessibility violations', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('list', { name: 'Productos' })).toBeVisible()

  await expectNoAccessibilityViolations(page)
})

test('product list without results has no accessibility violations', async ({ page }) => {
  await page.goto('/?search=nokia')
  await expect(page.getByText('No hay productos que coincidan')).toBeVisible()

  await expectNoAccessibilityViolations(page)
})

test('product detail has no accessibility violations', async ({ page }) => {
  await page.goto('/product/acer-1')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  await expectNoAccessibilityViolations(page)
})

test('product detail with a notification has no accessibility violations', async ({ page }) => {
  await page.goto('/product/acer-1')
  await page.getByText('16 GB').click()
  await page.getByRole('button', { name: 'Añadir a la cesta' }).click()
  await expect(page.getByText('Producto añadido a la cesta.')).toBeVisible()

  await expectNoAccessibilityViolations(page)
})
