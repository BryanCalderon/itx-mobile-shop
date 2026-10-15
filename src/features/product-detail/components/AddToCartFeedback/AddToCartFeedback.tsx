import { Toast } from '@/components/Toast/Toast'
import type { ToastNotification } from '@/components/Toast/types'
import type { AddToCartStatus } from '../../types'

const NOTIFICATIONS: Partial<Record<AddToCartStatus, ToastNotification>> = {
  success: { variant: 'success', message: 'Producto añadido a la cesta.' },
  error: { variant: 'error', message: 'No se ha podido añadir el producto. Inténtalo de nuevo.' },
}

interface AddToCartFeedbackProps {
  status: AddToCartStatus
  onDismiss: () => void
}

export function AddToCartFeedback({ status, onDismiss }: AddToCartFeedbackProps) {
  return <Toast notification={NOTIFICATIONS[status] ?? null} onDismiss={onDismiss} />
}
