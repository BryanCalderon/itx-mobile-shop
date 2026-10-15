import { http, HttpResponse } from 'msw'
import { expect, it } from 'vitest'
import { API_BASE_URL } from '@/api/apiConfig'
import { API_ENDPOINTS } from '@/api/endpoints'
import { server } from '@/test/server'
import { addToCart } from './cartApi'

it('sends the product and the selected options, and returns the units added', async () => {
  let requestBody: unknown
  server.use(
    http.post(`${API_BASE_URL}${API_ENDPOINTS.cart}`, async ({ request }) => {
      requestBody = await request.json()
      return HttpResponse.json({ count: 1 })
    }),
  )

  const unitsAdded = await addToCart({ productId: 'acer-1', colorCode: 1000, storageCode: 2001 })

  expect(requestBody).toEqual({ id: 'acer-1', colorCode: 1000, storageCode: 2001 })
  expect(unitsAdded).toBe(1)
})
