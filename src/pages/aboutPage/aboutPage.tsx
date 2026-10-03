import { DevInfoCard } from '@/widgets/devInfoCard';
import type { DevInfoCardProps } from '@/widgets/devInfoCard';
import styles from './aboutPage.module.css';

const DEVELOPERS: DevInfoCardProps[] = [
  {
    avatarUrl: 'https://github.com/viomida.png',
    name: 'Книга Анна',
    role: 'Рядовой разработчик',
    about:
      'Я прохожу обучение на фронтенд‑разработчика в Яндекс Практикуме. Сейчас я в команде проекта SkillSwap',
    githubUrl: 'https://github.com/viomida',
  },
];

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
  );
}

