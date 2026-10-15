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
  rotate = false,
  className,
}: ButtonsWithIconProps) {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${gap ? styles[gap] : ''} ${position === 'right' ? styles.right : ''} ${border ? styles.border : ''} ${greenBorder ? styles.greenBorder : ''} ${rotate ? styles.rotate : ''} ${className ?? ''}`}
      onClick={onClick}
    >
      <img src={iconSrc} alt="" className={styles.icon} />
      {text && <span>{text}</span>}
    </button>
  )
}
