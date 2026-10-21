import { UserCard } from '@widgets/UserCard'
import styles from './SkillPage.module.css'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchUser, fetchUsers } from '@/entities/user/model/userSlice'
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
import { sendExchange } from '@/entities/exchange/exchangeSlice'

export default function SkillPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.user.currentUser)
  const recommendations = useAppSelector((state) => state.recommendations.data)
  const navigate = useNavigate()
  const location = useLocation()
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const authedUser = useAppSelector((state) => state.auth.data?.user)
  const exchanges = useAppSelector((state) => state.exchange.data)

  useEffect(() => {
    if (!id) return
    dispatch(fetchUser(id))
  }, [dispatch, id])

  const exchangeStatus = useMemo(() => {
    if (!exchanges || !authedUser || !currentUser) return null

    const exchange = exchanges.find(
      (ex) => ex.initiator.id === authedUser.id && ex.receiver.id === currentUser.id,
    )

    return exchange?.status ?? null
  }, [exchanges, authedUser, currentUser])

  useEffect(() => {
    if (!currentUser) return
    const skillId = currentUser.canTeach[0]?.subskill.skill.id
    if (!skillId) return
    dispatch(fetchRecommendations(skillId))
  }, [dispatch, currentUser])

  if (!currentUser) return

  const handleExchange = async () => {
    if (!isAuth) {
      navigate('/register', {
        state: { from: location.pathname },
      })
      return
    }
    if (authedUser) {
      await dispatch(
        sendExchange({
          initiator_id: authedUser.id,
          receiver_id: currentUser.id,
        }),
      )
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
          onExchange={handleExchange}
          onLearnMore={() => {}}
          onLike={() => {}}
          onShare={() => {}}
          status={exchangeStatus ? exchangeStatus : 'available'}
        />
      </section>

      <SkillCardCarousel recommendations={recommendations} />
    </main>
  )
}
