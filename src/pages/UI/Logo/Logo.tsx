import styles from './logo.module.css';
import logo from '..//..//..//../public/logo.svg'

export default function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Логотип"/>
      <h1>SkillSwap</h1 >
    </div>
  )
}