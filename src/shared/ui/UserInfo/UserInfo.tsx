import type { UserInfoProps } from './types'
import styles from './UserInfo.module.css'

export function UserInfo({ name }: UserInfoProps) {
  return (
    <div className={styles.user}>
      <div className={styles.avatar} />
      <span className={styles.name}>{name}</span>
    </div>
  )
}
