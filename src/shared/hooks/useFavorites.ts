import { fetchFavorites } from '@/entities/favorites/favoriteSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'

const TTL = 2 * 60 * 1000

export function useFavorites() {
  const dispatch = useAppDispatch()
  const { data, lastFetched, loading } = useAppSelector((s) => s.favorite)
  const id = useAppSelector((s) => s.auth.data?.user.id)

  useEffect(() => {
    if (!id) return
    const isStale = !lastFetched || Date.now() - lastFetched > TTL
    if (!data || isStale) {
      dispatch(fetchFavorites(id))
    }
  }, [dispatch, data, lastFetched, id])

  return { data, loading }
}
