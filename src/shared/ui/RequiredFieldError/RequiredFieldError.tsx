import type { RequiredFieldErrorProps } from './types'
import styles from './RequiredFieldError.module.css'

export function RequiredFieldError({ children, hasError }: RequiredFieldErrorProps) {
  return (
    <div className={`${styles.container} ${hasError ? styles.hasError : ''}`}>
      {children}
      {hasError && (
        <p className={styles.message} role="alert">
          Поле обязательно для заполнения
        </p>
      )}
    </div>
  )
}
