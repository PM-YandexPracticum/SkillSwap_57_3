import { NotificationItem } from '@ui/NotificationItem'
import styles from './NotificationMenu.module.css'
import type { NotificationMenuProps } from './types'

export function NotificationMenu({ notifications }: NotificationMenuProps) {
  return (
    <section className={styles.menu} aria-label="Уведомления">
      {notifications.length > 0 ? (
        <ul className={styles.list}>
          {notifications.map(({ id, ...notification }) => (
            <li key={id}>
              <NotificationItem {...notification} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Уведомлений пока нет</p>
      )}
    </section>
  )
}
