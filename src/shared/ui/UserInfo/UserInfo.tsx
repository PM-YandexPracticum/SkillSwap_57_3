import type { UserInfoProps } from './types'
import styles from './UserInfo.module.css'
import userIcon from '@assets/icon/User.svg'

export function UserInfo({ name, avatarUrl }: UserInfoProps) {
  return (
    <div className={styles.user}>
      <img className={styles.avatar} src={avatarUrl || userIcon} alt="Изображение пользователя" />
      <span className={styles.name}>{name}</span>
    </div>
  )
}
