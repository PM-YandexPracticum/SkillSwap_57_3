import notificationIcon from '@assets/icon/notification.svg'
import { Buttons } from '@ui/Buttons'
import styles from './NotificationItem.module.css'
import type { NotificationItemProps } from './types'

export function NotificationItem({ title, description, onClick }: NotificationItemProps) {
  return (
    <article className={styles.item}>
      <div className={styles.content}>
        <img className={styles.icon} src={notificationIcon} alt="" aria-hidden="true" />
        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <Buttons text="Перейти" onClick={onClick} variant="greenButton" size="small" />
    </article>
  )
}
