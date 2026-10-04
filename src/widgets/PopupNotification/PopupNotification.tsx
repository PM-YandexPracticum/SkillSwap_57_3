import { Buttons } from '@/shared/ui/Buttons'
import styles from './PopupNotification.module.css'
import { PopupNotificationProps, PopupNotificationType } from './types'

const POPUP_NOTIFICATION_CONTENT: Record<
  PopupNotificationType,
  { img: string; title: string; desc: string }
> = {
  succes: {
    img: './src/assets/PopupNotificationSwg/Succes.svg',
    title: 'Важе предложение создано!',
    desc: 'Теперь вы можете предложить обмен',
  },
  notification: {
    img: './src/assets/PopupNotificationSwg/Notification.svg',
    title: 'Вы предложили обмен',
    desc: 'Теперь дождитесь подтверждения. Вам придёт уведомление',
  },
}

export function PopupNotification({ type }: PopupNotificationProps) {
  const { img, title, desc } = POPUP_NOTIFICATION_CONTENT[type]
  return (
    <section className={styles.modal}>
      <img src={img} alt="Иконочка" />
      <div className={styles.content}>
        <div className={styles.text}>
          <h2 className={styles.h2}>{title}</h2>
          <p className={styles.p}>{desc}</p>
        </div>
        <Buttons text="Готово" onClick={() => {}} size="full-width" variant="greenButton" />
      </div>
    </section>
  )
}
