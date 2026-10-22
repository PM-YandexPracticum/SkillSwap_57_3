import { NotificationItem } from '@ui/NotificationItem'
import styles from './NotificationMenu.module.css'
import type { NotificationMenuProps } from './types'
import { useEffect, useMemo, useState } from 'react'
import { getReadIds, markAllAsRead } from '@/shared/lib/helpers'

export function NotificationMenu({ notifications }: NotificationMenuProps) {
  const [readIds, setReadIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    setReadIds(getReadIds())
  }, [])

  const { newNotifications, readNotifications } = useMemo(() => {
    const newList: typeof notifications = []
    const readList: typeof notifications = []

    for (const n of notifications) {
      if (readIds.has(n.id)) {
        readList.push(n)
      } else {
        newList.push(n)
      }
    }

    return { newNotifications: newList, readNotifications: readList }
  }, [notifications, readIds])

  const handleClickReadAll = () => {
    const allIds = notifications.map((n) => n.id)
    markAllAsRead(allIds)
    setReadIds((prev) => {
      const next = new Set(prev)
      allIds.forEach((id) => next.add(id))
      return next
    })
  }
  return (
    <section className={styles.menu} aria-label="Уведомления">
      <div className={styles.header_block}>
        <h3 className={styles.title}>Новые уведомления</h3>
        <button className={styles.button} onClick={handleClickReadAll}>
          Прочитать все
        </button>
      </div>
      {newNotifications.length > 0 ? (
        <ul className={styles.list}>
          {newNotifications.map((n, index) => (
            <li key={index}>
              <NotificationItem {...n} />
            </li>
          ))}
          {}
        </ul>
      ) : (
        <p className={styles.empty}>Уведомлений пока нет</p>
      )}
      <div className={styles.header_block}>
        <h3 className={styles.title}>Просмотренные</h3>
      </div>
      {readNotifications.length > 0 ? (
        <ul className={styles.list}>
          {readNotifications.map((n, index) => (
            <li key={index}>
              <NotificationItem {...n} />
            </li>
          ))}
          {}
        </ul>
      ) : (
        <p className={styles.empty}>Уведомлений пока нет</p>
      )}
    </section>
  )
}
