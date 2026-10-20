import { Buttons } from '@/shared/ui/Buttons'
import succesIcon from '@/assets/PopupNotificationSwg/Succes.svg'
import styles from './OfferCreatedPopup.module.css'
import { OfferCreatedPopupProps } from './types'

export const OfferCreatedPopup = ({ onClose }: OfferCreatedPopupProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <section className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img className={styles.icon} src={succesIcon} alt="Успешно" />
        <div className={styles.content}>
          <div className={styles.text}>
            <h2 className={styles.title}>Ваше предложение создано</h2>
            <p className={styles.description}>Теперь вы можете предложить обмен</p>
          </div>
          <Buttons
            type="button"
            text="Готово"
            onClick={onClose}
            size="extra-large"
            variant="greenButton"
          />
        </div>
      </section>
    </div>
  )
}