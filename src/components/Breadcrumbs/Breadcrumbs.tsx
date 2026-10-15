import { Link, useMatches } from 'react-router'
import type { RouteHandle } from '@/shared/routing/routeHandle'
import styles from './Breadcrumbs.module.css'

export function Breadcrumbs() {
  const crumbs = useMatches().flatMap(({ id, pathname, params, handle }) => {
    const breadcrumb = (handle as RouteHandle | undefined)?.breadcrumb
    return breadcrumb ? [{ id, pathname, label: breadcrumb(params) }] : []
  })

  return (
    <nav aria-label="Ruta de navegación">
      <ol className={styles.list}>
        {crumbs.map((crumb, index) => {
          const isCurrentPage = index === crumbs.length - 1
          return (
            <li key={crumb.id} className={styles.item}>
              {isCurrentPage ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link to={crumb.pathname}>{crumb.label}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
