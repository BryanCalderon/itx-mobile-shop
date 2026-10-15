import type { ReactNode } from 'react'
import type { Params } from 'react-router'

/** Route metadata, read by the breadcrumbs through `useMatches`. */
export interface RouteHandle {
  breadcrumb?: (params: Params) => ReactNode
}
