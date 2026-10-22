import notificationIcon from '@assets/icon/notification.svg'
import { Buttons } from '@ui/Buttons'
import styles from './NotificationItem.module.css'
import { ExchangeItem } from '@/entities/exchange/types'
import { useAppSelector } from '@/store/hooks'
import { formatRelativeDate } from '@/shared/lib/helpers'
import { useNavigate } from 'react-router-dom'

export function NotificationItem(item: ExchangeItem) {
  const authUser = useAppSelector((state) => state.auth.data?.user.id)
  const navigate = useNavigate()
  const handleClick = () => {
    if (item.receiver.id === authUser) navigate(`/skill/${item.initiator.id}`)
    if (item.initiator.id === authUser) navigate(`/skill/${item.receiver.id}`)
  }
  return (
    <article className={styles.item}>
      <div className={styles.content}>
        <img className={styles.icon} src={notificationIcon} alt="" aria-hidden="true" />
        <div className={styles.text}>
          {item.receiver.id === authUser && (
            <>
              <p className={styles.title}>Новое уведомление</p>
              <p className={styles.description}>{item.initiator.name} отправил вам запрос</p>
            </>
          )}
          {item.initiator.id === authUser && (
            <>
              <p className={styles.title}>Новое уведомление</p>
              <p className={styles.description}>
                Вы отправили запрос пользователю {item.receiver.name}
              </p>
            </>
          )}
        </div>
        <p>{formatRelativeDate(item.createdAt)}</p>
      </div>
      <Buttons
        type="button"
        text="Перейти"
        onClick={handleClick}
        variant="greenButton"
        size="small"
      />
    </article>
  )
}
