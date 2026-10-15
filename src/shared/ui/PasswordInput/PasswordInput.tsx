import { forwardRef, useState } from 'react'
import styles from './PasswordInput.module.css'
import { PasswordInputProps } from './types'
import eyeInvisible from '@assets/icon/eyeInvisible.svg'
import eyeVisible from '@assets/icon/eyeVisible.svg'

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ labelName, error, placeholder, ...rest }, ref) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    const toggleVisibility = () => {
      setIsPasswordVisible((prev) => !prev)
    }
    return (
      <label className={styles.label}>
        {labelName}
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            type={isPasswordVisible ? 'text' : 'password'}
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            placeholder={placeholder}
            {...rest}
          />
          <button
            type="button"
            className={styles.visibilityButton}
            onClick={toggleVisibility}
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            <img
              src={isPasswordVisible ? eyeVisible : eyeInvisible}
              className={styles.visibilityImg}
            />
          </button>
        </div>
        {error && <p className={`${styles.textHint} ${error ? styles.error : ''}`}>{error}</p>}
      </label>
    )
  },
)
