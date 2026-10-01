import styles from './UserInfo.module.css'

type UserInfoProps = {
  name: string
  avatarUrl?: string
}

export function UserInfo({ name }: UserInfoProps) {
  return (
    <div className={styles.user}>
      <div className={styles.avatar} />
      <span>{name}</span>
    </div>
  )
}
