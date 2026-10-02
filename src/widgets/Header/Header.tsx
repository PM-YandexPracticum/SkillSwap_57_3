import styles from './Header.module.css'
import likeDefault from '@assets/icon/LikeDefault.svg'
import notificationDefault from '@assets/icon/NotificationDefault.svg'
import notificationNew from '@assets/icon/NotificationNew.svg'
import moon from '@assets/icon/Moon.svg'
import buttonSkillsArrow from '@assets/ButtonSvg/buttonSkillsArrow.svg'

import { IconButton } from '@ui/IconButton/index'

import { useState } from 'react'

export function Header() {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false)

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

      <button type="button" className={styles.buttonAbout}>
        О проекте
      </button>

      <button
        type="button"
        className={styles.buttonSkills}
        onClick={() => setIsSkillsOpen(!isSkillsOpen)}
      >
        Все навыки
        <img
          src={buttonSkillsArrow}
          alt="стрелочка"
          className={`${styles.buttonSkillsArrow} ${
            isSkillsOpen ? styles.buttonSkillsArrowOpen : ''
          }`}
        />
      </button>
    </header>
  )
}
