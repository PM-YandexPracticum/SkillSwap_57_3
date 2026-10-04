import { UserCard } from '@widgets/UserCard';
import styles from './SkillPage.module.css';

const mockAuthor = {
  avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
  name: 'Иван',
  location: 'Санкт-Петербург, 34 года',
  about: 'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
  canTeach: ['Английский язык'],
  wantsToLearn: ['Тайм менеджмент', 'Медитация'],
};

const mockSimilar = [
  {
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    name: 'Илона',
    location: 'Казань, 27 лет',
    canTeach: ['Английский язык'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация', 'Рисование'],
  },
  {
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    name: 'Михаил',
    location: 'Новосибирск, 29 лет',
    canTeach: ['Английский язык'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация'],
  },
  {
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    name: 'Мария',
    location: 'Красноярск, 21 год',
    canTeach: ['Английский язык'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация'],
  },
  {
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    name: 'Виктория',
    location: 'Кемерово, 38 лет',
    canTeach: ['Английский язык'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация'],
  },
];

export default function SkillPage() {
  return (
    <main className={styles.page}>
      <h1>SkillPage</h1>

      <section className={styles.section}>
        <h2>Автор навыка</h2>
        <div>
          <UserCard
            variant="author"
            avatarUrl={mockAuthor.avatarUrl}
            name={mockAuthor.name}
            location={mockAuthor.location}
            about={mockAuthor.about}
            canTeach={mockAuthor.canTeach}
            wantsToLearn={mockAuthor.wantsToLearn}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Похожие предложения</h2>
        <div className={styles.similar}>
          {mockSimilar.map((user, index) => (
            <UserCard
              key={index}
              variant="catalog"
              avatarUrl={user.avatarUrl}
              name={user.name}
              location={user.location}
              canTeach={user.canTeach}
              wantsToLearn={user.wantsToLearn}
              isLiked={false}
              onLike={() => {}}
              onDetails={() => {}}
            />
          ))}
        </div>
      </section>
    </main>
  );
}