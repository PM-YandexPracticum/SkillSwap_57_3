import { ButtonsWithIconProps } from "./types";
import styles from './ButtonsWithIcon.module.css'

export function ButtonsWithIcon({text,iconSrc,size,onClick,gap,position}: ButtonsWithIconProps) {
  return (
    <button
    className={`${styles.button} ${styles[size]} ${styles[gap]} ${position === 'right'? styles.right : ''}`}
    onClick={onClick}
    >
      <img src={iconSrc} alt="" className={styles.icon}/>
      <span>{text}</span>
    </button>
  )
}

