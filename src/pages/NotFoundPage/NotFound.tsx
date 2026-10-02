import { useNavigate } from 'react-router-dom'
import { Buttons } from '@ui/Buttons/Buttons'
import error404 from '@assets/Errors/error-404.svg'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <main className={styles.page}>
      <img src={error404} className={styles.img} alt="Ошибка 404. Страница не найдена" />
      <div className={styles.content}>
        <div className={styles.description}>
          <h1 className={styles.title}>Страница не найдена</h1>
          <p className={styles.text}>
            К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже
          </p>
        </div>
        <div className={styles.actions}>
          <Buttons
            text="Сообщить об ошибке"
            onClick={() => {
              console.log('Страница не найдена')
              navigate('/')
            }}
            variant={'whiteButton'}
            size={'medium'}
          />
          <Buttons
            text="На главную"
            onClick={() => {
              navigate('/')
            }}
            variant={'greenButton'}
            size={'medium'}
          />
        </div>
      </div>
    </main>
  )
}
