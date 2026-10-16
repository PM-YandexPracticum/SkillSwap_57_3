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
import { fetchRecommendations } from '@/entities/userRecommendations/userRecommendationsSlice'
import { API_URL } from '@/shared/config/api'

export default function SkillPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.user.currentUser)
  const recommendations = useAppSelector((state) => state.recommendations.data)
  useEffect(() => {
    if (!id) return
    dispatch(fetchUser(id))
  }, [dispatch, id])

  useEffect(() => {
    if (!currentUser) return
    const skillId = currentUser.canTeach[0]?.subskill.skill.id
    if (!skillId) return
    dispatch(fetchRecommendations(skillId))
  }, [dispatch, currentUser])

  if (!currentUser) return
  return (
    <main className={styles.page}>
      <section className={styles.spotlight}>
        <UserCard
          variant="author"
          avatarUrl={`${API_URL}/images/users/${currentUser.image_path}`}
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
            `${API_URL}/images/can_teach/${currentUser.canTeach[0].image_1!}`,
            `${API_URL}/images/can_teach/${currentUser.canTeach[0].image_2!}`,
            `${API_URL}/images/can_teach/${currentUser.canTeach[0].image_3!}`,
            `${API_URL}/images/can_teach/${currentUser.canTeach[0].image_4!}`,
          ]}
          title={currentUser.canTeach[0].title}
          onExchange={() => {}}
          onLearnMore={() => {}}
          onLike={() => {}}
          onShare={() => {}}
          status="available"
        />
      </section>

      <section className={styles.recommendations}>
        <h2 className={styles.title}>Похожие предложения</h2>
        <div className={styles.similar}>
          {!recommendations && <p>Загрузка</p>}
          {recommendations &&
            recommendations.map((rec, index) => (
              <UserCard
                key={index}
                variant="catalog"
                avatarUrl={`${API_URL}/images/users/${rec.image_path}`}
                name={rec.name}
                location={`${rec.city}, ${pluralizeYears(rec.age)}`}
                canTeach={rec.canTeach}
                wantsToLearn={rec.wantsToLearn}
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
