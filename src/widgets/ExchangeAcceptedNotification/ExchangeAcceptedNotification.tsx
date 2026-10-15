import { ExchangeAcceptedNotificationProps } from './types'
import Idea from '@assets/icon/Idea.svg'
import styles from './ExchangeAcceptedNotification.module.css'
import cross from '@assets/icon/cross.svg'
import { Buttons } from '@/shared/ui/Buttons'
import { ButtonsWithIcon } from '@/shared/ui/ButtonsWithIcon'

export const ExchangeAcceptedNotification = ({
  name,
  onClose,
  onNavigate,
}: ExchangeAcceptedNotificationProps) => {
  return (
    <div className={styles.popupNotification}>
      <ButtonsWithIcon
        iconSrc={cross}
        onClick={onClose}
        size="extra-small"
        className={styles.closeButton}
      />
      <img src={Idea} alt="" aria-hidden="true" />
      <p>{name} принял ваш обмен</p>
      <Buttons
        text="Перейти"
        variant="whiteButton"
        size="small"
        onClick={onNavigate}
        type="button"
        className={styles.buttonMove}
      />
    </div>
  )
}
