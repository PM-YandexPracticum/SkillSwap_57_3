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
import { UserCardSkeleton } from '@widgets/UserCardSkeleton'

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

  const isLoading = useAppSelector((state) => state.user.loading)

  const [cardVisibleCount, setCardVisibleCount] = useState(9)
  const observerTarget = useRef<HTMLDivElement | null>(null)

  const [popularOpen, setPopularOpen] = useState(false)
  const [newOpen, setNewOpen] = useState(false)

  // const [filteredData, setFilteredData] = useState<User | null>(null)

  const authUser = useAppSelector((state) => state.auth.data)
  console.log(authUser)

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

  // Infinite scroll
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
        userId: authUser!.user.id,
        likedUserId: id,
      }),
    )
  }

  const handleDetails = (id: number) => {
    navigate(`skill/${id}`)
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
            {isLoading
              ? Array.from({ length: 3 }, (_, index) => <UserCardSkeleton key={index} />)
              : (popularOpen ? userSelector.topByLikes : userSelector.topByLikes.slice(0, 3)).map(
                  (user) => (
                    <UserCard
                      exchange={Boolean(
                        authUser?.exchanges?.find((ex) => ex.receiver.id === user.id),
                      )}
                      key={user.id}
                      id={user.id}
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
                      isLiked={user.isLiked}
                      onDislike={handleDislike}
                      onLike={handleLike}
                      onDetails={() => handleDetails(user.id)}
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
            {isLoading
              ? Array.from({ length: 3 }, (_, index) => <UserCardSkeleton key={index} />)
              : (newOpen ? userSelector.newest : userSelector.newest.slice(0, 3)).map((user) => (
                  <UserCard
                    exchange={Boolean(
                      authUser?.exchanges?.find((ex) => ex.receiver.id === user.id),
                    )}
                    key={user.id}
                    id={user.id}
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
                    isLiked={user.isLiked}
                    onDislike={handleDislike}
                    onLike={handleLike}
                    onDetails={() => handleDetails(user.id)}
                  />
                ))}
          </div>
        </section>

        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Рекомендуем</h2>
          </div>

          <div className={styles.user_cards}>
            {isLoading
              ? Array.from({ length: 3 }, (_, index) => <UserCardSkeleton key={index} />)
              : userSelector.byName.slice(0, cardVisibleCount).map((user) => (
                  <UserCard
                    exchange={Boolean(
                      authUser?.exchanges?.find((ex) => ex.receiver.id === user.id),
                    )}
                    key={user.id}
                    id={user.id}
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
                    isLiked={user.isLiked}
                    onDislike={handleDislike}
                    onLike={handleLike}
                    onDetails={() => handleDetails(user.id)}
                  />
                ))}
          </div>

          <div ref={observerTarget}></div>
        </section>
      </div>
    </main>
  )
}
