import { UserCard } from '@widgets/UserCard/index'
import styles from './styles.module.css'
import { ButtonsWithIcon } from '@ui/ButtonsWithIcon'
import { useEffect, useState, useRef, useCallback } from 'react'
import { CatalogUserResponse } from '@/shared/types/apiTypes'
import { useAppSelector } from '@/store/hooks'
import { Link } from 'react-router-dom'
import { pluralizeYears } from '@/shared/lib/helpers'
import { API_URL } from '@/shared/config/api'
import { selectSearchQuery } from '@/entities/search/model/searchSlice'

export default function CatalogPage() {
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
  const searchQuery = useAppSelector(selectSearchQuery).trim()
  const filtredUsers = userSelector.byName.filter((user) => {
    return user.canTeach.some((skill) => {
      return skill.title.toLowerCase().includes(searchQuery.toLowerCase())
    })
  })

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar} />
      {searchQuery ? (
        <section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Рекомендуем</h2>
          </div>
          <div className={styles.user_cards}>
            {filtredUsers.slice(0, cardVisibleCount).map((user) => (
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
                isLiked={false}
                onLike={() => {}}
                onDetails={() => {}}
              />
            ))}
          </div>
        </section>
      ) : (
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
                  <Link key={index} to={`skill/${user.id}`}>
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
                      isLiked={false}
                      onLike={() => {}}
                      onDetails={() => {}}
                    />
                  </Link>
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
                  isLiked={false}
                  onLike={() => {}}
                  onDetails={() => {}}
                />
              ))}
            </div>

            <div ref={observerTarget}></div>
          </section>
        </div>
      )}
    </main>
  )
}
