import { useId } from 'react'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputId = useId()

  return (
    <div className={styles.searchBar}>
      <label htmlFor={inputId} className="visually-hidden">
        Buscar por marca o modelo
      </label>
      <input
        id={inputId}
        type="search"
        className={styles.input}
        placeholder="Buscar por marca o modelo"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
    </div>
  )
}
