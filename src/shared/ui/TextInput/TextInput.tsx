import { TextInputProps } from './types'
import styles from './TextInput.module.css'

export function TextInput({ labelName, placeholder, onChange }: TextInputProps) {
  return (
    <label className={styles.label}>
      {labelName}
      <input className={styles.input} type="text" placeholder={placeholder} onChange={onChange} />
    </label>
  )
}
