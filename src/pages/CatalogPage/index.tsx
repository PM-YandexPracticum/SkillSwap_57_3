import { UserCard } from '@widgets/UserCard/index'
import styles from './styles.module.css'
import { ButtonsWithIcon } from '@ui/ButtonsWithIcon'
import { useEffect, useState, useRef, useCallback } from 'react'
import { CatalogUserResponse } from '@/shared/types/apiTypes'

export default function CatalogPage() {
  const [users, setUsers] = useState<CatalogUserResponse>({
    byName: [],
    newest: [],
    topByLikes: [],
  })

  const [cardVisibleCount, setCardVisibleCount] = useState(9)
  const observerTarget = useRef<HTMLDivElement | null>(null)

  // колбек для Intersection Observer - показываем еще 6 карточек
  const loadMoreCards = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCardVisibleCount((prev) => Math.min(prev + 6, users.byName.length))
        }
      })
    },
    [users.byName.length],
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('http://localhost:5000/api/users/').then((data) => data)
        setUsers(await data.json())
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])
  // useEffect для infinite scroll
  useEffect(() => {
    if (!users.byName.length) return

    const observer = new IntersectionObserver(loadMoreCards, {
      threshold: 1.0,
    })

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [users.byName.length, loadMoreCards])

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
            {users.topByLikes.slice(0, 3).map((user, index) => (
              <UserCard
                key={index}
                variant="catalog"
                avatarUrl={`http://localhost:5000/images/users/${user.image_path}`}
                name={user.name}
                location={user.city.title}
                canTeach={user.canTeach.map((val) => ({
                  title: val.title,
                  color: val.subskill.skill.color,
                }))}
                wantsToLearn={user.wantsToLearn.map((val) => ({
                  title: val.title,
                  color: val.subskill.skill.color,
                }))}
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
            {users.newest.slice(0, 3).map((user, index) => (
              <UserCard
                key={index}
                variant="catalog"
                avatarUrl={`http://localhost:5000/images/users/${user.image_path}`}
                name={user.name}
                location={user.city.title}
                canTeach={user.canTeach.map((val) => ({
                  title: val.title,
                  color: val.subskill.skill.color,
                }))}
                wantsToLearn={user.wantsToLearn.map((val) => ({
                  title: val.title,
                  color: val.subskill.skill.color,
                }))}
                isLiked={false}
                onLike={() => {}}
                onDetails={() => {}}
              />
            ))}
          </div>
        </section>

        {/*<section className={styles.spotlight}>
          <div className={styles.section_header}>
            <h2>Рекомендуем</h2>
          </div>
          <div className={styles.user_cards}>
            {users.byName.slice(0, cardVisibleCount).map((user) => (
              <UserCard
                key={user.id}
                variant="catalog"
                avatarUrl={`http://localhost:5000/images/users/${user.image_path}`}
                name={user.name}
                location={user.city.title}
                canTeach={user.canTeach.map((val) => val.title)}
                wantsToLearn={user.wantsToLearn.map((val) => val.title)}
                isLiked={false}
                onLike={() => {}}
                onDetails={() => {}}
              />
            ))}
          </div>
          {/* элемент по которому понимаем, что пользователь долистал до конца */}
          <div ref={observerTarget}></div>
        </section>
      </div>
    </main>
  )
}
