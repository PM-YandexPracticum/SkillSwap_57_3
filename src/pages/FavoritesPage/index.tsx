import { UserCard } from '@widgets/UserCard/index'
import styles from './FavoritesPage.module.css'
import { API_URL } from '@/shared/config/api'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addToFavorites, removeFromFavorites } from '@/entities/favorites/favoriteSlice'
import { useNavigate } from 'react-router-dom'

export default function FavoritesPage() {
  const { data, loading } = useFavorites()
  const authUser = useAppSelector((state) => state.auth.data)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  console.log(data)

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
      <h1 className={styles.title}>Избранное</h1>
      {loading && <div>Загрузка</div>}
      {data && (
        <div className={styles.user_cards}>
          {data.map((user) => (
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
              onLike={handleLike}
              onDislike={handleDislike}
              id={user.id}
              onDetails={() => {}}
            />
          ))}
        </div>
      )}
      {!data && (
        <div className={styles.nodata}>
          <h2>Здесь пока пусто :(</h2>
          <h2>Лайкните кого-нибудь, чтобы данные обновились</h2>
        </div>
      )}
    </main>
  )
}
