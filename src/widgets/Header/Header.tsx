import styles from './Header.module.css'
import moon from '@assets/icon/Moon.svg'
import buttonSkillsArrow from '@assets/ButtonSvg/buttonSkillsArrow.svg'

import { IconButton } from '@ui/IconButton/index'
import { HeaderSearch } from '@ui/HeaderSearch'
import Logo from '@ui/Logo/Logo'
import { ModalSkills } from '@widgets/ModalSkills'

import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'

export function Header() {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false)
  const skillButtonRef = useRef<HTMLButtonElement>(null)
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Logo />
        <nav className={styles.nav}>
          <Link to="/about" className={styles.buttonAbout}>
            О проекте
          </Link>

          <div className={styles.skillsWrap}>
            <button
              ref={skillButtonRef}
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

            {isSkillsOpen && (
              <ModalSkills onClose={() => setIsSkillsOpen(false)} triggerRef={skillButtonRef} />
            )}
          </div>
        </nav>
      </div>

      <div className={styles.center}>
        <HeaderSearch />
      </div>

      <div className={styles.right}>
        <IconButton icon={moon} onClick={() => {}} ariaLabel="Изменить тему" />
        {!isAuth && (
          <>
            <Link to="/login" className={styles.buttonLogin}>
              Войти
            </Link>

            <Link to="/register" className={styles.buttonRegister}>
              Зарегистрироваться
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
