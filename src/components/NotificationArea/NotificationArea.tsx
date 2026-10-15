import { NOTIFICATION_AREA_ID } from './constants'
import styles from './NotificationArea.module.css'

/**
 * Place where notifications are shown, right below the element that contains it. It is a live
 * region that is always rendered, so screen readers announce every notification placed in it.
 */
export function NotificationArea() {
  return (
    <div id={NOTIFICATION_AREA_ID} className={styles.area} aria-live="polite" aria-atomic="true" />
  )
}
