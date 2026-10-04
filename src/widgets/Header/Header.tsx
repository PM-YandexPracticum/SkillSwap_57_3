import styles from './Header.module.css'
import moon from '@assets/icon/Moon.svg'
import buttonSkillsArrow from '@assets/ButtonSvg/buttonSkillsArrow.svg'

import { IconButton } from '@ui/IconButton/index'
import { HeaderSearch } from '@/shared/ui/HeaderSearch'
import Logo from '@/shared/ui/Logo/Logo'

import { useState } from 'react'

export function Header() {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Logo />
        <nav className={styles.nav}>
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
        </nav>
      </div>

      <div className={styles.center}>
        <HeaderSearch />
      </div>

      <div className={styles.right}>
        <IconButton icon={moon} onClick={() => {}} ariaLabel="Изменить тему" />

        <button type="button" className={styles.buttonLogin}>
          Войти
        </button>

        <button type="button" className={styles.buttonRegister}>
          Зарегистрироваться
        </button>
      </div>
    </header>
  )
}
