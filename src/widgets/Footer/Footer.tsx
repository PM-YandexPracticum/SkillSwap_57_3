import styles from './Footer.module.css'
import '@/app/styles/fonts.css'
import Logo from '@/pages/UI/Logo/Logo'

export function Footer() {
  const data = ["О проект", "Все навыки", "Контакты", "Блог", "Политика конфиденциальности", "Пользовательское соглашение"]
  return (
    <footer className={styles.footer}>
      <Logo />
      <nav className={styles.navigation}>
        <ul className={styles.navigation_list}>
          {data.map((item, index) => (
            <li key={index} className={styles.navigation_list_elem}>{item}</li>
          ))}
        </ul>
      </nav>
      <p className={styles.caption}>SkillSwap — 2025</p>
    </footer>
  )
}
