import styles from './UserDropdown.module.css'
import LogoutIcon from '@assets/icon/LogoutIcon.svg'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/hooks'
import { logout } from '@/entities/auth/authSlice'

export const UserDropdown = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        className={styles.dropdownItem}
        onClick={() => {
          onClose()
          navigate('/profile')
        }}
      >
        Личный кабинет
      </button>

      <button
        type="button"
        className={styles.dropdownItem}
        onClick={() => {
          onClose()
          dispatch(logout())
        }}
      >
        <span>Выйти из аккаунта</span>
        <img className={styles.logoutIcon} src={LogoutIcon} alt="logout icon" />
      </button>
    </div>
  )
}
