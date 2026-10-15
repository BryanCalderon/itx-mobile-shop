import { type ReactNode, useMemo, useState } from 'react'
import { NotificationAreaContext } from './NotificationAreaContext'

interface NotificationAreaProviderProps {
  children: ReactNode
}

/**
 * Shares the notification area with the components that show notifications, wherever they are in
 * the tree, without looking it up in the DOM.
 */
export function NotificationAreaProvider({ children }: NotificationAreaProviderProps) {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const value = useMemo(() => ({ element, setElement }), [element])

  return <NotificationAreaContext value={value}>{children}</NotificationAreaContext>
}
