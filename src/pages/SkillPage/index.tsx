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
import { useNavigate, useLocation } from 'react-router-dom'
import { SkillCardCarousel } from '@widgets/SkillCardCarousel/index'

export default function SkillPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.user.currentUser)
  const recommendations = useAppSelector((state) => state.recommendations.data)
  const navigate = useNavigate()
  const location = useLocation()
  const isAuth = useAppSelector((state) => state.auth.isAuth)

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

  const handleShare = async () => {
    const shareUrl = window.location.href

    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = shareUrl
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.spotlight}>
        <UserCard
          id={currentUser.id}
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
          onExchange={() => {
            if (!isAuth) {
              navigate('/register', {
                state: { from: location.pathname },
              })
            }
          }}
          onLearnMore={() => {}}
          onLike={() => {}}
          onShare={handleShare}
          status="available"
        />
      </section>

      <SkillCardCarousel recommendations={recommendations} />
    </main>
  )
}