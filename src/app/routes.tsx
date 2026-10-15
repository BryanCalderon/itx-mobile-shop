import type { RouteObject } from 'react-router'
import { Layout } from '@/components/Layout/Layout'
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage'
import { ProductListPage } from '@/pages/ProductListPage/ProductListPage'
import { RouteErrorPage } from '@/pages/RouteErrorPage/RouteErrorPage'
import { PATHS } from './paths'
import type { RouteHandle } from './routeHandle'

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: PATHS.home,
        element: <ProductListPage />,
        handle: { breadcrumb: () => 'Móviles' } satisfies RouteHandle,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
