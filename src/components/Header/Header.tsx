import { Link } from 'react-router'
import { PATHS } from '@/app/paths'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to={PATHS.home} className={styles.logo}>
          Mobile Shop
        </Link>
        <Breadcrumbs />
      </div>
    </header>
  )
}
