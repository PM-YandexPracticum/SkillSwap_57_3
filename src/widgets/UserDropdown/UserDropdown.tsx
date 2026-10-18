import styles from './UserDropdown.module.css'
import LogoutIcon from '@assets/icon/LogoutIcon.svg'

export const UserDropdown = () => {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownItem}>Личный кабинет</button>

      <button className={styles.dropdownItem}>
        <span>Выйти из аккаунта</span>
        <img className={styles.logoutIcon} src={LogoutIcon} alt="logout icon" />
      </button>
    </div>
  )
}
