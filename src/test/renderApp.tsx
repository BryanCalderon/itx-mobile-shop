import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { createQueryClient } from '@/app/queryClient'
import { routes } from '@/app/routes'

/**
 * Renders the whole application with a fresh cache and no retries. It accepts a single path or
 * a browsing history, in which case the last entry is the current page.
 */
export function renderApp(pathOrHistory: string | string[] = '/') {
  const history = Array.isArray(pathOrHistory) ? pathOrHistory : [pathOrHistory]
  const queryClient = createQueryClient()
  queryClient.setDefaultOptions({
    queries: { ...queryClient.getDefaultOptions().queries, retry: false },
  })
  const router = createMemoryRouter(routes, {
    initialEntries: history,
    initialIndex: history.length - 1,
  })

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )

  return { router, user: userEvent.setup() }
}
