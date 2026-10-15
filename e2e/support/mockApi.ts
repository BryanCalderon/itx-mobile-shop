import type { Page } from '@playwright/test'
import { productDetailDto, productSummaryDtos } from '../../src/test/fixtures'

/** 1×1 transparent PNG served for the product images of the fixtures */
const PIXEL_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64',
)

/**
 * Mocks the API with the same fixtures as the unit tests and records the products added to the
 * cart, so the tests can check what the application sent.
 */
export async function mockApi(page: Page) {
  const cartRequests: unknown[] = []

  await page.route('**/api/product', (route) => route.fulfill({ json: productSummaryDtos }))
  await page.route('**/api/product/*', (route) => {
    const id = new URL(route.request().url()).pathname.split('/').at(-1)
    return id === productDetailDto.id
      ? route.fulfill({ json: productDetailDto })
      : route.fulfill({ status: 500, json: { message: 'An Unexpected Error Occurred' } })
  })
  await page.route('**/api/cart', (route) => {
    cartRequests.push(route.request().postDataJSON())
    return route.fulfill({ json: { count: 1 } })
  })
  await page.route('https://images.test/**', (route) =>
    route.fulfill({ contentType: 'image/png', body: PIXEL_PNG }),
  )

  return { cartRequests }
}
