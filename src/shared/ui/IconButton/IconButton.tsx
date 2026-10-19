import styles from './IconButton.module.css'
import { IconButtonProps } from './types'

export const IconButton = ({
  icon,
  onClick,
  activeIcon,
  ariaLabel = 'Кнопка',
  isActive = false,
  className,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={className ? `${styles.button} ${className}` : `${styles.button}`}
    >
      <img src={isActive && activeIcon ? activeIcon : icon} className={styles.icon} />
    </button>
  )
}
