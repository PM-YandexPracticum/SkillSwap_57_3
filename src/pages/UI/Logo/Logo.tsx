import styles from './logo.module.css';
import logoSrc from '@/assets/logo.svg'; 

export default function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logoSrc} alt="SkillSwap Logo" width="40" height="40" />
      <h1>SkillSwap</h1 >
    </div>
  )
}