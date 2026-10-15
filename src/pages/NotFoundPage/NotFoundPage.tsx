import { Link } from 'react-router'
import { PATHS } from '@/app/paths'
import { StatusMessage } from '@/components/StatusMessage/StatusMessage'

export function NotFoundPage() {
  return (
    <StatusMessage
      title="Página no encontrada"
      description="La página que buscas no existe."
      action={<Link to={PATHS.home}>Volver al listado</Link>}
    />
  )
}
