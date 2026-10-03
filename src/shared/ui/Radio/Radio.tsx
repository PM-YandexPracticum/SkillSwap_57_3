import { RadioGroupProps } from './types'
import styles from './Radio.module.css'

export function Radio({ name, onChange, options, value }: RadioGroupProps) {
  return (
    <div className={styles.group}>
      {options.map((option) => (
        <label key={option.value} className={styles.item}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className={styles.input}
          />
          <span className={styles.circle} />
          <span className={styles.label}>{option.label}</span>
        </label>
      ))}
    </div>
  )
}
