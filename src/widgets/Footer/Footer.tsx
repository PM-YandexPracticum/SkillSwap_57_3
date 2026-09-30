import styles from './Footer.module.css'
import '@/app/styles/fonts.css'
import Logo from '@/pages/UI/Logo/Logo'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Logo />
      <nav className={styles.navigation}>
        <ul className={styles.navigation_list}>
          <li className={styles.navigation_list_elem}>О проекте</li>
          <li className={styles.navigation_list_elem}>Все навыки</li>
          <li className={styles.navigation_list_elem}>Контакты</li>
          <li className={styles.navigation_list_elem}>Блог</li>
          <li className={styles.navigation_list_elem}>Политика конфиденциальности</li>
          <li className={styles.navigation_list_elem}>Пользовательское соглашение</li>
        </ul>
      </nav>
      <p className={styles.caption}>SkillSwap — 2025</p>
    </footer>
  )
}
