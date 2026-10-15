import { DevInfoCard } from '@widgets/devInfoCard'
import type { DevInfoCardProps } from '@widgets/devInfoCard/types'
import styles from './aboutPage.module.css'

const DEVELOPERS: DevInfoCardProps[] = [
  {
    avatarUrl: 'https://github.com/viomida.png',
    name: 'Книга Анна',
    role: 'Рядовой разработчик',
    about:
      'Я прохожу обучение на фронтенд‑разработчика в Яндекс Практикуме. Сейчас я в команде проекта SkillSwap',
    githubUrl: 'https://github.com/viomida',
  },
  {
    avatarUrl: 'https://github.com/borisgrr.png',
    name: 'Громов Борис',
    role: 'Рядовой разработчик',
    about:
      'Изучаю фронтенд-разработку в Яндекс Практикуме. В рамках обучения участвую в командной разработке SkillSwap.',
    githubUrl: 'https://github.com/borisgrr',
  },
  {
    avatarUrl: 'https://github.com/knikulnikova.png',
    name: 'Никульникова Екатерина',
    role: 'Рядовой разработчик',
    about:
      'Прохожу обучение на фронтенд-разработчика в Практикуме и участвую в командной разработке проекта SkillSwap.',
    githubUrl: 'https://github.com/knikulnikova',
  },
  {
    avatarUrl: 'https://github.com/nikolaevskidaniil19-ui.png',
    name: 'Николаевский Даниил',
    role: 'Рядовой разработчик',
    about:
      'Изучаю фронтенд-разработку в Яндекс Практикуме. В рамках обучения участвую в командной разработке SkillSwap.',
    githubUrl: 'https://github.com/nikolaevskidaniil19-ui',
  },
  {
    avatarUrl: 'https://github.com/DmitryPanin-1991.png',
    name: 'Панин Дмитрий',
    role: 'Рядовой разработчик',
    about:
      'Осваиваю профессию фронтенд-разработчика в Яндекс Практикуме. В настоящее время работаю конструктором упаковки. Вместе с женой воспитываем пуделя Бруно. Увлекаюсь видеоиграми, кино и современными технологиями.',
    githubUrl: 'https://github.com/DmitryPanin-1991',
  },
  {
    avatarUrl: 'https://avatars.githubusercontent.com/u/181559490?v=4',
    name: 'Выгузова Наталья',
    role: 'Рядовой разработчик',
    about:
      'Изучаю фронтенд-разработку в Яндекс Практикуме, участвую в командной разработке проекта SkillSwap.',
    githubUrl: 'https://github.com/Nata0803',
  },
]

export function AboutPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Команда разработчиков SkillSwap</h1>
      <div className={styles.grid}>
        {DEVELOPERS.map((dev) => (
          <DevInfoCard key={dev.githubUrl} {...dev} />
        ))}
      </div>
    </main>
  )
}
