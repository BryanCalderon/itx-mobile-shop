import { Link } from 'react-router'
import { StatusMessage } from '@/components/StatusMessage/StatusMessage'
import { PATHS } from '@/shared/routing/paths'

export function NotFoundPage() {
  return (
    <StatusMessage
      title="Página no encontrada"
      description="La página que buscas no existe."
      action={<Link to={PATHS.home}>Volver al listado</Link>}
    />
  )
}
