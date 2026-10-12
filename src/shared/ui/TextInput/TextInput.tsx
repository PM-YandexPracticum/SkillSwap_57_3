import { TextInputProps } from './types'
import styles from './TextInput.module.css'

export function TextInput({ labelName, placeholder, value, onChange, error }: TextInputProps) {
  return (
    <label className={styles.label}>
      {labelName}
      <input
      className={`${styles.input} ${error ? styles.inputError : ''}`}
      type="text"
      placeholder={placeholder}
       value={value}
       onChange={onChange}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  )
}
