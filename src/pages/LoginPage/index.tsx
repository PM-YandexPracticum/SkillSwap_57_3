import { ButtonsWithIcon } from '@ui/ButtonsWithIcon'
import Logo from '@ui/Logo/Logo'
import cross from '@assets/icon/cross.svg'
import styles from './LoginPage.module.css'
import { Banner } from '@widgets/Banner'
import { useNavigate } from 'react-router-dom'
import { WelcomeForm } from '@/widgets/WelcomeForm'

export default function LoginPage() {
  const navigate = useNavigate()

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
          <WelcomeForm isRegistry={false} />
          <Banner type="welcome" />
        </div>
      </div>
    </main>
  )
}
