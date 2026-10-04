import { ButtonsWithIcon } from '@ui/ButtonsWithIcon/index'
import { TextInput } from '@ui/TextInput/index'
import { PasswordInput } from '@ui/PasswordInput/index'
import { Buttons } from '@ui/Buttons/index'
import styles from './WelcomeForm.module.css'
import google from '@assets/icon/Google.svg'
import apple from '@assets/icon/Apple.svg'
import {WelcomeFormProps} from './types.ts'


export function WelcomeForm ({ isRegForm}:WelcomeFormProps) {

return(<section className = {styles.container}>
  <div className={styles.buttonContainer}>
    <ButtonsWithIcon
      text = 'Продлжить с Google'
      iconSrc = {google}
      size = "large"
      gap ='gapLarge'
      onClick={() => {}}
      border = {true}
    />
    <ButtonsWithIcon
      text = 'Продолжить с Apple'
      iconSrc = {apple}
      size = "large"
      gap ='gapLarge'
      onClick={() => {}}
      border = {true}
    />
  </div>

  <div className = {styles.divider}>или</div>

  <form >
    <TextInput
    labelName='Email'
    placeholder='Введите email'
    onChange={() => {return("")}}
    />
   <fieldset className = {styles.password}>
    { isRegForm ? (
     <>
      <PasswordInput
        labelName='Пароль'
        placeholder='Придумайте надежный пароль'
        onChange={() => {}}
        value={''}
      />
      <text className = {styles.inscription}>Пароль должен содержать не менее 8 знаков</text>
     </>
    ) : (
      <PasswordInput
        labelName='Пароль'
        placeholder='Введите пароль'
        onChange={() => {}}
        value={''}
      />
    )}
    </fieldset>
      { isRegForm ? (
        <>
          <Buttons
            text = 'Далее'
            onClick = {() => {}}
            variant = 'greenButton'
            size = "extra-large"
          />
          <button className = {styles.enterButton}>Уже есть аккаунт? Войти</button>
        </>
      ):(
        <Buttons
          text = 'Войти'
          onClick = {() => {}}
          variant = 'greenButton'
          size = "extra-large"
        />
    )}
  </form>
</section>
);
}

