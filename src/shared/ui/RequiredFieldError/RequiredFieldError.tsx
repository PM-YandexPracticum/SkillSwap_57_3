import type { RequiredFieldErrorProps } from './types'
import styles from './RequiredFieldError.module.css'

export function RequiredFieldError({ children, hasError }: RequiredFieldErrorProps) {
  return (
    <div className={styles.container}>
      {children(hasError ? { border: '1px solid rgb(191 57 32)' } : {})}
      {hasError && (
        <p className={styles.message} role="alert">
          Поле обязательно для заполнения
        </p>
      )}
    </div>
  )
}
