import type { MouseEvent, ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import styles from './BackLink.module.css'

interface BackLinkProps {
  /** Destination when there is no previous page in the application, e.g. after opening a shared link */
  fallbackTo: string
  children: ReactNode
}

/**
 * Goes back to the previous page, so the user returns to the list with the same search and
 * scroll position. It is still a real link, so it can be opened in a new tab.
 */
export function BackLink({ fallbackTo, children }: BackLinkProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const hasPreviousPage = location.key !== 'default'

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (hasPreviousPage) {
      event.preventDefault()
      void navigate(-1)
    }
  }

  return (
    <Link to={fallbackTo} onClick={handleClick} className={styles.backLink}>
      <span aria-hidden="true">←</span> {children}
    </Link>
  )
}
