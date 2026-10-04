import { ButtonsWithIconProps } from './types'
import styles from './ButtonsWithIcon.module.css'

export function ButtonsWithIcon({
  text,
  iconSrc,
  size,
  onClick,
  gap,
  position,
  border = false,
  greenBorder = false,
}: ButtonsWithIconProps) {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[gap]} ${position === 'right' ? styles.right : ''} ${border && styles.border} ${greenBorder && styles.greenBorder}`}
      onClick={onClick}
    >
      <img src={iconSrc} alt="" className={styles.icon} />
      <span>{text}</span>
    </button>
  )
}
