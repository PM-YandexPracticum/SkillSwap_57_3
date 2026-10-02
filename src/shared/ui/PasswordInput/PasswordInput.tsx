import { useState } from 'react'
import styles from './PasswordInput.module.css'
import { PasswordInputProps } from './types'
import eyeInvisible from '@assets/icon/eyeInvisible.svg'
import eyeVisible from '@assets/icon/eyeVisible.svg'

export const PasswordInput = ({ labelName, placeholder, value, onChange }: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const toggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <label className={styles.label}>
      {labelName}
      <div className={styles.inputWrapper}>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
    </label>
  )
}
