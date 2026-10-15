import styles from './EmptySearchResults.module.css'

interface EmptySearchResultsProps {
  query: string
}

export function EmptySearchResults({ query }: EmptySearchResultsProps) {
  return <p className={styles.empty}>No hay productos que coincidan con «{query}».</p>
}
