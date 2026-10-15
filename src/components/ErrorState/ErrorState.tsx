import { StatusMessage } from '../StatusMessage/StatusMessage'

interface ErrorStateProps {
  title: string
  onRetry: () => void
}

export function ErrorState({ title, onRetry }: ErrorStateProps) {
  return (
    <StatusMessage
      title={title}
      description="Comprueba tu conexión e inténtalo de nuevo."
      action={
        <button type="button" onClick={onRetry}>
          Reintentar
        </button>
      }
    />
  )
}
