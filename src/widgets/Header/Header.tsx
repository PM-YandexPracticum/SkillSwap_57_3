import styles from './Header.module.css'
import moon from '@assets/icon/Moon.svg'
import likeIcon from '@assets/icon/LikeDefault.svg'
import notificationIcon from '@assets/icon/NotificationDefault.svg'
import buttonSkillsArrow from '@assets/ButtonSvg/buttonSkillsArrow.svg'

import { IconButton } from '@ui/IconButton/index'
import { HeaderSearch } from '@ui/HeaderSearch'
import Logo from '@ui/Logo/Logo'
import { ModalSkills } from '@widgets/ModalSkills'
import { UserInfo } from '@ui/UserInfo'
import { API_URL } from '@/shared/config/api'
import { UserDropdown } from '../UserDropdown'

import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'

export function Header() {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const skillButtonRef = useRef<HTMLButtonElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { isAuth, data: user } = useAppSelector((state) => state.auth)
  const avatarUrl = user?.image_path ? `${API_URL}/images/users/${user.image_path}` : undefined

  useEffect(() => {
    if (!isUserMenuOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

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
        {isAuth ? (
          <>
            <Link to="/favorites">
              <img src={likeIcon} alt="Избранное" className={styles.headerIcon} />
            </Link>
            <img src={notificationIcon} alt="Уведомления" className={styles.headerIcon} />
            <div ref={userMenuRef} className={styles.userMenuWrap}>
              <UserInfo
                name={user?.name || ''}
                avatarUrl={avatarUrl}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              />

              {isUserMenuOpen && (
                <div className={styles.userMenuPopup}>
                  <UserDropdown onClose={() => setIsUserMenuOpen(false)} />
                </div>
              )}
            </div>
          </>
        ) : (
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
