import { ButtonsWithIcon } from '@ui/ButtonsWithIcon'
import Logo from '@ui/Logo/Logo'
import cross from '@assets/icon/cross.svg'
import styles from './LoginPage.module.css'
import { Banner } from '@widgets/Banner'
import { useLocation, useNavigate } from 'react-router-dom'
import { WelcomeForm } from '@/widgets/WelcomeForm'
import { useState } from 'react'
import { RegisterData } from '../RegisterPage/types'
import { useAppDispatch } from '@/store/hooks'
import { authUser } from '@/entities/auth/authSlice'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [, setAuthData] = useState<Pick<RegisterData, 'email' | 'password'>>({
    email: '',
    password: '',
  })

  const handleSubmit = async (data: Pick<RegisterData, 'email' | 'password'>) => {
    setAuthData((prev) => ({ ...(prev ?? {}), ...data }) as RegisterData)
    const res = await dispatch(authUser(data)).unwrap()

    localStorage.setItem('accessToken', res.accessToken)

    navigate(location.state?.from || '/')
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Logo />
        <ButtonsWithIcon
          gap="gapSmall"
          iconSrc={cross}
          onClick={() => {
            navigate('/')
          }}
          size="extra-small"
          text="Закрыть"
          position="right"
        />
      </div>

      <div className={styles.spotlight}>
        <h1>Вход</h1>
        <div className={styles.main}>
          <WelcomeForm isRegistry={false} setStepFn={handleSubmit} />
          <Banner type="welcome" />
        </div>
      </div>
    </main>
  )
}
