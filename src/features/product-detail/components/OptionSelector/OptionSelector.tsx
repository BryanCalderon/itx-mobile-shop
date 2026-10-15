import { useId } from 'react'
import type { ProductOption } from '@/entities/product/types'
import styles from './OptionSelector.module.css'

interface OptionSelectorProps {
  legend: string
  options: ProductOption[]
  selectedCode: number | null
  onChange: (code: number) => void
}

/** Group of mutually exclusive options, built on native radio buttons for keyboard and screen reader support. */
export function OptionSelector({ legend, options, selectedCode, onChange }: OptionSelectorProps) {
  const name = useId()

  return (
    <fieldset className={styles.selector}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.options}>
        {options.map((option) => (
          <label key={option.code} className={styles.option}>
            <input
              type="radio"
              name={name}
              value={option.code}
              checked={option.code === selectedCode}
              onChange={() => onChange(option.code)}
              className={styles.input}
            />
            {option.name}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
