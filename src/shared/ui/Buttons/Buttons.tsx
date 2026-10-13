import styles from './Buttons.module.css'
import { ButtonsProps } from './types'

export function Buttons({ text, onClick, variant, size, type = 'button' }: ButtonsProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
