import { ButtonsWithIcon } from '@ui/ButtonsWithIcon/index'
import { TextInput } from '@ui/TextInput/index'
import { PasswordInput } from '@ui/PasswordInput/index'
import { Buttons } from '@ui/Buttons/index'
import styles from './WelcomeForm.module.css'
import google from '@assets/icon/Google.svg'
import apple from '@assets/icon/Apple.svg'
import { schema, Values, registrationSchema } from './schema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { WelcomeFormProps } from './types.ts'

export function WelcomeForm({ isRegistry, setStepFn }: WelcomeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(isRegistry ? registrationSchema : schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data: Values) => {
    try {
      if (setStepFn) setStepFn(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.buttonContainer}>
        <ButtonsWithIcon
          text="Продолжить с Google"
          iconSrc={google}
          size="large"
          gap="gapLarge"
          onClick={() => {
            console.log('Функция в разработке')
          }}
          border={true}
        />
        <ButtonsWithIcon
          text="Продолжить с Apple"
          iconSrc={apple}
          size="large"
          gap="gapLarge"
          onClick={() => {
            console.log('Функция в разработке')
          }}
          border={true}
        />
      </div>

      <div className={styles.divider}>или</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register('email')}
          labelName="Email"
          placeholder="Введите email"
          error={errors.email?.message}
        />
        <fieldset className={styles.password}>
          <PasswordInput
            {...register('password')}
            labelName="Пароль"
            placeholder="Введите пароль"
            error={errors.password?.message}
          />
        </fieldset>
        <Buttons
          type="submit"
          text={isRegistry ? 'Далее' : 'Войти'}
          variant="greenButton"
          size="extra-large"
        />
      </form>
      {isRegistry && (
        <Link className={styles.enterButton} to="/login">
          Уже есть аккаунт? Войти
        </Link>
      )}
    </section>
  )
}
