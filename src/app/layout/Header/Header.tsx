import { Link } from 'react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { NotificationArea } from '@/components/NotificationArea/NotificationArea'
import { CartCount } from '@/entities/cart/components/CartCount/CartCount'
import { PATHS } from '@/shared/routing/paths'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to={PATHS.home} className={styles.logo}>
          Mobile Shop
        </Link>
        <Breadcrumbs />
        <div className={styles.cart}>
          <CartCount />
        </div>
      </div>
      <NotificationArea />
    </header>
  )
}
