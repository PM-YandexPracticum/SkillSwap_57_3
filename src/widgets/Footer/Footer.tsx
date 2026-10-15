import styles from './Footer.module.css'
import '@/app/styles/fonts.css'
import Logo from '@ui/Logo/Logo'
import { Link } from 'react-router-dom'

export function Footer() {
  const data = [
    'Все навыки',
    'Контакты',
    'Блог',
    'Политика конфиденциальности',
    'Пользовательское соглашение',
  ]
  return (
    <footer className={styles.footer}>
      <Logo />
      <nav className={styles.navigation}>
        <ul className={styles.navigation_list}>
          <li className={styles.navigation_list_elem}>
            <Link to="/about">О проекте</Link>
          </li>
          {data.map((item, index) => (
            <li key={index} className={styles.navigation_list_elem}>
              {item}
            </li>
          ))}
        </ul>
      </nav>
      <p className={styles.caption}>SkillSwap — 2025</p>
    </footer>
  )
}
