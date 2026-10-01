import likeDefault from '@assets/icon/LikeDefault.svg'
import notificationDefault from '@assets/icon/NotificationDefault.svg'
import notificationNew from '@assets/icon/NotificationNew.svg'
import moon from '@assets/icon/Moon.svg'

import { IconButton } from '@ui/IconButton/Icon-Button'

export function Header() {
  return (
    <header>
      {/* В коллбеках кнопок пока просто заглушка */}
      <IconButton icon={moon} onClick={() => {}} ariaLabel="Изменить тему" />
      <IconButton
        icon={notificationDefault}
        onClick={() => {}}
        activeIcon={notificationNew}
        ariaLabel="Уведомления"
        isActive={false}
      />
      <IconButton icon={likeDefault} onClick={() => {}} ariaLabel="Избранное" />
    </header>
  )
}
