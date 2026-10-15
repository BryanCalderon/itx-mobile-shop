import { useRef } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { NotificationAreaProvider } from '@/components/NotificationArea/NotificationAreaProvider'
import { MAIN_CONTENT_ID } from '../constants'
import { Header } from '../Header/Header'
import { useFocusOnPageChange } from '../hooks/useFocusOnPageChange'
import { SkipLink } from '../SkipLink/SkipLink'
import styles from './Layout.module.css'

export function Layout() {
  const mainRef = useRef<HTMLElement>(null)
  useFocusOnPageChange(mainRef)

  return (
    <NotificationAreaProvider>
      <SkipLink targetId={MAIN_CONTENT_ID} />
      <Header />
      <main id={MAIN_CONTENT_ID} ref={mainRef} tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <ScrollRestoration />
    </NotificationAreaProvider>
  )
}
