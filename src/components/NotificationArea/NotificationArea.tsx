import { use } from 'react'
import styles from './NotificationArea.module.css'
import { NotificationAreaContext } from './NotificationAreaContext'

/**
 * Place where notifications are shown, right below the element that contains it. It is a live
 * region that is always rendered, so screen readers announce every notification placed in it.
 */
export function NotificationArea() {
  const notificationArea = use(NotificationAreaContext)

  return (
    <div
      ref={notificationArea?.setElement}
      className={styles.area}
      aria-live="polite"
      aria-atomic="true"
    />
  )
}
