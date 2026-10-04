import { UserCard } from '@widgets/UserCard/index';
import styles from './styles.module.css';
import { ButtonsWithIcon } from '@ui/ButtonsWithIcon';

const MOCK_USERS = [
  {
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    name: 'Максим',
    location: 'Москва, 23 года',
    canTeach: ['Бизнес-план'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация'],
  },
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
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    name: 'Виктория',
    location: 'Кемерово, 38 лет',
    canTeach: ['Английский язык'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация'],
  },
  {
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    name: 'Анна',
    location: 'Москва, 28 лет',
    canTeach: ['Английский язык'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация'],
  },
];

export default function CatalogPage() {
  return (
    <main className={styles.container}>
      <aside className={styles.sidebar} />

      <div className={styles.categories}>
        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Популярное</h2>
            <ButtonsWithIcon
              gap="gapSmall"
              iconSrc="./src/assets/ButtonSvg/chevron-right.svg"
              onClick={() => {}}
              text="Смотреть все"
              size="small"
              position="right"
            />
          </div>
          <div className={styles.user_cards}>
            {MOCK_USERS.slice(0, 3).map((user, index) => (
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

        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Новое</h2>
            <ButtonsWithIcon
              gap="gapSmall"
              iconSrc="./src/assets/ButtonSvg/chevron-right.svg"
              onClick={() => {}}
              text="Смотреть все"
              size="small"
              position="right"
            />
          </div>
          <div className={styles.user_cards}>
            {MOCK_USERS.slice(2, 5).map((user, index) => (
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

        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Рекомендуем</h2>
          </div>
          <div className={styles.user_cards}>
            {MOCK_USERS.map((user, index) => (
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
      </div>
    </main>
  );
}