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
import styles from './SkillPage.module.css'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchUser } from '@/entities/user/model/userSlice'
import {
  mapCanTeachToCardSkills,
  mapWantsToLearnToCardSkills,
  pluralizeYears,
} from '@/shared/lib/helpers'

export default function SkillPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.user.currentUser)
  const recomendations = useAppSelector((state) => state.user.data?.byName)
  useEffect(() => {
    if (!id) return
    dispatch(fetchUser(id!))
  }, [dispatch, id])

  if (!currentUser) return
  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <div>
          <UserCard
            variant="author"
            avatarUrl={`http://localhost:5000/images/users/${currentUser.image_path}`}
            name={currentUser.name}
            location={`${currentUser.city.title}, ${pluralizeYears(currentUser.age)}`}
            about={currentUser.bio}
            canTeach={mapCanTeachToCardSkills(currentUser.canTeach)}
            wantsToLearn={mapWantsToLearnToCardSkills(currentUser.wantsToLearn)}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Похожие предложения</h2>
        <div className={styles.similar}>
          {!recomendations && <p>Загрузка</p>}
          {recomendations &&
            recomendations.map((user, index) => (
              <UserCard
                key={index}
                variant="catalog"
                avatarUrl={`http://localhost:5000/images/users/${user.image_path}`}
                name={user.name}
                location={`${user.city.title}, ${pluralizeYears(user.age)}`}
                canTeach={mapCanTeachToCardSkills(user.canTeach)}
                wantsToLearn={mapWantsToLearnToCardSkills(user.wantsToLearn)}
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
