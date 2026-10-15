import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { API_BASE_URL } from '../api/httpClient'
import { productDetailDto, productSummaryDtos } from './fixtures'

/** Default API behaviour for tests. Individual tests override it with `server.use(...)`. */
export const server = setupServer(
  http.get(`${API_BASE_URL}/product`, () => HttpResponse.json(productSummaryDtos)),
  http.get(`${API_BASE_URL}/product/:id`, ({ params }) =>
    params.id === productDetailDto.id
      ? HttpResponse.json(productDetailDto)
      : HttpResponse.json({ message: 'An Unexpected Error Occurred' }, { status: 500 }),
  ),
  http.post(`${API_BASE_URL}/cart`, () => HttpResponse.json({ count: 1 })),
)
