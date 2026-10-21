import { UserCard } from '@widgets/UserCard/index'
import styles from './FavoritesPage.module.css'
import { API_URL } from '@/shared/config/api'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addToFavorites, removeFromFavorites } from '@/entities/favorites/favoriteSlice'
import { useNavigate } from 'react-router-dom'
import { pluralizeYears } from '@/shared/lib/helpers'

import { Filters } from '@/widgets/Filters'
import { SelectedFilters } from '@/widgets/SelectedFilters'
import { useFilter } from '@/shared/hooks/useFilters'

export default function FavoritesPage() {
  const { data, loading } = useFavorites()
  const authUser = useAppSelector((state) => state.auth.data)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // получаем активные фильтры
  const filters = useAppSelector((state) => state.filters.users)
  const hasActiveFilters =
    filters.mode !== 'all' ||
    filters.search.trim() !== '' ||
    filters.skillIds.length > 0 ||
    filters.subskillIds.length > 0 ||
    filters.cityIds.length > 0 ||
    filters.genderIds.length > 0

  const filteredFavorites = useFilter(data ?? [])

  const visibleUsers = hasActiveFilters ? filteredFavorites : (data ?? [])

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
        userId: authUser?.user.id as number,
        likedUserId: id,
      }),
    )
  }

  const handleDetails = (id: number) => {
    navigate(`/skill/${id}`)
  }

  return (
    <main className={styles.favorites}>
      <Filters />
      <section className={styles.container}>
        {hasActiveFilters ? (
          <>
            <SelectedFilters />
            <h2 className={styles.title}>Подходящие предложения: {visibleUsers.length}</h2>
          </>
        ) : (
          <h2 className={styles.title}>Избранное</h2>
        )}

        {loading && <div>Загрузка</div>}
        {!loading && visibleUsers.length > 0 && (
          <div className={styles.user_cards}>
            {visibleUsers.map((user) => (
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
                  color: val.subskill.skill.color,
                  title: val.subskill.title,
                }))}
                isLiked={true}
                onLike={handleLike}
                onDislike={handleDislike}
                id={user.id}
                onDetails={() => handleDetails(user.id)}
              />
            ))}
          </div>
        )}
        {!loading && visibleUsers.length === 0 && (
          <div className={styles.nodata}>
            {hasActiveFilters ? (
              <h2>По выбранным фильтрам ничего не найдено</h2>
            ) : (
              <>
                <h2>Здесь пока пусто :(</h2>
                <h2>Лайкните кого-нибудь, чтобы данные обновились</h2>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
