import { createContext } from 'react'

export interface NotificationAreaContextValue {
  /** Element where notifications are rendered, once it is mounted */
  element: HTMLElement | null
  setElement: (element: HTMLElement | null) => void
}

export const NotificationAreaContext = createContext<NotificationAreaContextValue | null>(null)
