import { UserCard } from '@widgets/UserCard'
import { ExchangeCard } from '@/widgets/ExchangeCard'
import styles from './SkillPage.module.css'

const mockSkill = {
  title: 'Игра на барабанах',
  category: 'Творчество и искусство / Музыка и звук',
  description:
    'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
  images: [
    '/src/assets/icon/Apple.svg',
    '/src/assets/icon/Category.svg',
    '/src/assets/icon/FileInputIcon.svg',
    '/src/assets/icon/User.svg',
  ],
  isLiked: false,
  status: 'available' as const,
  onExchange: () => {
    console.log('Нажата кнопка обмена')
  },
  onLike: () => {
    console.log('Добавлено в избранное')
  },
  onShare: () => {
    console.log('Поделиться карточкой')
  },
  onLearnMore: () => {
    console.log('Подробнее о карточке')
  },
}

export default function SkillPage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.section} ${styles.skillSection}`}>
        <UserCard
          variant="author"
          avatarUrl={mockAuthor.avatarUrl}
          name={mockAuthor.name}
          location={mockAuthor.location}
          about={mockAuthor.about}
          canTeach={mockAuthor.canTeach}
          wantsToLearn={mockAuthor.wantsToLearn}
        />
        <ExchangeCard
          title={mockSkill.title}
          category={mockSkill.category}
          description={mockSkill.description}
          images={mockSkill.images}
          isLiked={mockSkill.isLiked}
          status={mockSkill.status}
          onExchange={mockSkill.onExchange}
          onLike={mockSkill.onLike}
          onShare={mockSkill.onShare}
          onLearnMore={mockSkill.onLearnMore}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Похожие предложения</h2>
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
  )
}
