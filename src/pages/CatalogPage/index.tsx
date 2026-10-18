import { UserCard } from '@widgets/UserCard/index'
import styles from './styles.module.css'
import { ButtonsWithIcon } from '@ui/ButtonsWithIcon'
import { useEffect, useState, useRef, useCallback } from 'react'
import { CatalogUserResponse } from '@/shared/types/apiTypes'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useNavigate } from 'react-router-dom'
import { pluralizeYears } from '@/shared/lib/helpers'
import { API_URL } from '@/shared/config/api'
import { addToFavorites, removeFromFavorites } from '@/entities/favorites/favoriteSlice'

export default function CatalogPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const EMPTY_CATALOG: CatalogUserResponse = {
    topByLikes: [],
    newest: [],
    byName: [],
  }
  const userSelector = useAppSelector(
    (state) => state.user.data ?? EMPTY_CATALOG,
  ) as CatalogUserResponse
  const [cardVisibleCount, setCardVisibleCount] = useState(9)
  const observerTarget = useRef<HTMLDivElement | null>(null)

  const [popularOpen, setPopularOpen] = useState(false)
  const [newOpen, setNewOpen] = useState(false)

  const authUser = useAppSelector((state) => state.auth.data)

  const loadMoreCards = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!userSelector.byName.length) return
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCardVisibleCount((prev) => Math.min(prev + 6, userSelector.byName.length))
        }
      })
    },
    [userSelector.byName.length],
  )

  // useEffect для infinite scroll
  useEffect(() => {
    if (!userSelector.byName.length) return

    const observer = new IntersectionObserver(loadMoreCards, {
      threshold: 1.0,
    })

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [userSelector.byName.length, loadMoreCards])

  const handleLike = async (id: number) => {
    if (authUser) {
      dispatch(
        addToFavorites({
          userId: authUser?.user.id,
          likedUserId: id,
        }),
      )
    } else {
      navigate('/login')
    }
  }

  const handleDislike = async (id: number) => {
    dispatch(
      removeFromFavorites({
        userId: authUser?.user.id,
        likedUserId: id,
      }),
    )
  }

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
              onClick={() => setPopularOpen(!popularOpen)}
              text={popularOpen ? 'Свернуть' : 'Смотреть все'}
              size="small"
              position="right"
              rotate={popularOpen}
            />
          </div>
          <div className={styles.user_cards}>
            {(popularOpen ? userSelector.topByLikes : userSelector.topByLikes.slice(0, 3)).map(
              (user, index) => (
                <UserCard
                  key={user.id}
                  variant="catalog"
                  avatarUrl={`${API_URL}/images/users/${user.image_path}`}
                  name={user.name}
                  location={`${user.city.title}, ${pluralizeYears(user.age)}`}
                  canTeach={user.canTeach.map((val) => ({
                    title: val.title,
                    color: val.subskill.skill.color,
                  }))}
                  wantsToLearn={user.wantsToLearn.map((val) => ({
                    title: val.subskill.title,
                    color: val.subskill.skill.color,
                  }))}
                  id={user.id}
                  isLiked={false}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onDetails={() => {
                    navigate(`skill/${user.id}`)
                  }}
                />
              ),
            )}
          </div>
        </section>

        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Новое</h2>
            <ButtonsWithIcon
              gap="gapSmall"
              iconSrc="./src/assets/ButtonSvg/chevron-right.svg"
              onClick={() => setNewOpen(!newOpen)}
              text={newOpen ? 'Свернуть' : 'Смотреть все'}
              size="small"
              position="right"
              rotate={newOpen}
            />
          </div>
          <div className={styles.user_cards}>
            {(newOpen ? userSelector.newest : userSelector.newest.slice(0, 3)).map(
              (user, index) => (
                <UserCard
                  key={index}
                  variant="catalog"
                  avatarUrl={`${API_URL}/images/users/${user.image_path}`}
                  name={user.name}
                  location={`${user.city.title}, ${pluralizeYears(user.age)}`}
                  canTeach={user.canTeach.map((val) => ({
                    title: val.title,
                    color: val.subskill.skill.color,
                  }))}
                  wantsToLearn={user.wantsToLearn.map((val) => ({
                    title: val.subskill.title,
                    color: val.subskill.skill.color,
                  }))}
                  id={user.id}
                  isLiked={false}
                  onLike={() => {}}
                  onDetails={() => {}}
                />
              ),
            )}
          </div>
        </section>

        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Рекомендуем</h2>
          </div>
          <div className={styles.user_cards}>
            {userSelector.byName.slice(0, cardVisibleCount).map((user) => (
              <UserCard
                key={user.id}
                variant="catalog"
                avatarUrl={`${API_URL}/images/users/${user.image_path}`}
                name={user.name}
                location={`${user.city.title}, ${pluralizeYears(user.age)}`}
                canTeach={user.canTeach.map((val) => ({
                  color: val.subskill.skill.color,
                  title: val.title,
                }))}
                wantsToLearn={user.wantsToLearn.map((val) => ({
                  title: val.subskill.title,
                  color: val.subskill.skill.color,
                }))}
                id={user.id}
                isLiked={false}
                onLike={() => {}}
                onDetails={() => {}}
              />
            ))}
          </div>

          <div ref={observerTarget}></div>
        </section>
      </div>
    </main>
  )
}
