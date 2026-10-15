import { useEffect, useState } from 'react'
import { SLOW_LOADING_NOTICE_DELAY_MS } from './constants'
import styles from './SlowLoadingNotice.module.css'

interface SlowLoadingNoticeProps {
  /** Time to wait before showing the notice */
  delayMs?: number
}

/**
 * The API is hosted on a server that sleeps when idle and can take up to a minute to wake up.
 * This notice tells the user why the first load is slow, but only once the wait gets noticeable.
 */
export function SlowLoadingNotice({
  delayMs = SLOW_LOADING_NOTICE_DELAY_MS,
}: SlowLoadingNoticeProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delayMs)
    return () => clearTimeout(timeout)
  }, [delayMs])

  if (!isVisible) {
    return null
  }

  return (
    <p className={styles.notice}>
      El servidor está arrancando y la primera carga puede tardar hasta un minuto.
    </p>
  )
}
