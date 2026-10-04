import styles from './TextArea.module.css'
import { TextAreaProps } from './types'

export function TextArea({ labelName, value, onChange }: TextAreaProps) {
  return (
    <label className={styles.label}>
      {labelName}
      <textarea
        className={styles.textarea}
        placeholder="Коротко опишите, чему можете научить"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
