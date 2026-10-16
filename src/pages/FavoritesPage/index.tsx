import { useEffect, useState } from 'react'
import { UserCard } from '@widgets/UserCard/index'
import { CatalogUserResponse } from '@/shared/types/apiTypes'
import styles from './FavoritesPage.module.css'
import { API_URL } from '@/shared/config/api'

export default function FavoritesPage() {
  const [users, setUsers] = useState<CatalogUserResponse>({
    byName: [],
    newest: [],
    topByLikes: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/`)
        if (!res.ok) throw new Error('API недоступен')
        const data = await res.json()
        setUsers({
          byName: data.byName ?? [],
          newest: data.newest ?? [],
          topByLikes: data.topByLikes ?? [],
        })
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Избранное</h1>
      <div className={styles.user_cards}>
        {users.byName.map((user) => (
          <UserCard
            key={user.id}
            variant="catalog"
            avatarUrl={`${API_URL}/images/users/${user.image_path}`}
            name={user.name}
            location={user.city.title}
            canTeach={user.canTeach.map((val) => ({
              color: val.subskill.skill.color,
              title: val.title,
            }))}
            wantsToLearn={user.wantsToLearn.map((val) => ({
              color: val.subskill.skill.color,
              title: val.title,
            }))}
            isLiked={false}
            onLike={() => {}}
            onDetails={() => {}}
          />
        ))}
      </div>
    </main>
  )
}