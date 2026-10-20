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
import { ShareForm } from '@/widgets/shareForm'
import { AboutFormValues } from '@/widgets/AboutForm/types'
import { ShareFormValues } from '@/widgets/shareForm/types'
import { Confirm } from '@/widgets/Confirm'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RegisterUserData } from '@/entities/auth/types'
import { registerUser } from '@/entities/auth/authSlice'
import { useLocation } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep] = useState(1)
  const [registerData, setRegisterData] = useState<RegisterData>()
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const skills = useAppSelector((state) => state.skill.data)
  const genders = useAppSelector((state) => state.gender.data)
  const cities = useAppSelector((state) => state.city.data)
  const dispatch = useAppDispatch()

  const setWelcomeFormData = (data: Pick<RegisterData, 'email' | 'password'>) => {
    setRegisterData((prev) => ({ ...(prev ?? {}), ...data }) as RegisterData)
    setStep(2)
  }

  const setAboutFormData = (data: AboutFormValues) => {
    setRegisterData((prev) => ({ ...prev, ...data, gender: data.gender }) as RegisterData)
    setStep(3)
  }

  const setShareFormData = (data: ShareFormValues) => {
    setRegisterData(
      (prev) => ({ ...prev, ...data, nameSkill: data.canTeachSkillName }) as RegisterData,
    )
    setShowConfirm(true)
  }

  const handleEditInfo = () => {
    setShowConfirm(false)
    setStep(1)
  }

  const handleConfirm = async () => {
    if (registerData) {
      if (skills && genders && cities) {
        const canTeachSkill = skills.find((s) => s.title === registerData.canTeachSkill)
        const canTeachSubskill = canTeachSkill?.subskills.find(
          (s) => s.title === registerData.canTeachSubskill,
        )
        const wantsToLearnSkill = skills.find((s) => s.title === registerData.skill)
        const wantsToLearnSubskill = wantsToLearnSkill?.subskills.find(
          (s) => s.title === registerData.subskill,
        )
        const city = cities.find((c) => c.title === registerData.city)
        const gender = genders.find((g) => g.title === registerData.gender)

        const apiRegisterData: RegisterUserData = {
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          date_birth: registerData.birthDate,
          bio: '',
          skillDescription: registerData.canTeachDescription,
          canTeachSkillId: String(canTeachSkill?.id),
          canTeachSubskillId: String(canTeachSubskill?.id),
          wantsToLearnSkillId: String(wantsToLearnSkill?.id),
          wantsToLearnSubskillId: String(wantsToLearnSubskill?.id),
          city: city!,
          gender: gender!,
          image_path: registerData.avatar!,
          image_1: registerData.skillFile[0],
          image_2: registerData.skillFile[1],
          image_3: registerData.skillFile[2],
          image_4: registerData.skillFile[3],
          skillTitle: registerData.nameSkill,
        }

        const res = await dispatch(registerUser(apiRegisterData)).unwrap()

        localStorage.setItem('accessToken', res.accessToken)
        sessionStorage.setItem('offerCreated', 'true')

        setShowConfirm(false)
        navigate(location.state?.from || '/')
      }
    }
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
              <WelcomeForm
                isRegistry={true}
                setStepFn={setWelcomeFormData}
                registerData={registerData!}
              />
              <Banner type="welcome" />
            </>
          )}
          {step === 2 && (
            <>
              <AboutForm
                setStepFn={setAboutFormData}
                setPreviousStep={setStep}
                registerData={registerData!}
              />
              <Banner type="about" />
            </>
          )}
          {step === 3 && (
            <>
              <ShareForm
                setStepFn={setShareFormData}
                setPreviousStep={setStep}
                registerData={registerData!}
              />
              <Banner type="share" />
            </>
          )}
          {showConfirm && (
            <Confirm
              category={`${registerData!.canTeachSkill} / ${registerData!.canTeachSubskill}`}
              description={registerData!.canTeachDescription}
              images={registerData!.skillFile}
              onEdit={handleEditInfo}
              title={registerData!.canTeachSkillName}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      </div>
    </main>
  )
}