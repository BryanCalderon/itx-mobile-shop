import type { MouseEvent } from 'react'
import styles from './SkipLink.module.css'

interface SkipLinkProps {
  targetId: string
}

/** Lets keyboard users skip the header. It only becomes visible when it receives the focus. */
export function SkipLink({ targetId }: SkipLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Focus the content without adding the fragment to the URL, which the router owns
    event.preventDefault()
    document.getElementById(targetId)?.focus()
  }

  return (
    <a href={`#${targetId}`} className={styles.skipLink} onClick={handleClick}>
      Saltar al contenido
    </a>
  )
}
