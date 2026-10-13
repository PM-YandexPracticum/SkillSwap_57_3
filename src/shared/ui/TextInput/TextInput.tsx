import { TextInputProps } from './types'
import styles from './TextInput.module.css'
import { forwardRef } from 'react'

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { labelName, error, placeholder, ...rest },
  ref,
) {
  return (
    <label className={styles.label}>
      {labelName}
      <input
        {...rest}
        ref={ref}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        type="text"
        placeholder={placeholder}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  )
})

TextInput.displayName = 'TextInput'
