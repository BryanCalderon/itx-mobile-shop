import type { ReactNode } from 'react'
import styles from './StatusMessage.module.css'

interface StatusMessageProps {
  title: string
  description?: string
  action?: ReactNode
}

export function StatusMessage({ title, description, action }: StatusMessageProps) {
  return (
    <section className={styles.status}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {action}
    </section>
  )
}
