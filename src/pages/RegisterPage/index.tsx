import { ButtonsWithIcon } from '@ui/ButtonsWithIcon'
import Logo from '@ui/Logo/Logo'
import cross from '@assets/icon/cross.svg'
import styles from './RegisterPage.module.css'
import { Banner } from '@widgets/Banner'
import { useNavigate } from 'react-router-dom'
import { WelcomeForm } from '@/widgets/WelcomeForm'
import { useState } from 'react'
import { AboutForm } from '@/widgets/AboutForm'
import { RegisterData } from './types'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [, setRegisterData] = useState<RegisterData>()

  const setWelcomeFormData = (data: { email: string; password: string }) => {
    setRegisterData((prev) => ({ ...(prev ?? {}), ...data }) as RegisterData)
    setStep(2)
  }

  const setAboutFormData = (data: Omit<RegisterData, 'email' | 'password'>) => {
    setRegisterData((prev) => ({ ...prev, ...data }) as RegisterData)
    // setStep(3)
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
        <div className={styles.step_indicator}>
          <h2>Шаг {step} из 3</h2>
          <div className={styles.step_indicator_container}>
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className={`${styles.bar} ${i + 1 <= step ? styles.bar_active : ''}`} />
            ))}
          </div>
        </div>
        <div className={styles.main}>
          {step === 1 && (
            <>
              <WelcomeForm isRegistry={true} setStepFn={setWelcomeFormData} />
              <Banner type="welcome" />
            </>
          )}
          {step === 2 && (
            <>
              <AboutForm setStepFn={setAboutFormData} setPreviousStep={setStep} />
              <Banner type="about" />
            </>
          )}
        </div>
      </div>
    </main>
  )
}
