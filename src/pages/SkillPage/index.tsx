import { UserCard } from '@widgets/UserCard'
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
import { ExchangeCard } from '@/widgets/ExchangeCard'

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
        <div className={styles.spotlight}>
          <UserCard
            variant="author"
            avatarUrl={`http://localhost:5000/images/users/${currentUser.image_path}`}
            name={currentUser.name}
            location={`${currentUser.city.title}, ${pluralizeYears(currentUser.age)}`}
            about={currentUser.bio}
            canTeach={mapCanTeachToCardSkills(currentUser.canTeach)}
            wantsToLearn={mapWantsToLearnToCardSkills(currentUser.wantsToLearn)}
          />
          <ExchangeCard
            category={`${currentUser.canTeach[0].title} / ${currentUser.canTeach[0].subskill.title}`}
            description={currentUser.canTeach[0].description}
            images={[
              `http://localhost:5000/images/can_teach/${currentUser.canTeach[0].image_1!}`,
              `http://localhost:5000/images/can_teach/${currentUser.canTeach[0].image_2!}`,
              `http://localhost:5000/images/can_teach/${currentUser.canTeach[0].image_3!}`,
              `http://localhost:5000/images/can_teach/${currentUser.canTeach[0].image_4!}`,
            ]}
            title={currentUser.canTeach[0].title}
            onExchange={() => {}}
            onLearnMore={() => {}}
            onLike={() => {}}
            onShare={() => {}}
            status="available"
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
