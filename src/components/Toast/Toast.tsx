import { use, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { NotificationAreaContext } from '../NotificationArea/NotificationAreaContext'
import { TOAST_AUTO_DISMISS_MS } from './constants'
import styles from './Toast.module.css'
import type { ToastNotification } from './types'

interface ToastProps {
  /** Notification to show, or `null` to show none */
  notification: ToastNotification | null
  onDismiss: () => void
}

/**
 * Notification shown in the notification area. Success notifications close by themselves, errors
 * stay until the user closes them so there is time to read them.
 */
export function Toast({ notification, onDismiss }: ToastProps) {
  const variant = notification?.variant
  const notificationArea = use(NotificationAreaContext)?.element

  useEffect(() => {
    if (variant !== 'success') {
      return
    }
    const timeout = setTimeout(onDismiss, TOAST_AUTO_DISMISS_MS)
    return () => clearTimeout(timeout)
  }, [variant, onDismiss])

  if (!notification) {
    return null
  }
  const toast = (
    <div
      role={notification.variant === 'error' ? 'alert' : undefined}
      className={`${styles.toast} ${styles[notification.variant]}`}
    >
      <span className={styles.icon} aria-hidden="true">
        {notification.variant === 'success' ? '✓' : '!'}
      </span>
      <p className={styles.message}>{notification.message}</p>
      <button
        type="button"
        className={styles.close}
        aria-label="Cerrar notificación"
        onClick={onDismiss}
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  )
  // Rendered in place when there is no notification area, e.g. when the component is used alone
  return notificationArea ? createPortal(toast, notificationArea) : toast
}
