import styles from './Buttons.module.css'
import { ButtonsProps } from './types'

export function Buttons({ text, onClick, variant, size }: ButtonsProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
