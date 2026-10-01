import ErrorSrc from '@assets/error500.svg';
import {Buttons} from '../UI/Buttons/Buttons'
import styles from './NotServerPage.module.css'
import { useNavigate } from 'react-router-dom';

export default function NotServerPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/")
  }

  const handleReportError = () => {
    console.log('Сообщение об ошибке отправлено');
  };

  return (
    <main className={styles.main}>
      <img src={ErrorSrc} alt="Error 500" />
      <div className={styles.content}>
        <div className={styles.text}>
          <h1>На сервере произошла ошибка</h1>
          <p>Попробуйте позже или вернитесь на главную страницу</p>
        </div>
        <div className={styles.buttons}>
          <Buttons 
            text='Сообщить об ошибке' 
            onClick={handleReportError}
            variant='whiteButton'
            size='large'
          />
          <Buttons 
            text='На главную' 
            onClick={handleGoHome}
            variant='greenButton'
            size='large'
          />
        </div>
      </div>
    </main>
  )
}