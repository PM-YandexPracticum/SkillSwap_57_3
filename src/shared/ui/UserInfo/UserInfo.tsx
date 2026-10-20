import type { UserInfoProps } from './types'
import styles from './UserInfo.module.css'
import userIcon from '@assets/icon/User.svg'

export function UserInfo({ name, avatarUrl, onClick }: UserInfoProps) {
  return (
    <button type="button" className={styles.user} onClick={onClick}>
      <img className={styles.avatar} src={avatarUrl || userIcon} alt="Изображение пользователя" />
      <span className={styles.name}>{name}</span>
    </button>
  )
}
