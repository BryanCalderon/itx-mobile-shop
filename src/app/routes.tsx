import type { RouteObject } from 'react-router'
import { Layout } from '@/components/Layout/Layout'
import { ProductBreadcrumb } from '@/features/products/components/ProductBreadcrumb/ProductBreadcrumb'
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage/ProductDetailPage'
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
        // The product detail is nested under the list so the breadcrumbs show both
        path: PATHS.home,
        handle: { breadcrumb: () => 'Móviles' } satisfies RouteHandle,
        children: [
          { index: true, element: <ProductListPage /> },
          {
            path: PATHS.productDetail,
            element: <ProductDetailPage />,
            handle: {
              breadcrumb: ({ id = '' }) => <ProductBreadcrumb productId={id} />,
            } satisfies RouteHandle,
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
