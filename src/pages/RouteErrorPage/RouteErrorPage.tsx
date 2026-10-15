import { PATHS } from '@/app/paths'
import { StatusMessage } from '@/components/StatusMessage/StatusMessage'

/** Last resort when rendering fails: a plain page outside the layout, with a full reload link. */
export function RouteErrorPage() {
  return (
    <StatusMessage
      title="Algo ha ido mal"
      description="Se ha producido un error inesperado."
      action={<a href={PATHS.home}>Volver al inicio</a>}
    />
  )
}
